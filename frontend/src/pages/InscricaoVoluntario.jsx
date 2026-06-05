import { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/inscricao-voluntario.css';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const acoesDisponiveis = [
  { titulo: 'Ação 1', descricao: 'Revitalização da Praça', data: '11/05/2026', local: 'Praça Central', prioridade: 'Alta' },
  { titulo: 'Ação 2', descricao: 'Mutirão de Limpeza', data: '12/05/2026', local: 'Escola Municipal', prioridade: 'Média' },
  { titulo: 'Ação 3', descricao: 'Plantio de Árvores', data: '13/05/2026', local: 'Parque Verde', prioridade: 'Baixa' }
];

export default function InscricaoVoluntario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [acao, setAcao] = useState('');
  const [prioridade, setPrioridade] = useState('Alta');
  const [consente, setConsente] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [acaoModal, setAcaoModal] = useState(null);
  const [activeTab, setActiveTab] = useState('detalhes');

  const [modalConfirmacaoVisible, setModalConfirmacaoVisible] = useState(false);
  const [dadosInscricao, setDadosInscricao] = useState('');

  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  function initLeafletMap() {
    if (mapInstanceRef.current) return;
    const pracaCentral = [-9.916, -36.355];
    const map = L.map(mapRef.current).setView(pracaCentral, 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    L.marker(pracaCentral).addTo(map).bindPopup('Praça Central').openPopup();
    mapInstanceRef.current = map;
  }

  function abrirModal(acaoItem) {
    setAcaoModal(acaoItem);
    setActiveTab('detalhes');
    setModalVisible(true);
  }

  function mostrarTab(tab) {
    setActiveTab(tab);
    if (tab === 'mapa') {
      setTimeout(() => {
        initLeafletMap();
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 100);
    }
  }

  function confirmarInscricao(e) {
    if (e) e.preventDefault();
    if (!acao) {
      alert("Por favor, selecione uma ação.");
      return false;
    }
    const novaInscricao = {
      id: Date.now(),
      nome,
      email,
      acao,
      data: acao.includes("11/05") ? "11/05/2026" : "13/05/2026",
      local: "Praça Central"
    };
    let inscricoes = JSON.parse(localStorage.getItem("inscricoes")) || [];
    inscricoes.push(novaInscricao);
    localStorage.setItem("inscricoes", JSON.stringify(inscricoes));

    setDadosInscricao(`<strong>Nome:</strong> ${nome}<br><strong>Email:</strong> ${email}<br><strong>Ação:</strong> ${acao}`);
    setModalConfirmacaoVisible(true);
    return false;
  }

  function fecharConfirmacao() {
    setModalConfirmacaoVisible(false);
  }

  function handleOverlayModal(e) {
    if (e.target === e.currentTarget) setModalVisible(false);
  }

  function handleOverlayConfirmacao(e) {
    if (e.target === e.currentTarget) setModalConfirmacaoVisible(false);
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div className="sidebar">
        <h2>Sistema de Cadastro e Agendamento de Ações Comunitárias</h2>
        <ul>
          <li>Início</li>
          <li>Administração</li>
          <li>Períodos</li>
          <li>Agendamentos</li>
          <li className="active">Ações</li>
          <li>Sair</li>
        </ul>
      </div>

      <div className="main">
        <h1>Ficha de Inscrição</h1>
        <form id="formInscricao" onSubmit={confirmarInscricao}>
          <label htmlFor="nome">Nome Completo</label>
          <input
            type="text"
            id="nome"
            required
            value={nome}
            onChange={e => setNome(e.target.value)}
          />

          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <label htmlFor="acao">Escolher Ação</label>
          <select id="acao" required value={acao} onChange={e => setAcao(e.target.value)}>
            <option value="">Selecione...</option>
            <option>Ação 1 — Revitalização Praça Central — 11/05/2026</option>
            <option>Ação 2 — Mutirão de Limpeza — 12/05/2026</option>
            <option>Ação 3 — Plantio de Árvores — 13/05/2026</option>
            <option>Ação 4 — Oficina de Reciclagem — 14/05/2026</option>
          </select>

          <label htmlFor="prioridade">Nível de Prioridade</label>
          <select id="prioridade" required value={prioridade} onChange={e => setPrioridade(e.target.value)}>
            <option value="Alta">Alta</option>
            <option value="Média">Média</option>
            <option value="Baixa">Baixa</option>
          </select>

          <div className="consent">
            <input
              type="checkbox"
              id="consente"
              required
              checked={consente}
              onChange={e => setConsente(e.target.checked)}
            />
            <label htmlFor="consente">Li e aceito os termos do voluntariado</label>
          </div>

          <button type="submit" className="confirmar">Confirmar Inscrição</button>
        </form>

        <h2>Ações Disponíveis</h2>
        <table className="acoes">
          <thead>
            <tr>
              <th>Título</th>
              <th>Descrição</th>
              <th>Data</th>
              <th>Local</th>
              <th>Prioridade</th>
            </tr>
          </thead>
          <tbody>
            {acoesDisponiveis.map((a, i) => (
              <tr key={i} onClick={() => abrirModal(a)}>
                <td>{a.titulo}</td>
                <td>{a.descricao}</td>
                <td>{a.data}</td>
                <td>{a.local}</td>
                <td>{a.prioridade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        className="modal"
        id="modal"
        style={{ display: modalVisible ? 'flex' : 'none' }}
        onClick={handleOverlayModal}
      >
        <div className="modal-content">
          <div className="tabs">
            <button
              className={activeTab === 'detalhes' ? 'active' : ''}
              onClick={() => mostrarTab('detalhes')}
            >DETALHES</button>
            <button
              className={activeTab === 'mapa' ? 'active' : ''}
              onClick={() => mostrarTab('mapa')}
            >MAPA</button>
          </div>
          <div className="tab" id="detalhes" style={{ display: activeTab === 'detalhes' ? 'block' : 'none' }}>
            <h2 id="titulo">{acaoModal?.titulo}</h2>
            <p><strong>Descrição:</strong> <span id="descricao">{acaoModal?.descricao}</span></p>
            <p><strong>Data:</strong> <span id="data">{acaoModal?.data}</span></p>
            <p><strong>Local:</strong> <span id="local">{acaoModal?.local}</span></p>
            <p><strong>Prioridade:</strong> <span id="prioridade">{acaoModal?.prioridade}</span></p>
            <button className="inscrever" onClick={() => confirmarInscricao(null)}>Inscrever</button>
          </div>
          <div className="tab" id="mapa" style={{ display: activeTab === 'mapa' ? 'block' : 'none' }}>
            <div id="leafletMap" ref={mapRef} style={{ width: '100%', height: '300px' }} />
            <button className="inscrever" onClick={() => confirmarInscricao(null)}>Inscrever</button>
          </div>
        </div>
      </div>

      <div
        className="modal"
        id="modalConfirmacao"
        style={{ display: modalConfirmacaoVisible ? 'flex' : 'none' }}
        onClick={handleOverlayConfirmacao}
      >
        <div className="modal-content">
          <h2>Inscrição Confirmada!</h2>
          <p
            id="dadosInscricao"
            dangerouslySetInnerHTML={{ __html: dadosInscricao }}
          />
          <button className="fechar" onClick={fecharConfirmacao}>Fechar</button>
        </div>
      </div>
    </div>
  );
}
