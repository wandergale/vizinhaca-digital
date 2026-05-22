import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const acoesMock = [
  { id: 1, titulo: 'Ação 1 — Revitalização Praça Central — 11/05/2026', descricao: 'Revitalização da Praça', data: '11/05/2026', local: 'Praça Central', prioridade: 'Alta', coords: [-9.916, -36.355] },
  { id: 2, titulo: 'Ação 2 — Mutirão de Limpeza — 12/05/2026', descricao: 'Mutirão de Limpeza', data: '12/05/2026', local: 'Escola Municipal', prioridade: 'Média', coords: [-9.916, -36.355] },
  { id: 3, titulo: 'Ação 3 — Plantio de Árvores — 13/05/2026', descricao: 'Plantio de Árvores', data: '13/05/2026', local: 'Parque Verde', prioridade: 'Baixa', coords: [-9.916, -36.355] },
  { id: 4, titulo: 'Ação 4 — Oficina de Reciclagem — 14/05/2026', descricao: 'Oficina de Reciclagem', data: '14/05/2026', local: 'Centro Comunitário', prioridade: 'Média', coords: [-9.916, -36.355] },
];

function ActionDetail() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [acaoSelecionada, setAcaoSelecionada] = useState('');
  const [prioridade, setPrioridade] = useState('Alta');
  const [consente, setConsente] = useState(false);
  const [modalDetalhe, setModalDetalhe] = useState(null);
  const [tabDetalhe, setTabDetalhe] = useState('detalhes');
  const [modalConfirmacao, setModalConfirmacao] = useState(null);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (tabDetalhe === 'mapa' && modalDetalhe) {
      initMap(modalDetalhe.coords);
    }
  }, [tabDetalhe, modalDetalhe]);

  const initMap = (coords) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }
    if (!mapRef.current) return;

    import('leaflet').then(L => {
      import('leaflet/dist/leaflet.css');
      const map = L.default.map(mapRef.current).setView(coords, 15);
      L.default.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);
      L.default.marker(coords).addTo(map).bindPopup(modalDetalhe.local).openPopup();
      mapInstanceRef.current = map;
    });
  };

  const abrirModal = (acao) => {
    setModalDetalhe(acao);
    setTabDetalhe('detalhes');
  };

  const fecharModal = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }
    setModalDetalhe(null);
  };

  const confirmarInscricao = (e) => {
    if (e) e.preventDefault();
    if (!acaoSelecionada) {
      alert('Por favor, selecione uma ação.');
      return;
    }
    const acao = acoesMock.find(a => a.titulo === acaoSelecionada) || acoesMock[0];
    const novaInscricao = {
      id: Date.now(),
      nome,
      email,
      acao: acaoSelecionada,
      data: acao.data,
      local: acao.local,
    };
    const inscricoes = JSON.parse(localStorage.getItem('inscricoes')) || [];
    inscricoes.push(novaInscricao);
    localStorage.setItem('inscricoes', JSON.stringify(inscricoes));
    setModalConfirmacao({ nome, email, acao: acaoSelecionada });
    fecharModal();
  };

  return (
    <div className="layout">
      <Sidebar ativo="Ações" />
      <main className="content">
        <h1>Ficha de Inscrição</h1>

        <form className="inscricao-form" onSubmit={confirmarInscricao}>
          <label>Nome Completo</label>
          <input type="text" value={nome} onChange={e => setNome(e.target.value)} required />

          <label>E-mail</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />

          <label>Escolher Ação</label>
          <select value={acaoSelecionada} onChange={e => setAcaoSelecionada(e.target.value)} required>
            <option value="">Selecione...</option>
            {acoesMock.map(a => (
              <option key={a.id} value={a.titulo}>{a.titulo}</option>
            ))}
          </select>

          <label>Nível de Prioridade</label>
          <select value={prioridade} onChange={e => setPrioridade(e.target.value)} required>
            <option value="Alta">Alta</option>
            <option value="Média">Média</option>
            <option value="Baixa">Baixa</option>
          </select>

          <div className="consent">
            <input type="checkbox" id="consente" checked={consente} onChange={e => setConsente(e.target.checked)} required />
            <label htmlFor="consente">Li e aceito os termos do voluntariado</label>
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: 20 }}>Confirmar Inscrição</button>
        </form>

        <h2>Ações Disponíveis</h2>
        <table className="tabela">
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
            {acoesMock.map(a => (
              <tr key={a.id} onClick={() => abrirModal(a)}>
                <td>{a.titulo.split(' — ')[0]}</td>
                <td>{a.descricao}</td>
                <td>{a.data}</td>
                <td>{a.local}</td>
                <td>{a.prioridade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      {modalDetalhe && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && fecharModal()}>
          <div className="modal-box modal-wide">
            <div className="modal-tabs">
              <button className={tabDetalhe === 'detalhes' ? 'active' : ''} onClick={() => setTabDetalhe('detalhes')}>
                DETALHES
              </button>
              <button className={tabDetalhe === 'mapa' ? 'active' : ''} onClick={() => setTabDetalhe('mapa')}>
                MAPA
              </button>
            </div>

            {tabDetalhe === 'detalhes' && (
              <div style={{ padding: '10px 0' }}>
                <h2 style={{ marginTop: 0 }}>{modalDetalhe.titulo.split(' — ')[0]}</h2>
                <p><strong>Descrição:</strong> {modalDetalhe.descricao}</p>
                <p><strong>Data:</strong> {modalDetalhe.data}</p>
                <p><strong>Local:</strong> {modalDetalhe.local}</p>
                <p><strong>Prioridade:</strong> {modalDetalhe.prioridade}</p>
                <button className="btn-primary" onClick={confirmarInscricao}>Inscrever</button>
              </div>
            )}

            {tabDetalhe === 'mapa' && (
              <div style={{ padding: '10px 0' }}>
                <div id="leafletMap" ref={mapRef} />
                <button className="btn-primary" style={{ marginTop: 10 }} onClick={confirmarInscricao}>Inscrever</button>
              </div>
            )}
          </div>
        </div>
      )}

      {modalConfirmacao && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setModalConfirmacao(null)}>
          <div className="modal-box" style={{ textAlign: 'center' }}>
            <h2 style={{ color: '#1e3a8a', marginTop: 0 }}>Inscrição Confirmada!</h2>
            <p>
              <strong>Nome:</strong> {modalConfirmacao.nome}<br />
              <strong>Email:</strong> {modalConfirmacao.email}<br />
              <strong>Ação:</strong> {modalConfirmacao.acao}
            </p>
            <button className="btn-primary" onClick={() => setModalConfirmacao(null)}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ActionDetail;
