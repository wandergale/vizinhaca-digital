import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import '../styles/navbar.css';

export default function Layout() {
  return (
    <div className="app-layout">
      <Navbar />
      <div className="app-layout-body">
        <Outlet />
      </div>
    </div>
  );
}
