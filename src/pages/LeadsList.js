import { useEffect, useState } from 'react';
import api from '../api';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Link } from 'react-router-dom';

export default function LeadsList() {
  const [rowData, setRowData] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });

  const fetchLeads = async (page=1) => {
    const res = await api.get(`/leads?page=${page}&limit=10`);
    setRowData(res.data.data);
    setPagination({ page: res.data.page, totalPages: res.data.totalPages });
  };

  useEffect(() => { fetchLeads(); }, []);

  const deleteLead = async id => {
    await api.delete(`/leads/${id}`);
    fetchLeads(pagination.page);
  };

  const columns = [
    { field: 'first_name' },
    { field: 'last_name' },
    { field: 'email' },
    { field: 'company' },
    { field: 'status' },
    {
      headerName: 'Actions',
      cellRenderer: params => (
        <div>
          <Link to={`/leads/${params.data._id}`}>Edit</Link>
          <button onClick={() => deleteLead(params.data._id)}>Delete</button>
        </div>
      )
    }
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
      <AgGridReact rowData={rowData} columnDefs={columns} pagination={false} />
      <div>
        <button disabled={pagination.page===1} onClick={()=>fetchLeads(pagination.page-1)}>Prev</button>
        <span> Page {pagination.page} of {pagination.totalPages} </span>
        <button disabled={pagination.page===pagination.totalPages} onClick={()=>fetchLeads(pagination.page+1)}>Next</button>
      </div>
    </div>
  );
}
