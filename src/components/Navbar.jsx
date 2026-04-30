const Navbar = ({ title }) => {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
      <h2 className="text-lg font-semibold text-slate-700">{title}</h2>
      <span className="text-sm text-slate-400">
        {new Date().toLocaleDateString("en-IN", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </span>
    </header>
  );
};

export default Navbar;