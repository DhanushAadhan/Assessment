import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  MdDashboard,
  MdPeople,
  MdPersonAdd,
  MdLogout,
} from "react-icons/md";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: <MdDashboard size={20} /> },
  { to: "/employees", label: "Employees", icon: <MdPeople size={20} /> },
  { to: "/add-employee", label: "Add Employee", icon: <MdPersonAdd size={20} /> },
];

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-[#0f172a] text-white flex flex-col z-50">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold text-indigo-400">EMS Admin</h1>
        <p className="text-xs text-slate-400 mt-1">Employee Management</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-slate-300 hover:bg-slate-700"
              }`
            }
          >
            {link.icon}
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-sm font-bold">
            {user?.name?.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-slate-400">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-all"
        >
          <MdLogout size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;