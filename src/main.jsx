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

// #44: every language URL ships its prerendered HTML and is hydrated. createRoot remains for the dev server
// (`npm run dev`), which serves the empty index.html template.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
