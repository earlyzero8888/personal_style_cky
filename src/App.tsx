import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import CategoryList from './pages/CategoryList';
import CategoryDetail from './pages/CategoryDetail';
import TalkDetail from './pages/TalkDetail';
import SavedPage from './pages/SavedPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="categories" element={<CategoryList />} />
        <Route path="categories/:categoryId" element={<CategoryDetail />} />
        <Route path="talk/:topicId" element={<TalkDetail />} />
        <Route path="saved" element={<SavedPage />} />
      </Route>
    </Routes>
  );
}
