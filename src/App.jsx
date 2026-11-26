import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import "./reset.css"
import i18n, { fixedI18n } from './i18n';
import { PRERENDERED } from './routing';
import MainPage from "./pages/mainPage/mainPage";
import ProjectsPage from './pages/projectsPage/projectsPage';
import OpenGovernmentPage from './pages/openGovernmentPage/openGovernmentPage';
import CommunityPage from './pages/communityPage/communityPage';
import AboutProjectPage from './pages/aboutProjectPage/aboutProjectPage';
import ToolsPage from './pages/toolsPage/toolsPage';
import ToolDetail from './pages/toolsPage/toolDetail/toolDetail';
import NotFoundPage from './pages/notFoundPage/notFoundPage';
import ScrollToTop from './scrollTop/scrollToTop';

// #44 Phase 0: prerendered language URLs (src/routing.js) render with the language of their URL.
const PAGE_ELEMENTS = {
  '/': <MainPage />,
  '/tools/open-data': <ToolDetail tool="openData" />,
  '/projects': <ProjectsPage />,
};

// The shared instance follows the last language URL, so RU-only routes reached from /kk or /en keep that language
// as before #44 (they still switch in place with the header buttons until Phase 1).
function LangScope({ lang, children }) {
  useEffect(() => {
    document.documentElement.lang = lang.hreflang;
    if (i18n.language !== lang.key) i18n.changeLanguage(lang.key);
  }, [lang]);
  return <I18nextProvider i18n={fixedI18n(lang.key)}>{children}</I18nextProvider>;
}

// The router is provided by the entry: BrowserRouter in src/main.jsx, StaticRouter in src/entry-server.jsx.
function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {PRERENDERED.map(({ url, lang, page }) => (
          <Route key={url} path={url} element={<LangScope lang={lang}>{PAGE_ELEMENTS[page.path]}</LangScope>} />
        ))}
        <Route path="/open-government" element={<OpenGovernmentPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/about" element={<AboutProjectPage />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/tools/open-budgets" element={<ToolDetail tool="openBudgets" />} />
        <Route path="/tools/legal-acts" element={<ToolDetail tool="legalActs" />} />
        {/* SPA route: add it to rewrites in vercel.json too, otherwise a direct URL gets HTTP 404 (npm run check:routes). */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
