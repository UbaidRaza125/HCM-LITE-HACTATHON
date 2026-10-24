'use client';

import { useState } from 'react';
import {
  Activity,
  ArrowUpRight,
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Clock3,
  Command,
  LayoutDashboard,
  Menu,
  MessageSquareText,
  MoreHorizontal,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Users,
  X
} from 'lucide-react';
import EmployeeDirectory from '@/components/EmployeeDirectory';
import AuthGate from '@/components/AuthGate';

const roles = {
  Admin: { initials: 'AS', name: 'Admin setup', label: 'Administrator', color: 'navy' },
  HR: { initials: 'HR', name: 'People ops', label: 'Human resources', color: 'teal' },
  Employee: { initials: 'MK', name: 'My workspace', label: 'Employee', color: 'amber' }
};

const navGroups = [
  { label: 'Workspace', items: [{ label: 'Overview', icon: LayoutDashboard }, { label: 'Employees', icon: Users }, { label: 'Attendance', icon: Clock3 }, { label: 'Leave', icon: CalendarDays }] },
  { label: 'Operations', items: [{ label: 'Payroll', icon: BriefcaseBusiness }, { label: 'Announcements', icon: MessageSquareText }, { label: 'Analytics', icon: Activity }] },
  { label: 'Control', items: [{ label: 'AI assistant', icon: Sparkles }, { label: 'Settings', icon: Settings2 }] }
];

function MetricCard({ label, value, description, icon: Icon, tone = 'teal' }) {
  return <article className="metric-card"><div className={`metric-icon ${tone}`}><Icon size={18} strokeWidth={2.2} /></div><div className="metric-label">{label}</div><div className="metric-value">{value}</div><div className="metric-description">{description}</div></article>;
}

function EmptyPanel({ icon: Icon, title, description, action, onAction }) {
  return <div className="empty-panel"><div className="empty-icon"><Icon size={20} /></div><div><h3>{title}</h3><p>{description}</p>{action && <button className="text-button" onClick={onAction}>{action}<ArrowUpRight size={14} /></button>}</div></div>;
}

function Sidebar({ role, active, setActive, open, setOpen }) {
  return <aside className={`sidebar ${open ? 'open' : ''}`}><div className="brand-row"><div className="brand-mark"><span></span><span></span><span></span><span></span></div><span className="brand-name">HCM<span>lite</span></span><button className="mobile-close" onClick={() => setOpen(false)} aria-label="Close menu"><X size={18} /></button></div><div className="workspace-switcher"><div className="company-avatar">N</div><div className="workspace-copy"><strong>Northstar Labs</strong><span>{roles[role].label}</span></div><ChevronDown size={15} /></div><nav className="nav-groups">{navGroups.map((group) => <div className="nav-group" key={group.label}><div className="nav-label">{group.label}</div>{group.items.map((item) => { const Icon = item.icon; return <button className={`nav-item ${active === item.label ? 'active' : ''}`} key={item.label} onClick={() => { setActive(item.label); setOpen(false); }}><Icon size={17} /><span>{item.label}</span>{item.label === 'AI assistant' && <span className="new-pill">NEW</span>}</button>; })}</div>)}</nav><div className="sidebar-bottom"><div className="help-card"><div className="help-icon"><CircleHelp size={16} /></div><div><strong>Need a hand?</strong><span>Explore the guide</span></div><ArrowUpRight size={14} /></div><button className="profile-button"><div className={`avatar ${roles[role].color}`}>{roles[role].initials}</div><div className="profile-copy"><strong>{roles[role].name}</strong><span>{roles[role].label}</span></div><MoreHorizontal size={17} /></button></div></aside>;
}

