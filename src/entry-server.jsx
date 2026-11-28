// Build-time only (#44): `vite build --ssr` bundles this for scripts/prerender.js; not a runtime server.
/* eslint-disable react-refresh/only-export-components -- build-time SSR entry, never hot-reloaded */
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import './i18n.js'
import App from './App.jsx'

export { PRERENDERED, headTags, fileOf } from './routing.js'
export { fixedI18n } from './i18n.js'

export const render = (url) => renderToString(
  <StrictMode>
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  </StrictMode>,
)
