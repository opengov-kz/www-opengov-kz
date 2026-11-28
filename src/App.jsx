import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import "./reset.css"
import i18n, { fixedI18n } from './i18n';
import { PRERENDERED, langOfPath } from './routing';
import MainPage from "./pages/mainPage/mainPage";
import ProjectsPage from './pages/projectsPage/projectsPage';
import OpenGovernmentPage from './pages/openGovernmentPage/openGovernmentPage';
import CommunityPage from './pages/communityPage/communityPage';
import AboutProjectPage from './pages/aboutProjectPage/aboutProjectPage';
import ToolsPage from './pages/toolsPage/toolsPage';
import ToolDetail from './pages/toolsPage/toolDetail/toolDetail';
import NotFoundPage from './pages/notFoundPage/notFoundPage';
import ScrollToTop from './scrollTop/scrollToTop';

// #44: every route of src/routing.js exists as RU, /kk and /en language URLs, all prerendered at build time.
const PAGE_ELEMENTS = {
  '/': <MainPage />,
  '/open-government': <OpenGovernmentPage />,
  '/tools': <ToolsPage />,
  '/tools/open-data': <ToolDetail tool="openData" />,
  '/tools/open-budgets': <ToolDetail tool="openBudgets" />,
  '/tools/legal-acts': <ToolDetail tool="legalActs" />,
  '/community': <CommunityPage />,
  '/about': <AboutProjectPage />,
  '/projects': <ProjectsPage />,
};

// A page renders with the i18next instance fixed to the language of its URL, in the same render as the route
// (prerender, hydration, SPA navigation). The shared instance and <html lang> follow it for code outside the tree.
function LangScope({ lang, children }) {
  useEffect(() => {
    document.documentElement.lang = lang.hreflang;
    if (i18n.language !== lang.key) i18n.changeLanguage(lang.key);
  }, [lang]);
  return <I18nextProvider i18n={fixedI18n(lang.key)}>{children}</I18nextProvider>;
}

// Client NotFound, reached only by SPA navigation to an unknown path (a direct request gets HTTP 404 with
// public/404.html from the server); its language comes from the /kk or /en prefix of the path.
function NotFoundScope() {
  const lang = langOfPath(useLocation().pathname);
  return <LangScope lang={lang}><NotFoundPage /></LangScope>;
}

// The router is provided by the entry: BrowserRouter in src/main.jsx, StaticRouter in src/entry-server.jsx.
// A route is added in src/routing.js (PAGES) and here; vercel.json is generated from routing.js (npm run check:routes).
function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {PRERENDERED.map(({ url, lang, page }) => (
          <Route key={url} path={url} element={<LangScope lang={lang}>{PAGE_ELEMENTS[page.path]}</LangScope>} />
        ))}
        <Route path="*" element={<NotFoundScope />} />
      </Routes>
    </>
  );
}

export default App;
