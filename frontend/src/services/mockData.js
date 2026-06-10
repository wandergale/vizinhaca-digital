// Dados de exemplo (mock) usados quando o backend ainda não está disponível.
// Centralizados aqui para que todos os services/páginas usem a mesma fonte.

export const acoesMock = [
  {
    id: '1',
    title: 'Revitalização da Praça Central',
    description: 'Mutirão para limpeza, plantio de mudas e pintura dos bancos da praça central do bairro.',
    date: '2026-05-11T08:00:00',
    location: 'Praça Central',
    priority: 'HIGH',
    limiteVagas: 30,
    inscritos: 12,
  },
  {
    id: '2',
    title: 'Pintura da Escola Norte',
    description: 'Renovação das salas de aula e do muro externo da Escola Municipal Norte.',
    date: '2026-05-18T09:00:00',
    location: 'Escola Municipal Norte',
    priority: 'MEDIUM',
    limiteVagas: 20,
    inscritos: 8,
  },
  {
    id: '3',
    title: 'Limpeza do Parque das Águas',
    description: 'Coleta de resíduos e recuperação das trilhas do Parque das Águas.',
    date: '2026-05-25T07:30:00',
    location: 'Parque das Águas',
    priority: 'LOW',
    limiteVagas: 40,
    inscritos: 25,
  },
];

// Traduz a prioridade do backend para um rótulo em português
export function rotuloPrioridade(priority) {
  const mapa = { HIGH: 'Alta', MEDIUM: 'Média', LOW: 'Baixa' };
  return mapa[priority] ?? priority ?? 'Média';
}
