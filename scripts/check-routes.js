// Маршруты сайта (#44): src/routing.js — единый источник; vercel.json и dist/ должны ему соответствовать.
//   node scripts/check-routes.js          — vercel.json совпадает с vercelRouting() и в src/App.jsx нет маршрутов вне routing.js
//                                           (запускается перед `npm run build`);
//   node scripts/check-routes.js --dist   — после prerender: в dist/ ровно по одному HTML на языковой URL плюс 404.html;
//   node scripts/check-routes.js --write  — записать vercel.json из src/routing.js (после изменения PAGES или LANGS).
// Расхождение означает HTTP 404 на существующей странице или ложный 200 на Vercel.
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import process from "node:process";
import { PRERENDERED, fileOf, vercelRouting } from "../src/routing.js";

const root = new URL("../", import.meta.url);
const expected = vercelRouting();
const errors = [];

if (process.argv.includes("--write")) {
    writeFileSync(new URL("vercel.json", root), JSON.stringify(expected, null, 2) + "\n");
    console.log(`check-routes: vercel.json записан (${expected.redirects.length} redirects, ${expected.rewrites.length} rewrites)`);
    process.exit(0);
}

if (process.argv.includes("--dist")) {
    const dist = new URL("dist/", root);
    const html = [];
    const walk = (dir, prefix) => {
        for (const e of readdirSync(new URL(dir, dist), { withFileTypes: true })) {
            if (e.isDirectory()) walk(`${dir}${e.name}/`, `${prefix}${e.name}/`);
            else if (e.name.endsWith(".html")) html.push(`${prefix}${e.name}`);
        }
    };
    walk("", "");
    const want = [...PRERENDERED.map((r) => fileOf(r.url)), "404.html"];
    const missing = want.filter((f) => !html.includes(f));
    const extra = html.filter((f) => !want.includes(f));
    if (missing.length) errors.push(`нет файла в dist/: ${missing.join(", ")}`);
    if (extra.length) errors.push(`лишний HTML в dist/ (ложный 200): ${extra.join(", ")}`);
    if (errors.length) fail("dist/ не совпадает с языковыми URL src/routing.js");
    console.log(`check-routes: dist/ — ${PRERENDERED.length} языковых URL и 404.html`);
    process.exit(0);
}

const vercel = JSON.parse(readFileSync(new URL("vercel.json", root), "utf8"));
if (JSON.stringify(vercel) !== JSON.stringify(expected)) {
    errors.push("vercel.json отличается от vercelRouting() в src/routing.js — выполните node scripts/check-routes.js --write");
}
const app = readFileSync(new URL("src/App.jsx", root), "utf8");
const literal = [...app.matchAll(/<Route\s+path=['"]([^'"]+)['"]/g)].map((m) => m[1]).filter((path) => path !== "*");
if (literal.length) errors.push(`маршрут в src/App.jsx вне src/routing.js: ${literal.join(", ")}`);
if (errors.length) fail("vercel.json или src/App.jsx не совпадает с src/routing.js");
console.log(`check-routes: ${PRERENDERED.length} языковых URL, vercel.json совпадает (${expected.redirects.length} redirects 308, ${expected.rewrites.length} rewrites)`);

function fail(title) {
    console.error(title);
    for (const e of errors) console.error("  " + e);
    process.exit(1);
}
