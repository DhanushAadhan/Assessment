import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useEmployees } from "../hooks/useEmployees";

const DEPARTMENTS = ["Engineering", "Design", "Marketing", "HR", "Finance", "Operations"];

const initialForm = {
  name: "", email: "", phone: "", department: "Engineering",
  role: "", status: "Active", joinDate: "",
};

const AddEmployee = () => {
  const { addEmployee } = useEmployees();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

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
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    addEmployee(form);
    navigate("/employees");
  };

  const Field = ({ label, name, type = "text", placeholder }) => (
    <div>
      <label className="block text-sm font-medium text-slate-600 mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={form[name]}
        onChange={(e) => { setForm({ ...form, [name]: e.target.value }); setErrors({ ...errors, [name]: "" }); }}
        className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-400 ${errors[name] ? "border-red-400" : "border-slate-200"}`}
      />
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <Navbar title="Add Employee" />
        <main className="flex-1 p-6">
          <div className="bg-white rounded-2xl shadow-sm p-8 max-w-2xl mx-auto">
            <h2 className="text-lg font-semibold text-slate-700 mb-6">Employee Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Full Name" name="name" placeholder="e.g. Dhanushaadhan T" />
                <Field label="Email Address" name="email" type="email" placeholder="e.g. dhanush@company.com" />
                <Field label="Phone Number" name="phone" placeholder="10-digit number" />
                <Field label="Role / Designation" name="role" placeholder="e.g. Frontend Developer" />
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Department</label>
                  <select
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                    {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <Field label="Join Date" name="joinDate" type="date" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-all">
                  Add Employee
                </button>
                <button type="button" onClick={() => navigate("/employees")} className="border border-slate-200 text-slate-600 px-6 py-2.5 rounded-lg text-sm hover:bg-slate-50 transition-all">
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