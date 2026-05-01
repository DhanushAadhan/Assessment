import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DepartmentChart from "../components/charts/DepartmentChart";
import ActivityChart from "../components/charts/ActivityChart";
import { useEmployees } from "../hooks/useEmployees";
import { getActivities } from "../utils/localStorage";
import { MdPeople, MdCheckCircle, MdCancel, MdBusiness } from "react-icons/md";

const Dashboard = () => {
  const { employees } = useEmployees();
  const activities = getActivities();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const active = employees.filter((e) => e.status === "Active").length;
  const inactive = employees.filter((e) => e.status === "Inactive").length;
  const departments = [...new Set(employees.map((e) => e.department))].length;

  const stats = [
    { label: "Total Employees", value: employees.length, icon: <MdPeople />, color: "bg-indigo-500" },
    { label: "Active", value: active, icon: <MdCheckCircle />, color: "bg-green-500" },
    { label: "Inactive", value: inactive, icon: <MdCancel />, color: "bg-red-400" },
    { label: "Departments", value: departments, icon: <MdBusiness />, color: "bg-amber-500" },
  ];

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
        <Navbar title="Dashboard" onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 md:p-6 space-y-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-white rounded-2xl p-4 md:p-5 shadow-sm flex items-center gap-3 md:gap-4">
                <div className={`${s.color} text-white text-xl md:text-2xl p-2.5 md:p-3 rounded-xl shrink-0`}>
                  {s.icon}
                </div>
                <div>
                  <p className="text-xl md:text-2xl font-bold text-slate-800">{s.value}</p>
                  <p className="text-xs text-slate-500 leading-tight">{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <DepartmentChart employees={employees} />
            <ActivityChart employees={employees} />
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-600 mb-4">Recent Activities</h3>
            {activities.length === 0 ? (
              <p className="text-sm text-slate-400">No activities yet.</p>
            ) : (
              <ul className="space-y-3">
                {activities.slice(0, 8).map((a) => (
                  <li key={a.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm border-b border-slate-100 pb-2 gap-1">
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

export default Dashboard;