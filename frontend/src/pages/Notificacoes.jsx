import { useState, useEffect } from 'react';
import NotificationCard from '../components/NotificationCard';
import notificacaoService from '../services/notificacaoService';
import '../styles/notificacoes.css';

// Dados de exemplo usados quando o backend de notificações ainda não responde,
// para que a tela permaneça demonstrável.
const NOTIFICACOES_MOCK = [
  { id: '1', titulo: 'Inscrição aprovada', mensagem: 'Sua inscrição na ação "Revitalização da Praça" foi aprovada.', data: '2026-06-08T14:30:00', lida: false },
  { id: '2', titulo: 'Nova ação disponível', mensagem: 'A ação "Pintura da Escola Norte" está com vagas abertas.', data: '2026-06-07T09:15:00', lida: false },
  { id: '3', titulo: 'Lembrete de ação', mensagem: 'A ação "Limpeza do Parque das Águas" acontece amanhã às 8h.', data: '2026-06-05T18:00:00', lida: true },
];

const FILTROS = [
  { valor: 'todas', label: 'Todas' },
  { valor: 'lidas', label: 'Lidas' },
  { valor: 'nao-lidas', label: 'Não lidas' },
];

export default function Notificacoes() {
  const [notificacoes, setNotificacoes] = useState([]);
  const [filtro, setFiltro] = useState('todas');
  const [carregando, setCarregando] = useState(true);

  // Em uma app real o id viria do contexto de autenticação / token.
  const usuarioId = localStorage.getItem('usuarioId') || 'me';

  useEffect(() => {
    carregar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // GET /notificacoes/:usuarioId
  async function carregar() {
    setCarregando(true);
    try {
      const dados = await notificacaoService.listarPorUsuario(usuarioId);
      setNotificacoes(Array.isArray(dados) ? dados : NOTIFICACOES_MOCK);
    } catch (err) {
      // Backend ainda não disponível — usa dados de exemplo
      setNotificacoes(NOTIFICACOES_MOCK);
    } finally {
      setCarregando(false);
    }
  }

  // PATCH /notificacoes/:id/lida
  async function marcarComoLida(id) {
    // Atualiza a tela imediatamente (otimista)
    setNotificacoes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, lida: true } : n))
    );
    try {
      await notificacaoService.marcarComoLida(id);
    } catch (err) {
      // Mantém o estado local mesmo se a chamada falhar
    }
  }

  const filtradas = notificacoes.filter((n) => {
    if (filtro === 'lidas') return n.lida;
    if (filtro === 'nao-lidas') return !n.lida;
    return true;
  });

  const naoLidas = notificacoes.filter((n) => !n.lida).length;

  return (
    <div className="notificacoes">
      <div className="notificacoes-header">
        <h1>Notificações</h1>
        {naoLidas > 0 && <span className="notificacoes-badge">{naoLidas} não lidas</span>}
      </div>

      <div className="notificacoes-filtros">
        {FILTROS.map((f) => (
          <button
            key={f.valor}
            className={filtro === f.valor ? 'ativo' : ''}
            onClick={() => setFiltro(f.valor)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {carregando ? (
        <p className="notificacoes-vazio">Carregando…</p>
      ) : filtradas.length === 0 ? (
        <p className="notificacoes-vazio">Nenhuma notificação para exibir.</p>
      ) : (
        <div className="notificacoes-lista">
          {filtradas.map((n) => (
            <NotificationCard
              key={n.id}
              notificacao={n}
              onMarcarLida={marcarComoLida}
            />
          ))}
        </div>
      )}
    </div>
  );
}
