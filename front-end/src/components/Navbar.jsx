import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-12 h-16 flex items-center justify-between">
        <div onClick={() => navigate('/')} className="flex items-center gap-2 cursor-pointer">
          <img src="/Logo.png" alt="Logo" className="w-6 h-6" />
          <span className="font-bold text-lg">SIMS PPOB</span>
        </div>

        <div className="flex gap-8 font-semibold">
          <NavLink to="/topup" className={({ isActive }) => (isActive ? 'text-red-500' : 'text-gray-700 hover:text-red-500')}>
            Top Up
          </NavLink>

          <NavLink to="/transaction/history" className={({ isActive }) => (isActive ? 'text-red-500' : 'text-gray-700 hover:text-red-500')}>
            Transaction
          </NavLink>

          <NavLink to="/profile" className={({ isActive }) => (isActive ? 'text-red-500' : 'text-gray-700 hover:text-red-500')}>
            Akun
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
