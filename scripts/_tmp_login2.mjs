import pg from "pg";
import { verifyPassword } from "better-auth/crypto";

const url =
  "postgresql://neondb_owner:npg_yGVK7fS3rxRs@ep-wild-sky-ayeobzgc-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require";
const base = "https://atelierdeseduction.vercel.app";
const EMAIL = "atelierdeseduction@gmail.com";
const PASS = "Atelier!aMpoynVieqWLsN";

const c = new pg.Client({ connectionString: url });
await c.connect();
const r = await c.query('select password, "updatedAt" from account');
console.log("verify local(PASS) =>", await verifyPassword({ hash: String(r.rows[0].password), password: PASS }));
console.log("account.updatedAt  =>", r.rows[0].updatedAt);
const u = await c.query('select count(*)::int as n from session');
console.log("sessions           =>", u.rows[0].n);
await c.end();

for (let i = 0; i < 2; i++) {
  const res = await fetch(`${base}/api/auth/sign-in/email`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: base },
    body: JSON.stringify({ email: EMAIL, password: PASS }),
  });
  const txt = await res.text();
  console.log(`sign-in #${i + 1} =>`, res.status, txt.slice(0, 160));
  if (!res.ok) break;
}
