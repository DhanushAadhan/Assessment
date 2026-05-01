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
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col lg:ml-64">
        <Navbar title="Employees" onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 md:p-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="flex items-center bg-white border border-slate-200 rounded-lg px-3 py-2 gap-2 flex-1">
              <MdSearch className="text-slate-400 shrink-0" size={18} />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="text-sm outline-none w-full"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterDept}
                onChange={(e) => setFilterDept(e.target.value)}
                className="border border-slate-200 bg-white rounded-lg px-3 py-2 text-sm outline-none flex-1 sm:flex-none"
              >
                {departments.map((d) => <option key={d}>{d}</option>)}
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-slate-200 bg-white rounded-lg px-3 py-2 text-sm outline-none flex-1 sm:flex-none"
              >
                <option>All</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[600px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-5 py-3 font-semibold text-slate-600">Employee</th>
                    <th className="text-left px-5 py-3 font-semibold text-slate-600 hidden md:table-cell">Department</th>
                    <th className="text-left px-5 py-3 font-semibold text-slate-600 hidden lg:table-cell">Role</th>
                    <th className="text-left px-5 py-3 font-semibold text-slate-600">Status</th>
                    <th className="text-left px-5 py-3 font-semibold text-slate-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-10 text-slate-400">
                        No employees found.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((emp) => (
                      <tr key={emp.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs shrink-0">
                              {emp.avatar}
                            </div>
                            <div className="overflow-hidden">
                              <p className="font-medium text-slate-800 truncate">{emp.name}</p>
                              <p className="text-xs text-slate-400 truncate">{emp.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-slate-600 hidden md:table-cell">{emp.department}</td>
                        <td className="px-5 py-3 text-slate-600 hidden lg:table-cell">{emp.role}</td>
                        <td className="px-5 py-3">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                            emp.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-600"
                          }`}>
                            {emp.status}
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => navigate(`/employee/${emp.id}`)}
                              className="p-1.5 rounded-lg hover:bg-indigo-50 text-indigo-500 transition-all"
                              title="View"
                            >
                              <MdVisibility size={18} />
                            </button>
                            <button
                              onClick={() => navigate(`/edit-employee/${emp.id}`)}
                              className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-500 transition-all"
                              title="Edit"
                            >
                              <MdEdit size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(emp.id)}
                              className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-all"
                              title="Delete"
                            >
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