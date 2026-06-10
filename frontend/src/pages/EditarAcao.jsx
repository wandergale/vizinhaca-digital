import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import acaoService from '../services/acaoService';
import '../styles/editar-acao.css';

// Converte uma data vinda do backend (ISO) para o formato do input datetime-local
function paraInputDateTime(valor) {
  if (!valor) return '';
  const d = new Date(valor);
  if (Number.isNaN(d.getTime())) return '';
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function EditarAcao() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    vagas: '',
  });
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [feedback, setFeedback] = useState({ texto: '', tipo: '' });

  // 1. Carrega os dados da ação ao abrir a tela
  useEffect(() => {
    let ativo = true;
    async function carregar() {
      try {
        const acao = await acaoService.buscarPorId(id);
        if (!ativo || !acao) return;
        setForm({
          title: acao.title ?? '',
          description: acao.description ?? '',
          date: paraInputDateTime(acao.date),
          location: acao.location ?? '',
          vagas: acao.vagas ?? acao.limiteVagas ?? '',
        });
      } catch (err) {
        if (ativo) {
          setFeedback({ texto: 'Não foi possível carregar a ação.', tipo: 'erro' });
        }
      } finally {
        if (ativo) setCarregando(false);
      }
    }
    carregar();
    return () => { ativo = false; };
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // 2. Salva as alterações — PUT /actions/:id
  async function handleSubmit(e) {
    e.preventDefault();
    setSalvando(true);
    setFeedback({ texto: '', tipo: '' });

    const payload = {
      title: form.title,
      description: form.description,
      date: form.date ? new Date(form.date).toISOString() : null,
      location: form.location,
      vagas: form.vagas === '' ? null : Number(form.vagas),
    };

    try {
      await acaoService.atualizar(id, payload);
      setFeedback({ texto: 'Ação atualizada com sucesso!', tipo: 'sucesso' });
      setTimeout(() => navigate('/cadastro-acoes'), 1200);
    } catch (err) {
      setFeedback({ texto: 'Erro ao salvar as alterações.', tipo: 'erro' });
    } finally {
      setSalvando(false);
    }
  }

  function handleCancelar() {
    navigate(-1);
  }

  return (
    <div className="editar-acao">
      <div className="editar-acao-card">
        <h1>Editar Ação</h1>

        {carregando ? (
          <p className="editar-acao-loading">Carregando dados da ação…</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Título</label>
            <input
              id="title"
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
              required
            />

            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={form.description}
              onChange={handleChange}
              required
            />

            <label htmlFor="date">Data</label>
            <input
              id="date"
              name="date"
              type="datetime-local"
              value={form.date}
              onChange={handleChange}
              required
            />

            <label htmlFor="location">Local</label>
            <input
              id="location"
              name="location"
              type="text"
              value={form.location}
              onChange={handleChange}
              required
            />

            <label htmlFor="vagas">Quantidade de vagas</label>
            <input
              id="vagas"
              name="vagas"
              type="number"
              min="1"
              value={form.vagas}
              onChange={handleChange}
            />

            <div className="editar-acao-buttons">
              <button type="submit" className="btn-salvar" disabled={salvando}>
                {salvando ? 'Salvando…' : 'Salvar'}
              </button>
              <button type="button" className="btn-cancelar" onClick={handleCancelar}>
                Cancelar
              </button>
            </div>
          </form>
        )}

        {feedback.texto && (
          <p className={`editar-acao-feedback ${feedback.tipo}`}>{feedback.texto}</p>
        )}
      </div>
    </div>
  );
}
