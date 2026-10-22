import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const base = "https://atelierdeseduction.vercel.app";
const src = "public/images/products";
const file = path.resolve(
  src,
  fs.readdirSync(src).find((f) => /\.(jpe?g|png)$/i.test(f)),
);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const log = [];
page.on("response", (r) => {
  if (/blob|upload/i.test(r.url())) log.push(`${r.status()} ${r.request().method()} ${r.url().slice(0, 100)}`);
});
const consoleErrs = [];
page.on("console", (m) => m.type() === "error" && consoleErrs.push(m.text().slice(0, 160)));

await page.goto(`${base}/admin/login`, { waitUntil: "domcontentloaded" });
await page.waitForSelector('input[type="email"]', { timeout: 20000 });
await page.fill('input[type="email"]', "atelierdeseduction@gmail.com");
await page.fill('input[type="password"]', "Atelier!aMpoynVieqWLsN");
const [resp] = await Promise.all([
  page.waitForResponse((r) => r.url().includes("/api/auth/sign-in/email"), { timeout: 20000 }),
  page.click('button[type="submit"]'),
]);
console.log("sign-in:", resp.status());
await page.waitForURL(/\/admin(\?|$)/, { timeout: 20000 }).catch(() => {});

await page.goto(`${base}/admin/produits/new`, { waitUntil: "domcontentloaded" });
await page.waitForSelector('input[type="file"]', { state: "attached", timeout: 20000 });
console.log("formulaire:", page.url());
await page.locator('input[type="file"]').first().setInputFiles(file);
await page.waitForTimeout(10000);

const body = await page.textContent("body");
console.log("--- texte visible ---");
console.log(body.replace(/\s+/g, " ").slice(0, 900));
console.log("--- img src ---");
console.log(await page.locator("img").evaluateAll((els) => els.map((e) => e.getAttribute("src")).filter(Boolean)));
console.log("--- requetes ---");
console.log(log);
console.log("--- erreurs console ---");
console.log(consoleErrs.slice(0, 4));

await browser.close();
process.exit(0);
