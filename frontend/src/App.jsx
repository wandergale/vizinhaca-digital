import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Actions from './pages/Actions';
import ActionDetail from './pages/ActionDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/actions" element={<Actions />} />
      <Route path="/actions/:id" element={<ActionDetail />} />
    </Routes>
  );
}

export default App;
