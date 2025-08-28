import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';

export default function LeadForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    company: '',
    status: 'new'
  });
  const [loading, setLoading] = useState(false);

  // Fetch lead data if editing
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    api.get(`/leads/${id}`)
      .then(res => setForm(res.data))
      .catch(err => {
        console.error("Failed to fetch lead:", err.response?.data || err.message);
        alert("Failed to load lead data.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  // Handle form submission
  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (id) await api.put(`/leads/${id}`, form);
      else await api.post('/leads', form);
      navigate('/leads');
    } catch (err) {
      console.error("API error:", err.response?.data || err.message);
      alert("Failed to save lead. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit Lead' : 'New Lead'}</h2>
      {loading && <p>Loading...</p>}
      <form onSubmit={submit}>
        <input
          value={form.first_name}
          onChange={e => setForm({ ...form, first_name: e.target.value })}
          placeholder="First Name"
          required
        /><br/>
        <input
          value={form.last_name}
          onChange={e => setForm({ ...form, last_name: e.target.value })}
          placeholder="Last Name"
          required
        /><br/>
        <input
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          type="email"
          required
        /><br/>
        <input
          value={form.company}
          onChange={e => setForm({ ...form, company: e.target.value })}
          placeholder="Company"
        /><br/>
        <select
          value={form.status}
          onChange={e => setForm({ ...form, status: e.target.value })}
        >
          <option value="new">new</option>
          <option value="contacted">contacted</option>
          <option value="qualified">qualified</option>
          <option value="lost">lost</option>
          <option value="won">won</option>
        </select><br/>
        <button type="submit">{id ? 'Update' : 'Save'}</button>
      </form>
    </div>
  );
}
