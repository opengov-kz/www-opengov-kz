import { existsSync, readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// #44: `vite preview` follows vercel.json (cleanUrls, trailingSlash: false, rewrites to the SPA shell) instead of its
// SPA fallback, which would serve the prerendered home on every path. Local only; HTTP 404 is checked on Vercel.
// shortcut: unknown paths get the SPA shell (client NotFound, the local mode of tests/e2e/helpers.js), not 404.html.
const vercelRouting = {
  name: 'vercel-routing-preview',
  configurePreviewServer(server) {
    const { rewrites } = JSON.parse(readFileSync('vercel.json', 'utf8'))
    const outDir = server.config.build.outDir
    server.middlewares.use((req, res, next) => {
      const [path, query] = req.url.split('?')
      if (path.length > 1 && path.endsWith('/')) {
        res.writeHead(308, { Location: path.replace(/\/+$/, '') + (query ? `?${query}` : '') })
        return res.end()
      }
      const file = path === '/' ? '/index.html' : `${path}.html`
      const rewrite = rewrites.find((r) => r.source === path)
      // As on Vercel with cleanUrls, a rewrite destination is a clean URL: /spa-shell -> spa-shell.html.
      if (existsSync(`${outDir}${file}`)) req.url = file
      else if (rewrite) req.url = existsSync(`${outDir}${rewrite.destination}.html`) ? `${rewrite.destination}.html` : '/__missing__'
      else if (!/\.[a-z0-9]+$/i.test(path)) req.url = '/spa-shell.html'
      next()
    })
  },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vercelRouting],
})
