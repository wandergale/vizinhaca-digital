import { useState } from 'react';

// Formulário de envio de mensagem em lote.
// Campos: ação, assunto, mensagem, anexo e link útil.
export default function MessageForm({ acoes = [], enviando, onEnviar }) {
  const [acaoId, setAcaoId] = useState('');
  const [assunto, setAssunto] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [anexo, setAnexo] = useState(null);
  const [link, setLink] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!acaoId || !assunto.trim() || !mensagem.trim()) return;

    onEnviar({ acaoId, assunto, mensagem, anexo, link });

    // Limpa o formulário após disparar o envio
    setAcaoId('');
    setAssunto('');
    setMensagem('');
    setAnexo(null);
    setLink('');
    e.target.reset();
  }

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <label htmlFor="acao">Selecionar ação</label>
      <select
        id="acao"
        value={acaoId}
        onChange={(e) => setAcaoId(e.target.value)}
        required
      >
        <option value="">Selecione uma ação</option>
        {acoes.map((a) => (
          <option key={a.id} value={a.id}>{a.title}</option>
        ))}
      </select>

      <label htmlFor="assunto">Assunto</label>
      <input
        id="assunto"
        type="text"
        value={assunto}
        onChange={(e) => setAssunto(e.target.value)}
        placeholder="Assunto da mensagem"
        required
      />

      <label htmlFor="mensagem">Mensagem</label>
      <textarea
        id="mensagem"
        rows={5}
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
        placeholder="Escreva a mensagem para os voluntários"
        required
      />

      <label htmlFor="anexo">Anexo</label>
      <input
        id="anexo"
        type="file"
        onChange={(e) => setAnexo(e.target.files?.[0] ?? null)}
      />

      <label htmlFor="link">Link útil</label>
      <input
        id="link"
        type="url"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="https://"
      />

      <button type="submit" className="message-form-btn" disabled={enviando}>
        {enviando ? 'Enviando…' : 'Enviar'}
      </button>
    </form>
  );
}
