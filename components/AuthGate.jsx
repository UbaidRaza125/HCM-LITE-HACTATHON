'use client';

import { cloneElement, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { ArrowRight, Building2, Check, LockKeyhole, Mail, ShieldCheck } from 'lucide-react';
import { auth } from '@/lib/firebase/client';
import { createCompanyForUser, getCompanyForUser } from '@/lib/firebase/company';

function AuthForm({ mode, onModeChange, onSubmit, busy, error }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [officeLocation, setOfficeLocation] = useState('');

  return (
    <div className="auth-card">
      <div className="auth-brand"><div className="brand-mark"><span></span><span></span><span></span><span></span></div><span className="brand-name">HCM<span>lite</span></span></div>
      <div className="auth-heading"><span className="section-kicker">{mode === 'setup' ? 'First-run setup' : 'Welcome back'}</span><h1>{mode === 'setup' ? 'Create your people workspace.' : 'Make work feel clearer.'}</h1><p>{mode === 'setup' ? 'Set up your company and become its first administrator.' : 'Sign in to continue to your HCM workspace.'}</p></div>
      <form onSubmit={(event) => { event.preventDefault(); onSubmit({ email, password, name, companyName, officeLocation }); }}>
        {mode === 'setup' && <><label>Full name<input value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" required /></label><label>Company name<input value={companyName} onChange={(event) => setCompanyName(event.target.value)} placeholder="Northstar Labs" required /></label><label>Office location<input value={officeLocation} onChange={(event) => setOfficeLocation(event.target.value)} placeholder="Karachi, Pakistan" required /></label></>}
        <label>Email address<div className="input-with-icon"><Mail size={16} /><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@company.com" required /></div></label>
        <label>Password<div className="input-with-icon"><LockKeyhole size={16} /><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 6 characters" minLength="6" required /></div></label>
        {error && <div className="auth-error">{error}</div>}
        <button className="primary-button auth-submit" disabled={busy}>{busy ? 'Please wait…' : mode === 'setup' ? 'Create workspace' : 'Sign in'}<ArrowRight size={16} /></button>
      </form>
      <div className="auth-footer">{mode === 'setup' ? <>Already have an account? <button onClick={() => onModeChange('login')}>Sign in</button></> : <>New to HCM Lite? <button onClick={() => onModeChange('setup')}>Create a workspace</button></>}</div>
    </div>
  );
}

function SetupNotice() {
  return <div className="auth-side"><div className="auth-side-orb"><Building2 size={28} /></div><span className="section-kicker">A calmer way to work</span><h2>People operations, without the noise.</h2><p>HCM Lite brings attendance, leave, payroll, and employee context into one thoughtful workspace.</p><div className="auth-points"><div><Check size={14} />Role-aware access</div><div><Check size={14} />Honest, real-time data</div><div><Check size={14} />AI that respects your scope</div></div><div className="auth-side-footer"><ShieldCheck size={15} />Your workspace starts private.</div></div>;
}

export default function AuthGate({ children }) {
  const [user, setUser] = useState(null);
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState('login');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => onAuthStateChanged(auth, async (nextUser) => {
    setUser(nextUser);
    if (!nextUser) {
      setCompany(null);
      setLoading(false);
      return;
    }
    try {
      setCompany(await getCompanyForUser(nextUser.uid));
      setMode('login');
    } catch {
      setError('We could not load your workspace. Please try again.');
    } finally {
      setLoading(false);
    }
  }), []);

  async function handleSubmit(values) {
    setBusy(true);
    setError('');
    try {
      if (mode === 'setup') {
        const setupUser = user || (await createUserWithEmailAndPassword(auth, values.email, values.password)).user;
        if (!user) await updateProfile(setupUser, { displayName: values.name });
        setCompany(await createCompanyForUser({ user: setupUser, companyName: values.companyName, officeLocation: values.officeLocation }));
      } else {
        await signInWithEmailAndPassword(auth, values.email, values.password);
      }
    } catch (submitError) {
      const messages = {
        'auth/invalid-credential': 'That email or password is not correct.',
        'auth/email-already-in-use': 'An account already exists with this email. Sign in instead.',
        'auth/weak-password': 'Use a stronger password with at least 6 characters.',
        'auth/network-request-failed': 'Network connection failed. Please try again.',
        'auth/operation-not-allowed': 'Email and password sign-in is not enabled in Firebase yet.',
        'auth/invalid-api-key': 'The Firebase web configuration is invalid.',
        'permission-denied': 'Firebase blocked workspace setup. Check that Firestore is enabled and the latest security rules are published.',
        'failed-precondition': 'Firestore is not ready for this project yet. Create the Firestore database first.'
      };
      console.error('Authentication or workspace setup failed', submitError.code);
      setError(messages[submitError.code] || 'We could not complete that request. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  if (loading) return <div className="auth-loading"><div className="loading-mark"></div><span>Loading your workspace</span></div>;
  if (user && company) return cloneElement(children, { company });
  return <main className="auth-page"><SetupNotice /><AuthForm mode={user ? 'setup' : mode} onModeChange={setMode} onSubmit={handleSubmit} busy={busy} error={error} /><button className="auth-signout" onClick={() => signOut(auth)}>Use a different account</button></main>;
}
