import { useState, useEffect } from 'react';
import MessageForm from '../components/MessageForm';
import MessageHistory from '../components/MessageHistory';
import mensagemService from '../services/mensagemService';
import acaoService from '../services/acaoService';
import '../styles/mensagens.css';

export default function Mensagens() {
  const [acoes, setAcoes] = useState([]);
  const [historico, setHistorico] = useState([]);
  const [enviando, setEnviando] = useState(false);
  const [feedback, setFeedback] = useState({ texto: '', tipo: '' });

  useEffect(() => {
    carregarAcoes();
    carregarHistorico();
  }, []);

  async function carregarAcoes() {
    try {
      const dados = await acaoService.listar();
      setAcoes(Array.isArray(dados) ? dados : []);
    } catch (err) {
      setAcoes([]);
    }
  }

  async function carregarHistorico() {
    try {
      const dados = await mensagemService.historico();
      setHistorico(Array.isArray(dados) ? dados : []);
    } catch (err) {
      setHistorico([]);
    }
  }

  // POST /mensagens
  async function handleEnviar({ acaoId, assunto, mensagem, anexo, link }) {
    setEnviando(true);
    setFeedback({ texto: '', tipo: '' });

    // Usa FormData quando há anexo; senão envia JSON simples
    let payload;
    if (anexo) {
      payload = new FormData();
      payload.append('acaoId', acaoId);
      payload.append('assunto', assunto);
      payload.append('mensagem', mensagem);
      payload.append('link', link);
      payload.append('anexo', anexo);
    } else {
      payload = { acaoId, assunto, mensagem, link };
    }

    const acaoTitulo = acoes.find((a) => a.id === acaoId)?.title;

    try {
      const criada = await mensagemService.enviar(payload);
      setFeedback({ texto: 'Mensagem enviada com sucesso!', tipo: 'sucesso' });
      // Atualiza o histórico com a mensagem recém-criada
      const nova = criada && criada.id
        ? { ...criada, acaoTitulo }
        : { id: `local-${historico.length + 1}`, assunto, mensagem, link, acaoTitulo, data: new Date().toISOString() };
      setHistorico((prev) => [nova, ...prev]);
    } catch (err) {
      setFeedback({ texto: 'Erro ao enviar a mensagem.', tipo: 'erro' });
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="mensagens">
      <h1>Envio de Mensagens em Lote</h1>

      <div className="mensagens-grid">
        <section className="mensagens-form-box">
          <h2>Nova mensagem</h2>
          <MessageForm acoes={acoes} enviando={enviando} onEnviar={handleEnviar} />
          {feedback.texto && (
            <p className={`mensagens-feedback ${feedback.tipo}`}>{feedback.texto}</p>
          )}
        </section>

        <section className="mensagens-historico-box">
          <h2>Histórico</h2>
          <MessageHistory mensagens={historico} />
        </section>
      </div>
    </div>
  );
}
