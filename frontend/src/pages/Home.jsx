import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="layout">
      <Sidebar ativo="Início" />
      <main className="content">
        <h2>Bem-vindo ao Sistema de Ações Comunitárias</h2>
        <p>Gerencie ações, inscrições de voluntários e acompanhe o calendário da sua comunidade.</p>
        <div style={{ display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={() => navigate('/actions')}>Cadastro de Ações</button>
          <button className="btn-secondary" onClick={() => navigate('/calendar')}>Calendário</button>
          <button className="btn-success" onClick={() => navigate('/actions/1')}>Inscrição de Voluntário</button>
          <button className="btn-primary" onClick={() => navigate('/my-registrations')}>Minhas Inscrições</button>
        </div>
      </main>
    </div>
  );
}

export default Home;
