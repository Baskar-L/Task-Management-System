import {
  Link,
  useNavigate
} from "react-router-dom";

import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
  const {
    user,
    logout
  } = useAuth();

  const navigate =
    useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        <Link
          to="/dashboard"
          className="text-xl font-bold text-slate-900"
        >
          TaskManager
        </Link>

        <div className="flex items-center gap-4">

          <span className="hidden text-sm text-slate-600 sm:block">
            {user?.name}
          </span>

          <button
            onClick={handleLogout}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Logout
          </button>

        </div>
      </div>
    </header>
  );
};

export default Navbar;