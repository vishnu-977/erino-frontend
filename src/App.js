import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import LeadsList from './pages/LeadsList';
import LeadForm from './pages/LeadForm';
import { useEffect, useState } from 'react';
import api from './api';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get('/auth/me').then(res => setUser(res.data)).catch(() => setUser(null));
  }, []);

  const logout = async () => {
    await api.post('/auth/logout');
    setUser(null);
  };

  return (
    <div style={{ padding: 20 }}>
      <nav style={{ marginBottom: 20 }}>
        {user ? (
          <>
            <span>Welcome {user.name} </span>
            <button onClick={logout}>Logout</button>
            <Link to="/leads" style={{ marginLeft: 10 }}>Leads</Link>
            <Link to="/leads/new" style={{ marginLeft: 10 }}>Add Lead</Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" style={{ marginLeft: 10 }}>Register</Link>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={user ? <Navigate to="/leads" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/leads" element={user ? <LeadsList /> : <Navigate to="/login" />} />
        <Route path="/leads/new" element={user ? <LeadForm /> : <Navigate to="/login" />} />
        <Route path="/leads/:id" element={user ? <LeadForm /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