function Header({ active, role, setOpen }) {
  return <header className="topbar"><div className="title-wrap"><button className="menu-button" onClick={() => setOpen(true)} aria-label="Open menu"><Menu size={21} /></button><div className="breadcrumbs"><span>Workspace</span><ChevronRight size={14} /><strong>{active}</strong></div></div><div className="header-actions"><button className="search-button"><Search size={17} /><span>Search</span><kbd><Command size={11} /> K</kbd></button><button className="icon-button" aria-label="Notifications"><Bell size={18} /><i></i></button><div className="role-switcher"><span className="switcher-label">Signed in as</span><strong className="role-name">{roles[role].label}</strong><ChevronDown size={14} /></div></div></header>;
}

function Overview({ role, setActive }) {
  const isEmployee = role === 'Employee';
  return <div className="page-content"><section className="hero-row"><div><div className="eyebrow"><span className="eyebrow-dot"></span>{isEmployee ? 'Monday, 24 October 2026' : 'Monday, 24 October 2026 · Week 43'}</div><h1>{isEmployee ? 'Your workday, at a glance.' : `Good morning, ${roles[role].name}.`}</h1><p className="page-subtitle">{isEmployee ? 'Keep your essentials close and stay in sync with your team.' : 'A clear view of your people, priorities, and the day ahead.'}</p></div><button className="primary-button" onClick={() => setActive(isEmployee ? 'Leave' : 'Employees')}><Plus size={17} />{isEmployee ? 'Request leave' : 'Add employee'}</button></section><section className="metrics-grid"><MetricCard label={isEmployee ? 'Hours this week' : 'Active employees'} value="0" description={isEmployee ? 'Your tracked time' : 'Set up your team to begin'} icon={Users} /><MetricCard label={isEmployee ? 'Leave balance' : 'Present today'} value="—" description={isEmployee ? 'Configure leave types first' : 'No attendance records yet'} icon={CalendarDays} tone="blue" /><MetricCard label={isEmployee ? 'Next payday' : 'On leave today'} value="—" description="Nothing scheduled yet" icon={Clock3} tone="amber" /><MetricCard label="Needs attention" value="0" description="You are all caught up" icon={ShieldCheck} tone="green" /></section><section className="content-grid"><div className="panel setup-panel"><div className="panel-heading"><div><span className="section-kicker">Getting started</span><h2>Build your people workspace</h2></div><span className="progress-label">0 of 4</span></div><div className="progress-track"><span></span></div><p className="panel-intro">Start with the essentials. Your workspace stays private until you add your first team member.</p><div className="setup-list"><button onClick={() => setActive('Settings')}><span className="step-number">1</span><span className="setup-copy"><strong>Configure your company</strong><small>Office hours, location, and working days</small></span><ArrowUpRight size={16} /></button><button onClick={() => setActive('Employees')}><span className="step-number">2</span><span className="setup-copy"><strong>Add your first employee</strong><small>Build a directory your team can trust</small></span><ArrowUpRight size={16} /></button><button onClick={() => setActive('Leave')}><span className="step-number">3</span><span className="setup-copy"><strong>Set up leave policies</strong><small>Make time off simple and transparent</small></span><ArrowUpRight size={16} /></button><button onClick={() => setActive('AI assistant')}><span className="step-number">4</span><span className="setup-copy"><strong>Meet your AI assistant</strong><small>Get answers from your own HR data</small></span><ArrowUpRight size={16} /></button></div></div><div className="panel assistant-panel"><div className="assistant-orb"><Sparkles size={22} /></div><span className="section-kicker purple">HCM intelligence</span><h2>Ask your workspace.</h2><p>Get quick answers about policies, people, leave, and payroll. Your assistant only sees what you can see.</p><button className="secondary-button" onClick={() => setActive('AI assistant')}>Open assistant <ArrowUpRight size={15} /></button><div className="suggestion">“Who is on leave today?”</div></div></section><section className="content-grid lower-grid"><div className="panel"><div className="panel-heading"><div><span className="section-kicker">Today</span><h2>Attendance pulse</h2></div><button className="more-button"><MoreHorizontal size={18} /></button></div><EmptyPanel icon={Clock3} title="No attendance yet" description="Check-ins will appear here once your team starts their day." action="View attendance" onAction={() => setActive('Attendance')} /></div><div className="panel"><div className="panel-heading"><div><span className="section-kicker">Latest</span><h2>Team activity</h2></div><button className="more-button"><MoreHorizontal size={18} /></button></div><EmptyPanel icon={Activity} title="Your feed is clear" description="Important updates and approvals will show up here." action="View announcements" onAction={() => setActive('Announcements')} /></div></section></div>;
}

