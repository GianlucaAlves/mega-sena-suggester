import {Routes, Route, Link} from 'react-router-dom';
import HomePage from './pages/HomePage';
import HistoricoPage from './pages/HistoricoPage';
import PalpitePage from './pages/PalpitePage';
import SorteioPage from './pages/SorteioPage';

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Início</Link>
        <Link to="/palpite">Palpite</Link>
        <Link to="/historico">Histórico</Link>
        <Link to="/sorteio">Sorteio</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/palpite" element={<PalpitePage />} />
        <Route path="/historico" element={<HistoricoPage />} />
        <Route path="/sorteio" element={<SorteioPage />} />

      </Routes>
    </div>
  );
}

export default App
