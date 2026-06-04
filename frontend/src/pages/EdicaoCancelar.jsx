import { useState, useEffect } from 'react';
import '../styles/edicao-cancelar.css';

export default function EdicaoCancelar() {
  const [inscricoes, setInscricoes] = useState([]);
  const [inscricaoSelecionada, setInscricaoSelecionada] = useState(null);
  const [modalEdicaoVisible, setModalEdicaoVisible] = useState(false);
  const [modalCancelamentoVisible, setModalCancelamentoVisible] = useState(false);
  const [nomeEdicao, setNomeEdicao] = useState('');
  const [emailEdicao, setEmailEdicao] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    carregarInscricoes();
  }, []);

  function carregarInscricoes() {
    const dados = JSON.parse(localStorage.getItem("inscricoes")) || [];
    setInscricoes(dados);
  }

  function abrirEdicao(id) {
    const dados = JSON.parse(localStorage.getItem("inscricoes")) || [];
    const encontrada = dados.find(i => i.id === id);
    if (encontrada) {
      setInscricaoSelecionada(encontrada);
      setNomeEdicao(encontrada.nome);
      setEmailEdicao(encontrada.email);
      setModalEdicaoVisible(true);
    }
  }

  function salvarEdicao(e) {
    e.preventDefault();
    const dados = JSON.parse(localStorage.getItem("inscricoes")) || [];
    const index = dados.findIndex(i => i.id === inscricaoSelecionada.id);
    if (index !== -1) {
      dados[index].nome = nomeEdicao;
      dados[index].email = emailEdicao;
      localStorage.setItem("inscricoes", JSON.stringify(dados));
      setFeedback("Inscrição atualizada com sucesso!");
    }
    setModalEdicaoVisible(false);
    carregarInscricoes();
  }

  function abrirCancelamento(id) {
    setInscricaoSelecionada(id);
    setModalCancelamentoVisible(true);
  }

  function confirmarCancelamento() {
    let dados = JSON.parse(localStorage.getItem("inscricoes")) || [];
    dados = dados.filter(i => i.id !== inscricaoSelecionada);
    localStorage.setItem("inscricoes", JSON.stringify(dados));
    setFeedback("Inscrição cancelada com sucesso!");
    setModalCancelamentoVisible(false);
    carregarInscricoes();
  }

  function fecharModal() {
    setModalEdicaoVisible(false);
    setModalCancelamentoVisible(false);
  }

  function handleOverlayEdicao(e) {
    if (e.target === e.currentTarget) setModalEdicaoVisible(false);
  }

  function handleOverlayCancelamento(e) {
    if (e.target === e.currentTarget) setModalCancelamentoVisible(false);
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
          <li className="active">Minhas Inscrições</li>
          <li>Sair</li>
        </ul>
      </div>

      <div className="main">
        <h1>Minhas Inscrições</h1>
        <table className="inscricoes">
          <thead>
            <tr>
              <th>Ação</th>
              <th>Data</th>
              <th>Local</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody id="listaInscricoes">
            {inscricoes.map(inscricao => (
              <tr key={inscricao.id}>
                <td>{inscricao.acao}</td>
                <td>{inscricao.data}</td>
                <td>{inscricao.local}</td>
                <td>
                  <button onClick={() => abrirEdicao(inscricao.id)}>Editar</button>
                  <button onClick={() => abrirCancelamento(inscricao.id)}>Cancelar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div id="feedback">{feedback}</div>
      </div>

      <div
        className="modal"
        id="modalEdicao"
        style={{ display: modalEdicaoVisible ? 'flex' : 'none' }}
        onClick={handleOverlayEdicao}
      >
        <div className="modal-content">
          <h2>Editar Inscrição</h2>
          <form id="formEdicao" onSubmit={salvarEdicao}>
            <label htmlFor="nomeEdicao">Nome</label>
            <input
              type="text"
              id="nomeEdicao"
              required
              value={nomeEdicao}
              onChange={e => setNomeEdicao(e.target.value)}
            />

            <label htmlFor="emailEdicao">E-mail</label>
            <input
              type="email"
              id="emailEdicao"
              required
              value={emailEdicao}
              onChange={e => setEmailEdicao(e.target.value)}
            />

            <button type="submit" className="confirmar">Salvar</button>
            <button type="button" className="cancelar" onClick={fecharModal}>Cancelar</button>
          </form>
        </div>
      </div>

      <div
        className="modal"
        id="modalCancelamento"
        style={{ display: modalCancelamentoVisible ? 'flex' : 'none' }}
        onClick={handleOverlayCancelamento}
      >
        <div className="modal-content">
          <h2>Cancelar Inscrição</h2>
          <p>Tem certeza que deseja cancelar sua inscrição?</p>
          <button className="confirmar" onClick={confirmarCancelamento}>Sim</button>
          <button className="cancelar" onClick={fecharModal}>Não</button>
        </div>
      </div>
    </div>
  );
}
