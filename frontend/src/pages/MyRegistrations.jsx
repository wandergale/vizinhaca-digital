import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

function MyRegistrations() {
  const [inscricoes, setInscricoes] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [modalEdicao, setModalEdicao] = useState(false);
  const [modalCancelamento, setModalCancelamento] = useState(false);
  const [selecionada, setSelecionada] = useState(null);
  const [formEdicao, setFormEdicao] = useState({ nome: '', email: '' });

  useEffect(() => {
    carregarInscricoes();
  }, []);

  const carregarInscricoes = () => {
    const dados = JSON.parse(localStorage.getItem('inscricoes')) || [];
    setInscricoes(dados);
  };

  const abrirEdicao = (inscricao) => {
    setSelecionada(inscricao);
    setFormEdicao({ nome: inscricao.nome, email: inscricao.email });
    setModalEdicao(true);
  };

  const salvarEdicao = (e) => {
    e.preventDefault();
    const dados = JSON.parse(localStorage.getItem('inscricoes')) || [];
    const idx = dados.findIndex(i => i.id === selecionada.id);
    if (idx !== -1) {
      dados[idx].nome = formEdicao.nome;
      dados[idx].email = formEdicao.email;
      localStorage.setItem('inscricoes', JSON.stringify(dados));
      setFeedback('Inscrição atualizada com sucesso!');
    }
    setModalEdicao(false);
    carregarInscricoes();
  };

  const abrirCancelamento = (inscricao) => {
    setSelecionada(inscricao);
    setModalCancelamento(true);
  };

  const confirmarCancelamento = () => {
    let dados = JSON.parse(localStorage.getItem('inscricoes')) || [];
    dados = dados.filter(i => i.id !== selecionada.id);
    localStorage.setItem('inscricoes', JSON.stringify(dados));
    setFeedback('Inscrição cancelada com sucesso!');
    setModalCancelamento(false);
    carregarInscricoes();
  };

  return (
    <div className="layout">
      <Sidebar ativo="Minhas Inscrições" />
      <main className="content">
        <h1>Minhas Inscrições</h1>

        {feedback && <p className="mensagem sucesso">{feedback}</p>}

        <table className="tabela">
          <thead>
            <tr>
              <th>Ação</th>
              <th>Data</th>
              <th>Local</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            {inscricoes.length === 0 ? (
              <tr><td colSpan={4}>Nenhuma inscrição encontrada.</td></tr>
            ) : (
              inscricoes.map(i => (
                <tr key={i.id}>
                  <td>{i.acao}</td>
                  <td>{i.data}</td>
                  <td>{i.local}</td>
                  <td style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                    <button className="btn-secondary" onClick={() => abrirEdicao(i)}>Editar</button>
                    <button className="btn-danger" onClick={() => abrirCancelamento(i)}>Cancelar</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </main>

      {modalEdicao && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setModalEdicao(false)}>
          <div className="modal-box">
            <h2 style={{ marginTop: 0 }}>Editar Inscrição</h2>
            <form onSubmit={salvarEdicao}>
              <div className="form-group">
                <label>Nome</label>
                <input
                  type="text"
                  value={formEdicao.nome}
                  onChange={e => setFormEdicao(p => ({ ...p, nome: e.target.value }))}
                  required
                />
                <label>E-mail</label>
                <input
                  type="email"
                  value={formEdicao.email}
                  onChange={e => setFormEdicao(p => ({ ...p, email: e.target.value }))}
                  required
                />
              </div>
              <div className="form-buttons">
                <button type="submit" className="btn-primary">Salvar</button>
                <button type="button" className="btn-danger" onClick={() => setModalEdicao(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {modalCancelamento && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setModalCancelamento(false)}>
          <div className="modal-box" style={{ textAlign: 'center' }}>
            <h2 style={{ marginTop: 0 }}>Cancelar Inscrição</h2>
            <p>Tem certeza que deseja cancelar sua inscrição?</p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <button className="btn-primary" onClick={confirmarCancelamento}>Sim</button>
              <button className="btn-danger" onClick={() => setModalCancelamento(false)}>Não</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyRegistrations;
