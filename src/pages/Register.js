import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Register({ setUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', { name, email, password });
      setUser(res.data);
      navigate('/leads');
    } catch {
      alert('Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={submit}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" /><br />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" /><br />
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" /><br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
