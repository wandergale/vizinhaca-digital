import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import acaoService from '../services/acaoService';
import { rotuloPrioridade } from '../services/mockData';
import '../styles/actions.css';

import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

export default function Actions() {
  const [acoes, setAcoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    acaoService.listar()
      .then((dados) => setAcoes(dados))
      .finally(() => setCarregando(false));
  }, []);

  const filtradas = filtro
    ? acoes.filter((a) => a.priority === filtro)
    : acoes;

  return (
    <div className="actions">
      <div className="actions-header">
        <h1>Ações Comunitárias</h1>
        <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
          <option value="">Todas as prioridades</option>
          <option value="HIGH">Alta</option>
          <option value="MEDIUM">Média</option>
          <option value="LOW">Baixa</option>
        </select>
      </div>

      {carregando ? (
        <p className="actions-vazio">Carregando ações…</p>
      ) : filtradas.length === 0 ? (
        <p className="actions-vazio">Nenhuma ação encontrada.</p>
      ) : (
        <div className="actions-grid">
          {filtradas.map((acao) => (
            <Link key={acao.id} to={`/acoes/${acao.id}`} className="action-card">
              <span className={`action-priority p-${(acao.priority || 'MEDIUM').toLowerCase()}`}>
                {rotuloPrioridade(acao.priority)}
              </span>
              <h3>{acao.title}</h3>
              <p className="action-card-desc">{acao.description}</p>
              <div className="action-card-meta">
                <span><FaCalendarAlt /> {new Date(acao.date).toLocaleDateString('pt-BR')}</span>
                <span><FaMapMarkerAlt /> {acao.location}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
