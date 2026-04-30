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
  const emp = employees.find((e) => e.id === id);
  const activities = getActivities().filter((a) => a.message.includes(emp?.name || ""));

  if (!emp) return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64 flex items-center justify-center">
        <p className="text-slate-400">Employee not found.</p>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <Navbar title="Employee Profile" />
        <main className="flex-1 p-6 space-y-4">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-all">
            <MdArrowBack size={18} /> Back
          </button>

          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-700 font-bold text-xl flex items-center justify-center">
                  {emp.avatar}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">{emp.name}</h2>
                  <p className="text-slate-500 text-sm">{emp.role}</p>
                  <span className={`mt-1 inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${emp.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                    {emp.status}
                  </span>
                </div>
              </div>
              <button onClick={() => navigate(`/edit-employee/${emp.id}`)} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all">
                <MdEdit size={16} /> Edit
              </button>
            </div>

            {/* Personal Details */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Personal Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "Email", value: emp.email },
                  { label: "Phone", value: emp.phone },
                ].map((d) => (
                  <div key={d.label} className="bg-slate-50 rounded-xl p-4">
                    <p className="text-xs text-slate-400 mb-1">{d.label}</p>
                    <p className="text-sm font-medium text-slate-700">{d.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Work Details */}
            <div>
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Work Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

          {/* Activity History */}
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <h3 className="text-sm font-semibold text-slate-600 mb-4">Activity History</h3>
            {activities.length === 0 ? (
              <p className="text-sm text-slate-400">No activity recorded for this employee.</p>
            ) : (
              <ul className="space-y-2">
                {activities.map((a) => (
                  <li key={a.id} className="flex justify-between text-sm border-b border-slate-100 pb-2">
                    <span className="text-slate-700">{a.message}</span>
                    <span className="text-xs text-slate-400">{a.time}</span>
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