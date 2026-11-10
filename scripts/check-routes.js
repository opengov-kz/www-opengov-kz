// Сверяет маршруты React Router (src/App.jsx) с allowlist rewrites в vercel.json.
// Маршрут без rewrite получит на Vercel HTTP 404 при прямом заходе; лишний rewrite отдаст HTTP 200 вместо 404.
import { readFileSync } from "node:fs";
import process from "node:process";

const app = readFileSync(new URL("../src/App.jsx", import.meta.url), "utf8");
const vercel = JSON.parse(readFileSync(new URL("../vercel.json", import.meta.url), "utf8"));

// "/" отдаёт сам index.html, "*" — клиентская 404; rewrites для них не нужны.
const routes = [...app.matchAll(/<Route\s+path=['"]([^'"]+)['"]/g)]
    .map((m) => m[1])
    .filter((path) => path !== "/" && path !== "*");
const rewrites = vercel.rewrites.map((r) => r.source);

const missing = routes.filter((path) => !rewrites.includes(path));
const extra = rewrites.filter((path) => !routes.includes(path));

if (missing.length || extra.length) {
    console.error("vercel.json rewrites не совпадают с маршрутами src/App.jsx");
    if (missing.length) console.error("  нет rewrite:", missing.join(", "));
    if (extra.length) console.error("  лишний rewrite:", extra.join(", "));
    process.exit(1);
}
console.log(`check-routes: ${routes.length} маршрутов совпадают с vercel.json`);
