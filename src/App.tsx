import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Trends from './pages/Trends';
import Guide from './pages/Guide';
import Closer from './pages/Closer';
import SavedPage from './pages/SavedPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="trends" element={<Trends />} />
        <Route path="guide" element={<Guide />} />
        <Route path="closer" element={<Closer />} />
        <Route path="saved" element={<SavedPage />} />
      </Route>
    </Routes>
  );
}
