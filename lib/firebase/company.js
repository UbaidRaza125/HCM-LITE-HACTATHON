import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from './client';

export async function getCompanyForUser(userId) {
  const snapshot = await getDoc(doc(db, 'users', userId));
  if (!snapshot.exists()) return null;
  const user = snapshot.data();
  if (!user.companyId) return null;
  const companySnapshot = await getDoc(doc(db, 'companies', user.companyId));
  if (!companySnapshot.exists()) return null;
  return { id: companySnapshot.id, ...companySnapshot.data(), role: user.role || 'Admin' };
}

export async function createCompanyForUser({ user, companyName, officeLocation }) {
  const companyId = user.uid;
  await setDoc(doc(db, 'companies', companyId), {
    name: companyName,
    officeLocation,
    officeStartTime: '09:00',
    graceMinutes: 15,
    workweek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    createdAt: serverTimestamp(),
    createdBy: user.uid
  });
  await setDoc(doc(db, 'users', user.uid), {
    email: user.email,
    companyId,
    role: 'Admin',
    displayName: user.displayName || user.email?.split('@')[0] || 'Admin',
    createdAt: serverTimestamp()
  });
  return { id: companyId, name: companyName, officeLocation, role: 'Admin', createdBy: user.uid };
}