function PlaceholderPage({ active, setActive }) {
  const data = { Attendance: ['Attendance, without the busywork', 'Track check-ins, corrections, and working-day patterns in one calm view.', Clock3, 'Configure office hours'], Leave: ['Time off that works for everyone', 'Review requests, balances, holidays, and approval history.', CalendarDays, 'Set up leave policies'], Payroll: ['Payroll, prepared with confidence', 'Build accurate runs from approved attendance and leave records.', BriefcaseBusiness, 'Configure payroll'], Announcements: ['Keep everyone in the loop', 'Share clear, timely updates with your whole organization.', MessageSquareText, 'Create announcement'], Analytics: ['Insights that stay grounded', 'Your dashboards will come alive as real team data is added.', Activity, 'Explore setup'], Settings: ['Shape your workspace', 'Manage company details, policies, and the rules your team relies on.', Settings2, 'Configure company'] };
  const [title, description, Icon, action] = data[active] || data.Settings;
  return <div className="page-content centered-page"><div className="large-empty-icon"><Icon size={28} /></div><span className="section-kicker">{active}</span><h1>{title}</h1><p className="page-subtitle">{description}</p><button className="primary-button" onClick={() => setActive('Overview')}><Plus size={17} />{action}</button><div className="empty-note"><ShieldCheck size={15} />Fresh workspaces start empty by design.</div></div>;
}

function Assistant({ setActive }) {
  const [message, setMessage] = useState('');
  return <div className="page-content assistant-page"><section className="assistant-header"><div><div className="eyebrow"><span className="eyebrow-dot purple-dot"></span>HCM intelligence</div><h1>Your people, in plain English.</h1><p className="page-subtitle">Ask questions about your workspace. Answers will always respect your role and permissions.</p></div><div className="assistant-orb large"><Sparkles size={29} /></div></section><div className="chat-card"><div className="chat-intro"><div className="assistant-orb"><Sparkles size={20} /></div><div><strong>Hi, I’m your HCM assistant.</strong><p>Once your workspace has data, I can summarize dashboards, answer policy questions, and help prepare leave requests.</p></div></div><div className="suggestions"><button onClick={() => setMessage('Who is on leave today?')}>Who is on leave today?</button><button onClick={() => setMessage('What is our leave policy?')}>What is our leave policy?</button><button onClick={() => setMessage('Summarize this month')}>Summarize this month</button></div><div className="chat-input"><input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Ask anything about your workspace..."/><button aria-label="Send question" onClick={() => setMessage('')}><ArrowUpRight size={18} /></button></div><div className="chat-disclaimer"><ShieldCheck size={14} />The assistant uses authorized workspace data only.</div></div><button className="text-button back-button" onClick={() => setActive('Overview')}><ChevronLeft size={15} />Back to overview</button></div>;
}

function Home({ company }) {
  const [active, setActive] = useState('Overview');
  const [open, setOpen] = useState(false);
  const role = company?.role || 'Admin';
  return <div className="app-shell"><Sidebar role={role} active={active} setActive={setActive} open={open} setOpen={setOpen} /><main className="main-area"><Header active={active} role={role} setOpen={setOpen} />{active === 'Overview' ? <Overview role={role} setActive={setActive} /> : active === 'Employees' ? <EmployeeDirectory company={company} role={role} /> : active === 'AI assistant' ? <Assistant setActive={setActive} /> : <PlaceholderPage active={active} setActive={setActive} />}</main>{open && <button className="mobile-overlay" onClick={() => setOpen(false)} aria-label="Close navigation" />}</div>;
}

export default function App() {
  return <AuthGate><Home /></AuthGate>;
}
