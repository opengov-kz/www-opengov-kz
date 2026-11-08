import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./reset.css"
import MainPage from "./pages/mainPage/mainPage";
import AboutPage from './pages/aboutPage/aboutPage';
import NewsPage from './pages/newsPage/newsPage';
import ProjectsPage from './pages/projectsPage/projectsPage';
import MembersPage from './pages/membersPage/membersPage';
import NewsDetail from './pages/newsPage/newsDetail/newsDetail';
import ProjectDetailPage from './pages/projectsPage/projectsDetailPage/projectDetailPage';
import MembersDetailPage from './pages/membersPage/membersDetailPage/membersDetailPage';
import ToolsPage from './pages/toolsPage/toolsPage';
import ToolDetail from './pages/toolsPage/toolDetail/toolDetail';
import NotFoundPage from './pages/notFoundPage/notFoundPage';
import ScrollToTop from './scrollTop/scrollToTop';

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/aboutMe' element={<AboutPage />} />
          <Route path='/news' element={<NewsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/members" element={<MembersPage />} />
          <Route path="/newsDetail" element={<NewsDetail />} />
          <Route path="/projectDetail" element={<ProjectDetailPage />} />
          <Route path="/membersDetail" element={<MembersDetailPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/tools/open-data" element={<ToolDetail tool="openData" />} />
          <Route path="/tools/open-budgets" element={<ToolDetail tool="openBudgets" />} />
          <Route path="/tools/legal-acts" element={<ToolDetail tool="legalActs" />} />
          {/* Новый маршрут нужно добавить и в rewrites vercel.json, иначе прямой URL получит HTTP 404 (npm run check:routes). */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
