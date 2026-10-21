/**
 * Réinitialise le mot de passe du compte propriétaire (Better Auth, table
 * `account` / providerId `credential`).
 *
 * Usage :
 *   DATABASE_URL=... node scripts/admin-set-password.mjs <email> <nouveau-mot-de-passe>
 *
 * Utile quand le propriétaire a perdu son mot de passe (aucun SMTP n'est
 * configuré sur ce projet, donc le flux « mot de passe oublié » ne peut pas
 * envoyer d'e-mail).
 */
import pg from "pg";
import { hashPassword } from "better-auth/crypto";

const [email, password] = process.argv.slice(2);

if (!email || !password) {
  console.error(
    "Usage : node scripts/admin-set-password.mjs <email> <nouveau-mot-de-passe>",
  );
  process.exit(1);
}

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL manquant.");
  process.exit(1);
}

if (password.length < 8) {
  console.error("Le mot de passe doit contenir au moins 8 caractères.");
  process.exit(1);
}

const { Client } = pg;
const client = new Client({ connectionString: process.env.DATABASE_URL });
await client.connect();

try {
  const { rows: users } = await client.query(
    'select id, email from "user" where lower(email) = lower($1) limit 1',
    [email],
  );
  if (users.length === 0) {
    console.error(`Aucun utilisateur pour ${email}.`);
    process.exit(1);
  }
  const userId = users[0].id;

  const { rows: accounts } = await client.query(
    'select id from account where "userId" = $1 and "providerId" = $2 limit 1',
    [userId, "credential"],
  );
  if (accounts.length === 0) {
    console.error(`Aucun compte mot de passe pour ${email}.`);
    process.exit(1);
  }

  const hash = await hashPassword(password);
  await client.query("update account set password = $1 where id = $2", [
    hash,
    accounts[0].id,
  ]);
  await client.query("delete from session where \"userId\" = $1", [userId]);

  console.log(`Mot de passe mis à jour pour ${email}. Sessions révoquées.`);
} finally {
  await client.end();
}
