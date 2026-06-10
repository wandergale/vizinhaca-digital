import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Autenticacao from './pages/Autenticacao';
import Login from './pages/Login';
import Home from './pages/Home';
import Actions from './pages/Actions';
import ActionDetail from './pages/ActionDetail';
import CadastroAcoes from './pages/CadastroAcoes';
import Calendario from './pages/Calendario';
import EdicaoCancelar from './pages/EdicaoCancelar';
import InscricaoVoluntario from './pages/InscricaoVoluntario';
import PainelInscricoes from './pages/PainelInscricoes';
import RelatoriosAcoes from './pages/RelatoriosAcoes';
import EditarAcao from './pages/EditarAcao';
import Notificacoes from './pages/Notificacoes';
import Mensagens from './pages/Mensagens';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/autenticacao" replace />} />
      <Route path="/autenticacao" element={<Autenticacao />} />
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/home"                element={<Home />} />
        <Route path="/acoes"               element={<Actions />} />
        <Route path="/acoes/:id"           element={<ActionDetail />} />
        <Route path="/cadastro-acoes"      element={<CadastroAcoes />} />
        <Route path="/calendario"          element={<Calendario />} />
        <Route path="/minhas-inscricoes"   element={<EdicaoCancelar />} />
        <Route path="/inscricao-voluntario" element={<InscricaoVoluntario />} />
        <Route path="/painel-inscricoes"   element={<PainelInscricoes />} />
        <Route path="/relatorios"          element={<RelatoriosAcoes />} />
        <Route path="/editar-acao/:id"     element={<EditarAcao />} />
        <Route path="/notificacoes"        element={<Notificacoes />} />
        <Route path="/mensagens"           element={<Mensagens />} />
      </Route>
    </Routes>
  );
}

export default App;
