import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import '../styles/sidebar.css';

export default function Layout() {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}
