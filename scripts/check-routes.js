// Сверяет маршруты React Router (src/App.jsx, src/routing.js) с vercel.json (#44 Phase 0).
// Языковые URL из src/routing.js — статические HTML после prerender (cleanUrls); остальные SPA-маршруты App.jsx
// отдаются через rewrite на /spa-shell (clean URL файла dist/spa-shell.html; с cleanUrls путь с .html не разрешается). Маршрут без файла или rewrite получит на Vercel HTTP 404,
// лишний rewrite отдаст HTTP 200 вместо 404.
import { readFileSync } from "node:fs";
import process from "node:process";
import { PRERENDERED } from "../src/routing.js";

const app = readFileSync(new URL("../src/App.jsx", import.meta.url), "utf8");
const vercel = JSON.parse(readFileSync(new URL("../vercel.json", import.meta.url), "utf8"));

const spaRoutes = [...app.matchAll(/<Route\s+path=['"]([^'"]+)['"]/g)].map((m) => m[1]).filter((path) => path !== "*");
const prerendered = PRERENDERED.map((r) => r.url);
const rewrites = vercel.rewrites.map((r) => r.source);

const errors = [];
const missing = spaRoutes.filter((path) => !rewrites.includes(path));
const extra = rewrites.filter((path) => !spaRoutes.includes(path));
const both = spaRoutes.filter((path) => prerendered.includes(path));
if (missing.length) errors.push(`нет rewrite: ${missing.join(", ")}`);
if (extra.length) errors.push(`лишний rewrite: ${extra.join(", ")}`);
if (both.length) errors.push(`маршрут и в App.jsx, и в routing.js: ${both.join(", ")}`);
if (vercel.rewrites.some((r) => r.destination !== "/spa-shell")) errors.push("rewrite не на /spa-shell");
if (vercel.cleanUrls !== true || vercel.trailingSlash !== false) errors.push("нужны cleanUrls: true и trailingSlash: false");

if (errors.length) {
    console.error("vercel.json не совпадает с маршрутами src/App.jsx и src/routing.js");
    for (const e of errors) console.error("  " + e);
    process.exit(1);
}
console.log(`check-routes: ${spaRoutes.length} SPA-маршрутов (rewrites) и ${prerendered.length} языковых URL (prerender) совпадают с vercel.json`);
