import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';

export default function LeadForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ first_name:'', last_name:'', email:'', company:'', status:'new' });

  useEffect(() => {
    if (id) {
      api.get(`/leads/${id}`).then(res => setForm(res.data));
    }
  }, [id]);

  const submit = async e => {
    e.preventDefault();
    if (id) await api.put(`/leads/${id}`, form);
    else await api.post('/leads', form);
    navigate('/leads');
  };

  return (
    <div>
      <h2>{id ? 'Edit Lead' : 'New Lead'}</h2>
      <form onSubmit={submit}>
        <input value={form.first_name} onChange={e=>setForm({...form, first_name:e.target.value})} placeholder="First Name" /><br/>
        <input value={form.last_name} onChange={e=>setForm({...form, last_name:e.target.value})} placeholder="Last Name" /><br/>
        <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="Email" /><br/>
        <input value={form.company} onChange={e=>setForm({...form, company:e.target.value})} placeholder="Company" /><br/>
        <select value={form.status} onChange={e=>setForm({...form, status:e.target.value})}>
          <option value="new">new</option>
          <option value="contacted">contacted</option>
          <option value="qualified">qualified</option>
          <option value="lost">lost</option>
          <option value="won">won</option>
        </select><br/>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
