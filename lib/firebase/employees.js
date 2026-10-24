import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore';
import { db } from './client';

export async function listEmployees(companyId) {
  const snapshot = await getDocs(query(collection(db, 'employees'), where('companyId', '==', companyId)));
  return snapshot.docs.map((employee) => ({ id: employee.id, ...employee.data() }));
}

export async function createEmployee({ companyId, createdBy, employee }) {
  const reference = await addDoc(collection(db, 'employees'), {
    companyId,
    createdBy,
    fullName: employee.fullName.trim(),
    email: employee.email.trim().toLowerCase(),
    employeeId: employee.employeeId.trim().toUpperCase(),
    department: employee.department.trim(),
    designation: employee.designation.trim(),
    joiningDate: employee.joiningDate,
    basicSalary: Number(employee.basicSalary),
    employmentStatus: 'Active',
    createdAt: serverTimestamp()
  });
  return { id: reference.id, ...employee, companyId, employmentStatus: 'Active' };
}
