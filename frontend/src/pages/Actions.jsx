import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const acoesMock = [
  { id: 1, titulo: 'Ação 1', descricao: 'Reunião', data: '01/01/2026 00:00', local: 'Área Verde', prioridade: 'Média' },
];

function Actions() {
  const [acoes, setAcoes] = useState(acoesMock);
  const [modalAberto, setModalAberto] = useState(false);
  const [form, setForm] = useState({ titulo: '', descricao: '', data: '', local: '', prioridade: '' });
  const [mensagem, setMensagem] = useState({ texto: '', tipo: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('usuarioLogado')) {
      alert('Você precisa estar logado para acessar o cadastro de ações.');
      navigate('/login');
    }
  }, [navigate]);

  const abrirModal = () => {
    setForm({ titulo: '', descricao: '', data: '', local: '', prioridade: '' });
    setMensagem({ texto: '', tipo: '' });
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setMensagem({ texto: '', tipo: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.titulo) {
      setMensagem({ texto: 'O título da ação é obrigatório', tipo: 'erro' });
      return;
    }
    if (!form.descricao || !form.data || !form.local || !form.prioridade) {
      setMensagem({ texto: 'Todos os campos são obrigatórios', tipo: 'erro' });
      return;
    }
    const nova = {
      id: Date.now(),
      ...form,
      data: new Date(form.data).toLocaleString('pt-BR'),
    };
    setAcoes(prev => [...prev, nova]);
    setMensagem({ texto: 'Ação cadastrada com sucesso!', tipo: 'sucesso' });
    setTimeout(fecharModal, 1000);
  };

  const update = (campo, valor) => setForm(prev => ({ ...prev, [campo]: valor }));

  return (
    <div className="layout">
      <Sidebar ativo="Ações" />
      <main className="content">
        <h2>Cadastro de Ações</h2>
        <div className="acoes-header">
          <button className="btn-success" onClick={abrirModal}>+ Nova Ação</button>
          <button className="btn-secondary">Filtros</button>
        </div>

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
            {acoes.map(a => (
              <tr key={a.id} onClick={() => navigate(`/actions/${a.id}`)}>
                <td>{a.titulo}</td>
                <td>{a.descricao}</td>
                <td>{a.data}</td>
                <td>{a.local}</td>
                <td>{a.prioridade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      {modalAberto && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && fecharModal()}>
          <div className="modal-box">
            <h3>Cadastrar Nova Ação</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Título da ação*</label>
                <input type="text" placeholder="Digite o nome da ação" value={form.titulo} onChange={e => update('titulo', e.target.value)} />
                <label>Descrição*</label>
                <textarea placeholder="Detalhe a ação" value={form.descricao} onChange={e => update('descricao', e.target.value)} />
                <label>Data*</label>
                <input type="datetime-local" value={form.data} onChange={e => update('data', e.target.value)} />
                <label>Local*</label>
                <input type="text" placeholder="Digite o endereço ou ponto de encontro" value={form.local} onChange={e => update('local', e.target.value)} />
                <label>Prioridade*</label>
                <select value={form.prioridade} onChange={e => update('prioridade', e.target.value)}>
                  <option value="">Selecione</option>
                  <option value="Alta">Alta</option>
                  <option value="Média">Média</option>
                  <option value="Baixa">Baixa</option>
                </select>
              </div>
              <div className="form-buttons">
                <button type="submit" className="btn-success">Salvar ação</button>
                <button type="button" className="btn-danger" onClick={fecharModal}>Cancelar</button>
              </div>
              {mensagem.texto && <p className={`mensagem ${mensagem.tipo}`}>{mensagem.texto}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Actions;
