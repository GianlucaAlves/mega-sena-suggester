import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import HistoricoPage from "./pages/HistoricoPage";
import PalpitePage from "./pages/PalpitePage";
import SorteioPage from "./pages/SorteioPage";
import Header from "./components/Header";

function App() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#050505" }}>
      <Header />
      <main style={{ paddingTop: 94 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/palpite" element={<PalpitePage />} />
          <Route path="/historico" element={<HistoricoPage />} />
          <Route path="/sorteio" element={<SorteioPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
