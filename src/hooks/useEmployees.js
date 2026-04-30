import { useState, useEffect } from "react";
import { getEmployees, saveEmployees } from "../utils/localStorage";
import { mockEmployees } from "../data/mockEmployees";
import { logActivity } from "../utils/localStorage";
import { v4 as uuidv4 } from "uuid";

export const useEmployees = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const stored = getEmployees();
    if (stored.length === 0) {
      saveEmployees(mockEmployees);
      setEmployees(mockEmployees);
    } else {
      setEmployees(stored);
    }
  }, []);

  const addEmployee = (emp) => {
    const newEmp = { ...emp, id: uuidv4(), avatar: emp.name.slice(0, 2).toUpperCase() };
    const updated = [newEmp, ...employees];
    setEmployees(updated);
    saveEmployees(updated);
    logActivity(`New employee added: ${emp.name}`);
  };

  const updateEmployee = (id, data) => {
    const updated = employees.map((e) => (e.id === id ? { ...e, ...data } : e));
    setEmployees(updated);
    saveEmployees(updated);
    logActivity(`Employee updated: ${data.name}`);
  };

  const deleteEmployee = (id) => {
    const emp = employees.find((e) => e.id === id);
    const updated = employees.filter((e) => e.id !== id);
    setEmployees(updated);
    saveEmployees(updated);
    logActivity(`Employee deleted: ${emp?.name}`);
  };

  return { employees, addEmployee, updateEmployee, deleteEmployee };
};