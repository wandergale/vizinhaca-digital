import { useNavigate } from 'react-router-dom';

const itens = [
  { label: 'Início', path: '/' },
  { label: 'Ações', path: '/actions' },
  { label: 'Calendário', path: '/calendar' },
  { label: 'Minhas Inscrições', path: '/my-registrations' },
  { label: 'Sair', path: '/login' },
];

function Sidebar({ ativo }) {
  const navigate = useNavigate();

  const handleClick = (item) => {
    if (item.label === 'Sair') {
      localStorage.removeItem('usuarioLogado');
      localStorage.removeItem('token');
    }
    navigate(item.path);
  };

  return (
    <aside className="sidebar">
      <h2>Sistema de Cadastro e Agendamento de Ações Comunitárias</h2>
      <ul>
        {itens.map(item => (
          <li
            key={item.label}
            className={ativo === item.label ? 'active' : ''}
            onClick={() => handleClick(item)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
