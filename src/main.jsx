import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './i18n.js'
import App from './App.jsx'

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// #44: prerendered URLs ship their HTML and are hydrated; other routes get the empty SPA shell and render on the client.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
