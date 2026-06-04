import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Autenticacao from './pages/Autenticacao';
import CadastroAcoes from './pages/CadastroAcoes';
import Calendario from './pages/Calendario';
import EdicaoCancelar from './pages/EdicaoCancelar';
import InscricaoVoluntario from './pages/InscricaoVoluntario';
import PainelInscricoes from './pages/PainelInscricoes';
import RelatoriosAcoes from './pages/RelatoriosAcoes';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/autenticacao" replace />} />
      <Route path="/autenticacao" element={<Autenticacao />} />
      <Route element={<Layout />}>
        <Route path="/cadastro-acoes"      element={<CadastroAcoes />} />
        <Route path="/calendario"          element={<Calendario />} />
        <Route path="/minhas-inscricoes"   element={<EdicaoCancelar />} />
        <Route path="/inscricao-voluntario" element={<InscricaoVoluntario />} />
        <Route path="/painel-inscricoes"   element={<PainelInscricoes />} />
        <Route path="/relatorios"          element={<RelatoriosAcoes />} />
      </Route>
    </Routes>
  );
}

export default App;
