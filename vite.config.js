import { existsSync, readFileSync, statSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// #44: `vite preview` answers like Vercel with vercel.json (generated from src/routing.js), instead of its SPA fallback:
// trailing slash -> 308, redirects -> 308 (query kept), existing files, rewrites to the prerendered HTML, and every
// other path -> HTTP 404 with dist/404.html (public/404.html). Local only; the deployed behaviour is checked on Preview.
const vercelRouting = {
  name: 'vercel-routing-preview',
  configurePreviewServer(server) {
    const { redirects, rewrites } = JSON.parse(readFileSync('vercel.json', 'utf8'))
    const outDir = server.config.build.outDir
    const isFile = (path) => existsSync(`${outDir}${path}`) && statSync(`${outDir}${path}`).isFile()
    const redirect = (res, location) => {
      res.writeHead(308, { Location: location })
      res.end()
    }
    server.middlewares.use((req, res, next) => {
      const [path, query] = req.url.split('?')
      const qs = query ? `?${query}` : ''
      if (path.length > 1 && path.endsWith('/')) return redirect(res, path.replace(/\/+$/, '') + qs)
      const target = redirects.find((r) => r.source === path)
      if (target) return redirect(res, target.destination + qs)
      if (path === '/' || isFile(path)) return next()
      const rewrite = rewrites.find((r) => r.source === path)
      if (rewrite) {
        req.url = rewrite.destination + qs
        return next()
      }
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
      res.end(readFileSync(`${outDir}/404.html`))
    })
  },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vercelRouting],
})
