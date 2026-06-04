import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/cadastro-acoes.css';

const acaoInicial = [
  {
    titulo: 'Ação 1',
    descricao: 'Reunião',
    data: '01/01/2026',
    local: 'Área Verde',
    prioridade: 'Média',
    categoria: 'Educação',
    limiteVagas: 25,
    inscritos: 10,
    status: 'Vagas disponíveis'
  }
];

export default function CadastroAcoes() {
  const navigate = useNavigate();
  const [acoes, setAcoes] = useState(acaoInicial);
  const [modalVisible, setModalVisible] = useState(false);

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');
  const [local, setLocal] = useState('');
  const [prioridade, setPrioridade] = useState('');
  const [categoria, setCategoria] = useState('');
  const [limiteVagas, setLimiteVagas] = useState(25);
  const [mensagem, setMensagem] = useState('');
  const [mensagemClasse, setMensagemClasse] = useState('mensagem');

  const inscritos = 0;

  useEffect(() => {
    if (!localStorage.getItem("usuarioLogado")) {
      alert("Você precisa estar logado para acessar o cadastro de ações.");
      navigate('/autenticacao');
    }
  }, [navigate]);

  function calcularStatus(inscritosCount, limite) {
    if (inscritosCount >= limite) return 'Vagas esgotadas';
    return 'Vagas disponíveis';
  }

  function calcularProgressoColor(inscritosCount, limite) {
    if (inscritosCount >= limite) return 'red';
    if (inscritosCount >= limite - 1) return 'orange';
    return '#28a745';
  }

  function calcularMensagemVagas(inscritosCount, limite) {
    if (inscritosCount >= limite) return { texto: 'Vagas esgotadas', classe: 'esgotado' };
    if (inscritosCount >= limite - 1) return { texto: 'Limite atingido', classe: 'limite' };
    return { texto: 'Vagas disponíveis', classe: 'disponivel' };
  }

  const porcentagem = Math.min((inscritos / limiteVagas) * 100, 100);
  const mensagemVagas = calcularMensagemVagas(inscritos, limiteVagas);

  function abrirModal() {
    setModalVisible(true);
    setTitulo('');
    setDescricao('');
    setData('');
    setLocal('');
    setPrioridade('');
    setCategoria('');
    setLimiteVagas(25);
    setMensagem('');
    setMensagemClasse('mensagem');
  }

  function fecharModal() {
    setModalVisible(false);
    setMensagem('');
    setMensagemClasse('mensagem');
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!titulo.trim()) {
      setMensagem('O título da ação é obrigatório');
      setMensagemClasse('mensagem erro');
      return;
    }
    if (!descricao.trim() || !data || !local.trim() || !prioridade || !categoria || !limiteVagas) {
      setMensagem('Todos os campos são obrigatórios');
      setMensagemClasse('mensagem erro');
      return;
    }

    const dataFormatada = new Date(data).toLocaleString("pt-BR");
    const novaAcao = {
      titulo,
      descricao,
      data: dataFormatada,
      local,
      prioridade,
      categoria,
      limiteVagas,
      inscritos,
      status: calcularStatus(inscritos, limiteVagas)
    };

    setAcoes(prev => [...prev, novaAcao]);
    setMensagem('Ação cadastrada com sucesso!');
    setMensagemClasse('mensagem sucesso');

    setTimeout(() => {
      setModalVisible(false);
      setMensagem('');
      setMensagemClasse('mensagem');
    }, 1000);
  }

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      fecharModal();
    }
  }

  return (
    <div className="container">
      <aside className="sidebar">
        <h2>Sistema de Cadastro e Agendamento de Ações Comunitárias</h2>
        <ul>
          <li>Início</li>
          <li>Administração</li>
          <li>Períodos</li>
          <li>Agendamentos</li>
          <li>Ações</li>
          <li>Sair</li>
        </ul>
      </aside>

      <main className="content">
        <h2>Cadastro de Ações</h2>
        <div className="acoes-header">
          <button className="btn-nova" onClick={abrirModal}>+ Nova Ação</button>
          <button className="btn-filtros">Filtros</button>
        </div>

        <table className="tabela-acoes">
          <thead>
            <tr>
              <th>Título</th>
              <th>Descrição</th>
              <th>Data</th>
              <th>Local</th>
              <th>Prioridade</th>
              <th>Categoria</th>
              <th>Limite de Vagas</th>
              <th>Inscritos</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody id="listaAcoes">
            {acoes.map((acao, i) => (
              <tr key={i}>
                <td>{acao.titulo}</td>
                <td>{acao.descricao}</td>
                <td>{acao.data}</td>
                <td>{acao.local}</td>
                <td>{acao.prioridade}</td>
                <td>{acao.categoria}</td>
                <td>{acao.limiteVagas}</td>
                <td>{acao.inscritos}</td>
                <td>{acao.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      <div
        id="modalNovaAcao"
        className="modal"
        style={{ display: modalVisible ? 'flex' : 'none' }}
        onClick={handleOverlayClick}
      >
        <div className="modal-content">
          <h3>Cadastrar Nova Ação</h3>
          <form id="formNovaAcao" onSubmit={handleSubmit}>
            <label>Título da ação*</label>
            <input
              type="text"
              id="titulo"
              placeholder="Digite o nome da ação"
              value={titulo}
              onChange={e => setTitulo(e.target.value)}
            />

            <label>Descrição*</label>
            <textarea
              id="descricao"
              placeholder="Detalhe a ação"
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
            />

            <label>Data*</label>
            <input
              type="datetime-local"
              id="data"
              value={data}
              onChange={e => setData(e.target.value)}
            />

            <label>Local*</label>
            <input
              type="text"
              id="local"
              placeholder="Digite o endereço ou ponto de encontro"
              value={local}
              onChange={e => setLocal(e.target.value)}
            />

            <label>Prioridade*</label>
            <select id="prioridade" value={prioridade} onChange={e => setPrioridade(e.target.value)}>
              <option value="">Selecione</option>
              <option value="Alta">Alta</option>
              <option value="Média">Média</option>
              <option value="Baixa">Baixa</option>
            </select>

            <label>Categoria*</label>
            <select id="categoria" value={categoria} onChange={e => setCategoria(e.target.value)}>
              <option value="">Selecione</option>
              <option value="Educação">Educação</option>
              <option value="Saúde">Saúde</option>
              <option value="Meio Ambiente">Meio Ambiente</option>
              <option value="Cultura">Cultura</option>
              <option value="Esporte">Esporte</option>
            </select>

            <label>Limite de Vagas*</label>
            <input
              type="number"
              id="limiteVagas"
              min="1"
              value={limiteVagas}
              onChange={e => setLimiteVagas(parseInt(e.target.value))}
            />

            <div className="vagas-info">
              <span id="contadorVagas">{inscritos} / {limiteVagas} inscritos</span>
              <div className="barra-progresso">
                <div
                  id="progressoVagas"
                  style={{
                    width: porcentagem + '%',
                    backgroundColor: calcularProgressoColor(inscritos, limiteVagas)
                  }}
                />
              </div>
              <p
                id="mensagemVagas"
                className={mensagemVagas.classe}
              >
                {mensagemVagas.texto}
              </p>
            </div>

            <div className="form-buttons">
              <button type="submit" className="btn-salvar">Salvar ação</button>
              <button type="button" className="btn-cancelar" onClick={fecharModal}>Cancelar</button>
            </div>
            <p id="mensagem" className={mensagemClasse}>{mensagem}</p>
          </form>
        </div>
      </div>
    </div>
  );
}
