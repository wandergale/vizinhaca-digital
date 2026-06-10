// Cartão de uma notificação individual.
// Exibe título, mensagem, data e status; permite marcar como lida.
export default function NotificationCard({ notificacao, onMarcarLida }) {
  const { id, titulo, mensagem, data, lida } = notificacao;

  const dataFormatada = data
    ? new Date(data).toLocaleString('pt-BR', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
      })
    : '';

  return (
    <div className={`notification-card ${lida ? 'lida' : 'nao-lida'}`}>
      <div className="notification-card-header">
        <h3>{titulo}</h3>
        <span className={`notification-status ${lida ? 'lida' : 'nao-lida'}`}>
          {lida ? 'Lida' : 'Não lida'}
        </span>
      </div>

      <p className="notification-card-msg">{mensagem}</p>

      <div className="notification-card-footer">
        <span className="notification-card-date">{dataFormatada}</span>
        {!lida && (
          <button
            className="notification-card-btn"
            onClick={() => onMarcarLida(id)}
          >
            Marcar como lida
          </button>
        )}
      </div>
    </div>
  );
}
