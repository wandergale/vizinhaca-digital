import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import acaoService from '../services/acaoService';
import { rotuloPrioridade } from '../services/mockData';
import api from '../services/api';
import '../styles/actions.css';

export default function ActionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [acao, setAcao] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [feedback, setFeedback] = useState({ texto: '', tipo: '' });
  const [inscrevendo, setInscrevendo] = useState(false);

  useEffect(() => {
    acaoService.buscarPorId(id)
      .then((dados) => setAcao(dados))
      .finally(() => setCarregando(false));
  }, [id]);

  // POST /registrations — inscreve o usuário na ação
  async function inscrever() {
    setInscrevendo(true);
    setFeedback({ texto: '', tipo: '' });
    try {
      await api.post('/registrations', { actionId: id });
      setFeedback({ texto: 'Inscrição realizada com sucesso!', tipo: 'sucesso' });
    } catch (err) {
      // Mock: simula sucesso quando o backend não está disponível
      setFeedback({ texto: 'Inscrição registrada (modo demonstração).', tipo: 'sucesso' });
    } finally {
      setInscrevendo(false);
    }
  }

  if (carregando) {
    return <div className="actions"><p className="actions-vazio">Carregando…</p></div>;
  }

  if (!acao) {
    return (
      <div className="actions">
        <p className="actions-vazio">Ação não encontrada.</p>
        <Link to="/acoes" className="action-back">← Voltar para ações</Link>
      </div>
    );
  }

  return (
    <div className="actions">
      <Link to="/acoes" className="action-back">← Voltar para ações</Link>

      <div className="action-detail">
        <span className={`action-priority p-${(acao.priority || 'MEDIUM').toLowerCase()}`}>
          {rotuloPrioridade(acao.priority)}
        </span>
        <h1>{acao.title}</h1>
        <p className="action-detail-desc">{acao.description}</p>

        <ul className="action-detail-meta">
          <li><strong>Data:</strong> {new Date(acao.date).toLocaleString('pt-BR')}</li>
          <li><strong>Local:</strong> {acao.location}</li>
          {acao.limiteVagas != null && (
            <li><strong>Vagas:</strong> {acao.inscritos ?? 0} / {acao.limiteVagas}</li>
          )}
        </ul>

        <div className="action-detail-actions">
          <button className="btn-inscrever" onClick={inscrever} disabled={inscrevendo}>
            {inscrevendo ? 'Inscrevendo…' : 'Inscrever-se'}
          </button>
          <button className="btn-editar" onClick={() => navigate(`/editar-acao/${acao.id}`)}>
            Editar ação
          </button>
        </div>

        {feedback.texto && (
          <p className={`action-feedback ${feedback.tipo}`}>{feedback.texto}</p>
        )}
      </div>
    </div>
  );
}
