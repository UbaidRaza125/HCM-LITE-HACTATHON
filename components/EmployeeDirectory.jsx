'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, Check, Mail, Plus, Search, Users, X } from 'lucide-react';
import { createEmployee, listEmployees } from '@/lib/firebase/employees';

const emptyEmployee = { fullName: '', email: '', employeeId: '', department: '', designation: '', joiningDate: '', basicSalary: '' };

export default function EmployeeDirectory({ company, role }) {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyEmployee);
  const [busy, setBusy] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const canManage = role === 'Admin' || role === 'HR';

  useEffect(() => {
    let active = true;
    async function loadEmployees() {
      try {
        const records = await listEmployees(company.id);
        if (active) setEmployees(records);
      } catch {
        if (active) setError('We could not load employees right now.');
      } finally {
        if (active) setBusy(false);
      }
    }
    loadEmployees();
    return () => { active = false; };
  }, [company.id]);

  const filteredEmployees = useMemo(() => employees.filter((employee) => [employee.fullName, employee.email, employee.employeeId, employee.department].some((value) => value?.toLowerCase().includes(search.toLowerCase()))), [employees, search]);

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (employees.some((employee) => employee.employeeId === form.employeeId.trim().toUpperCase())) throw new Error('duplicate');
      const created = await createEmployee({ companyId: company.id, createdBy: company.createdBy || company.id, employee: form });
      setEmployees((current) => [...current, created]);
      setForm(emptyEmployee);
      setShowForm(false);
    } catch (submitError) {
      setError(submitError.message === 'duplicate' ? 'That employee ID is already in use.' : 'We could not save this employee. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return <div className="page-content directory-page"><section className="hero-row"><div><div className="eyebrow"><span className="eyebrow-dot"></span>People directory</div><h1>Your people, in one place.</h1><p className="page-subtitle">Keep employee details organized and ready for the work that matters.</p></div>{canManage && <button className="primary-button" onClick={() => setShowForm(true)}><Plus size={17} />Add employee</button>}</section><section className="directory-toolbar"><div className="directory-count"><strong>{employees.length}</strong><span>{employees.length === 1 ? 'employee' : 'employees'} in your workspace</span></div><div className="directory-search"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by name, email, or ID" /></div></section>{error && <div className="auth-error directory-error">{error}</div>}{busy ? <div className="directory-empty"><div className="loading-mark"></div><p>Loading your directory…</p></div> : filteredEmployees.length === 0 ? <div className="directory-empty"><div className="large-empty-icon"><Users size={26} /></div><h2>{search ? 'No employees found' : 'Your directory is ready to grow'}</h2><p>{search ? 'Try a different name, email, department, or employee ID.' : 'Add your first employee to start building a reliable source of truth for your team.'}</p>{canManage && !search && <button className="secondary-button" onClick={() => setShowForm(true)}><Plus size={15} />Add your first employee</button>}</div> : <div className="employee-table-wrap"><table className="employee-table"><thead><tr><th>Employee</th><th>Employee ID</th><th>Department</th><th>Designation</th><th>Status</th><th></th></tr></thead><tbody>{filteredEmployees.map((employee) => <tr key={employee.id}><td><div className="employee-cell"><div className="employee-avatar">{employee.fullName.slice(0, 2).toUpperCase()}</div><div><strong>{employee.fullName}</strong><small>{employee.email}</small></div></div></td><td>{employee.employeeId}</td><td>{employee.department}</td><td>{employee.designation}</td><td><span className="status-badge">{employee.employmentStatus}</span></td><td><button className="table-action" aria-label={`Open ${employee.fullName}`}><ArrowUpRight size={15} /></button></td></tr>)}</tbody></table></div>}{showForm && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowForm(false); }}><div className="modal-card"><div className="modal-heading"><div><span className="section-kicker">New employee</span><h2>Add someone to your team</h2></div><button className="modal-close" onClick={() => setShowForm(false)} aria-label="Close"><X size={17} /></button></div><form className="employee-form" onSubmit={handleSubmit}><label>Full name<input value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} placeholder="Ayesha Khan" required /></label><label>Work email<input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="ayesha@company.com" required /></label><div className="form-row"><label>Employee ID<input value={form.employeeId} onChange={(event) => setForm({ ...form, employeeId: event.target.value })} placeholder="EMP-001" required /></label><label>Joining date<input type="date" value={form.joiningDate} onChange={(event) => setForm({ ...form, joiningDate: event.target.value })} required /></label></div><div className="form-row"><label>Department<input value={form.department} onChange={(event) => setForm({ ...form, department: event.target.value })} placeholder="Engineering" required /></label><label>Designation<input value={form.designation} onChange={(event) => setForm({ ...form, designation: event.target.value })} placeholder="Product Designer" required /></label></div><label>Basic salary<input type="number" min="0" step="1" value={form.basicSalary} onChange={(event) => setForm({ ...form, basicSalary: event.target.value })} placeholder="120000" required /></label>{error && <div className="auth-error">{error}</div>}<div className="modal-actions"><button type="button" className="secondary-button" onClick={() => setShowForm(false)}>Cancel</button><button className="primary-button" disabled={saving}>{saving ? 'Saving…' : 'Save employee'}<Check size={15} /></button></div></form></div></div>}</div>;
}
