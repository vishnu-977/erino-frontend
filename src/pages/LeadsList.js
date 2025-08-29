import { useEffect, useState } from 'react';
import api from '../api';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Link } from 'react-router-dom';

export default function LeadsList() {
  const [rowData, setRowData] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [loading, setLoading] = useState(false);

  // Fetch leads from backend
  const fetchLeads = async (page = 1) => {
    setLoading(true);
    try {
      const res = await api.get(`/leads?page=${page}&limit=10`);
      setRowData(res.data.data || []);
      setPagination({ page: res.data.page || 1, totalPages: res.data.totalPages || 1 });
    } catch (err) {
      console.error("Failed to fetch leads:", err.response?.data || err.message);
      alert("Failed to fetch leads. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Delete a lead
  const deleteLead = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;
    try {
      await api.delete(`/leads/${id}`);
      fetchLeads(pagination.page);
    } catch (err) {
      console.error("Failed to delete lead:", err.response?.data || err.message);
      alert("Failed to delete lead. Check console for details.");
    }
  };

  // AG Grid columns
  const columns = [
    { field: 'first_name', headerName: 'First Name' },
    { field: 'last_name', headerName: 'Last Name' },
    { field: 'email', headerName: 'Email' },
    { field: 'company', headerName: 'Company' },
    { field: 'status', headerName: 'Status' },
    {
      headerName: 'Actions',
      cellRenderer: (params) => (
        <div style={{ display: 'flex', gap: '5px' }}>
          <Link to={`/leads/${params.data._id}`}>Edit</Link>
          <button onClick={() => deleteLead(params.data._id)}>Delete</button>
        </div>
      )
    }
  ];

  return (
    <div>
      <h2>Leads List</h2>
      <Link to="/leads/new"><button>Add New Lead</button></Link>
      {loading && <p>Loading...</p>}
      <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columns}
          pagination={false} // using custom pagination
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <button
          disabled={pagination.page === 1}
          onClick={() => fetchLeads(pagination.page - 1)}
        >
          Prev
        </button>
        <span> Page {pagination.page} of {pagination.totalPages} </span>
        <button
          disabled={pagination.page === pagination.totalPages}
          onClick={() => fetchLeads(pagination.page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
