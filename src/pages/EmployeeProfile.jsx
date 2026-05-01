import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useEmployees } from "../hooks/useEmployees";
import { getActivities } from "../utils/localStorage";
import { MdEdit, MdArrowBack } from "react-icons/md";

const EmployeeProfile = () => {
  const { id } = useParams();
  const { employees } = useEmployees();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const emp = employees.find((e) => e.id === id);
  const activities = getActivities().filter((a) => a.message.includes(emp?.name || ""));

  if (!emp) return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar isOpen={false} onClose={() => {}} />
      <div className="flex-1 lg:ml-64 flex items-center justify-center">
        <p className="text-slate-400">Employee not found.</p>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex-1 flex flex-col lg:ml-64">
        <Navbar title="Employee Profile" onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 md:p-6 space-y-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-all"
          >
            <MdArrowBack size={18} /> Back
          </button>

          <div className="bg-white rounded-2xl shadow-sm p-5 md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-indigo-100 text-indigo-700 font-bold text-lg md:text-xl flex items-center justify-center shrink-0">
                  {emp.avatar}
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-slate-800">{emp.name}</h2>
                  <p className="text-slate-500 text-sm">{emp.role}</p>
                  <span className={`mt-1 inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    emp.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                  }`}>
                    {emp.status}
                  </span>
                </div>
              </div>
              <button
                onClick={() => navigate(`/edit-employee/${emp.id}`)}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all self-start sm:self-auto"
              >
                <MdEdit size={16} /> Edit
              </button>
            </div>

            <div className="mb-6">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Personal Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: "Email", value: emp.email },
                  { label: "Phone", value: emp.phone },
                ].map((d) => (
                  <div key={d.label} className="bg-slate-50 rounded-xl p-4">
                    <p className="text-xs text-slate-400 mb-1">{d.label}</p>
                    <p className="text-sm font-medium text-slate-700 break-all">{d.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Work Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: "Department", value: emp.department },
                  { label: "Role", value: emp.role },
                  { label: "Join Date", value: emp.joinDate },
                ].map((d) => (
                  <div key={d.label} className="bg-slate-50 rounded-xl p-4">
                    <p className="text-xs text-slate-400 mb-1">{d.label}</p>
                    <p className="text-sm font-medium text-slate-700">{d.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-5">
            <h3 className="text-sm font-semibold text-slate-600 mb-4">Activity History</h3>
            {activities.length === 0 ? (
              <p className="text-sm text-slate-400">No activity recorded for this employee.</p>
            ) : (
              <ul className="space-y-2">
                {activities.map((a) => (
                  <li key={a.id} className="flex flex-col sm:flex-row sm:justify-between text-sm border-b border-slate-100 pb-2 gap-1">
                    <span className="text-slate-700">{a.message}</span>
                    <span className="text-xs text-slate-400 shrink-0">{a.time}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployeeProfile;