// Histórico de mensagens enviadas em lote.
export default function MessageHistory({ mensagens = [] }) {
  if (mensagens.length === 0) {
    return <p className="message-history-vazio">Nenhuma mensagem enviada ainda.</p>;
  }

  return (
    <ul className="message-history">
      {mensagens.map((m) => {
        const dataFormatada = m.data
          ? new Date(m.data).toLocaleString('pt-BR', {
              day: '2-digit', month: '2-digit', year: 'numeric',
              hour: '2-digit', minute: '2-digit',
            })
          : '';
        return (
          <li key={m.id} className="message-history-item">
            <div className="message-history-top">
              <strong>{m.assunto}</strong>
              <span className="message-history-date">{dataFormatada}</span>
            </div>
            {m.acaoTitulo && (
              <span className="message-history-acao">Ação: {m.acaoTitulo}</span>
            )}
            <p className="message-history-msg">{m.mensagem}</p>
            {m.link && (
              <a href={m.link} target="_blank" rel="noreferrer" className="message-history-link">
                {m.link}
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
}
