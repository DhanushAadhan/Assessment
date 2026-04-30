import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useEmployees } from "../hooks/useEmployees";
import { MdEdit, MdDelete, MdVisibility, MdSearch } from "react-icons/md";

const Employees = () => {
  const { employees, deleteEmployee } = useEmployees();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const departments = ["All", ...new Set(employees.map((e) => e.department))];

  const filtered = employees.filter((e) => {
    const matchSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase());
    const matchDept = filterDept === "All" || e.department === filterDept;
    const matchStatus = filterStatus === "All" || e.status === filterStatus;
    return matchSearch && matchDept && matchStatus;
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      deleteEmployee(id);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <Navbar title="Employees" />
        <main className="flex-1 p-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-5">
            <div className="flex items-center bg-white border border-slate-200 rounded-lg px-3 py-2 gap-2 flex-1 min-w-[200px]">
              <MdSearch className="text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="text-sm outline-none w-full"
              />
            </div>
            <select
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
              className="border border-slate-200 bg-white rounded-lg px-3 py-2 text-sm outline-none"
            >
              {departments.map((d) => <option key={d}>{d}</option>)}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-slate-200 bg-white rounded-lg px-3 py-2 text-sm outline-none"
            >
              <option>All</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-5 py-3 font-semibold text-slate-600">Employee</th>
                    <th className="text-left px-5 py-3 font-semibold text-slate-600">Department</th>
                    <th className="text-left px-5 py-3 font-semibold text-slate-600">Role</th>
                    <th className="text-left px-5 py-3 font-semibold text-slate-600">Status</th>
                    <th className="text-left px-5 py-3 font-semibold text-slate-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-10 text-slate-400">No employees found.</td>
                    </tr>
                  ) : (
                    filtered.map((emp) => (
                      <tr key={emp.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
                              {emp.avatar}
                            </div>
                            <div>
                              <p className="font-medium text-slate-800">{emp.name}</p>
                              <p className="text-xs text-slate-400">{emp.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-slate-600">{emp.department}</td>
                        <td className="px-5 py-3 text-slate-600">{emp.role}</td>
                        <td className="px-5 py-3">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${emp.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                            {emp.status}
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <button onClick={() => navigate(`/employee/${emp.id}`)} className="p-1.5 rounded-lg hover:bg-indigo-50 text-indigo-500 transition-all">
                              <MdVisibility size={18} />
                            </button>
                            <button onClick={() => navigate(`/edit-employee/${emp.id}`)} className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-500 transition-all">
                              <MdEdit size={18} />
                            </button>
                            <button onClick={() => handleDelete(emp.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-all">
                              <MdDelete size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Employees;