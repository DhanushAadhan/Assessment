import { MdMenu } from "react-icons/md";

const Navbar = ({ title, onMenuClick }) => {
  return (
    <header className="bg-white border-b border-slate-200 px-4 md:px-6 py-4 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-slate-500 hover:text-slate-800 transition"
        >
          <MdMenu size={24} />
        </button>
        <h2 className="text-base md:text-lg font-semibold text-slate-700">{title}</h2>
      </div>
      <span className="text-xs md:text-sm text-slate-400 hidden sm:block">
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