import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useEmployees } from "../hooks/useEmployees";

const DEPARTMENTS = ["Engineering", "Design", "Marketing", "HR", "Finance", "Operations"];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  department: "Engineering",
  role: "",
  status: "Active",
  joinDate: "",
};

const AddEmployee = () => {
  const { addEmployee } = useEmployees();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.phone.trim()) e.phone = "Phone is required";
    else if (!/^\d{10}$/.test(form.phone)) e.phone = "Phone must be 10 digits";
    if (!form.role.trim()) e.role = "Role is required";
    if (!form.joinDate) e.joinDate = "Join date is required";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    addEmployee(form);
    navigate("/employees");
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col lg:ml-64">
        <Navbar title="Add Employee" onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 md:p-6">
          <div className="bg-white rounded-2xl shadow-sm p-5 md:p-8 max-w-2xl mx-auto">
            <h2 className="text-base md:text-lg font-semibold text-slate-700 mb-6">
              Employee Information
            </h2>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  autoComplete="off"
                  placeholder="e.g. Dhanushaadhan T"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-400 transition ${
                    errors.name ? "border-red-400 bg-red-50" : "border-slate-200"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  autoComplete="off"
                  placeholder="e.g. dhanush@company.com"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-400 transition ${
                    errors.email ? "border-red-400 bg-red-50" : "border-slate-200"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  autoComplete="off"
                  placeholder="10-digit number"
                  value={form.phone}
                  maxLength={10}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    handleChange("phone", val);
                  }}
                  className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-400 transition ${
                    errors.phone ? "border-red-400 bg-red-50" : "border-slate-200"
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Role / Designation
                </label>
                <input
                  type="text"
                  autoComplete="off"
                  placeholder="e.g. Frontend Developer"
                  value={form.role}
                  onChange={(e) => handleChange("role", e.target.value)}
                  className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-400 transition ${
                    errors.role ? "border-red-400 bg-red-50" : "border-slate-200"
                  }`}
                />
                {errors.role && (
                  <p className="text-red-500 text-xs mt-1">{errors.role}</p>
                )}
              </div>

              {/* Department + Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">
                    Department
                  </label>
                  <select
                    value={form.department}
                    onChange={(e) => handleChange("department", e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
                  >
                    {DEPARTMENTS.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">
                    Status
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) => handleChange("status", e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>

              {/* Join Date — fixed */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Join Date
                </label>
                <input
                  type="date"
                  value={form.joinDate}
                  max={new Date().toISOString().split("T")[0]}
                  onChange={(e) => handleChange("joinDate", e.target.value)}
                  className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-400 transition bg-white ${
                    errors.joinDate ? "border-red-400 bg-red-50" : "border-slate-200"
                  }`}
                />
                {errors.joinDate && (
                  <p className="text-red-500 text-xs mt-1">{errors.joinDate}</p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-all"
                >
                  Add Employee
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/employees")}
                  className="border border-slate-200 text-slate-600 px-6 py-2.5 rounded-lg text-sm hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddEmployee;