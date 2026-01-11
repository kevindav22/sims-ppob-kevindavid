import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AtSign, Lock, Eye, EyeOff } from 'lucide-react';
import { loginUser } from '../store/slices/AuthSlice';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', isError: false });

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage({ text: '', isError: false });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return setMessage({ text: 'Parameter email tidak sesuai format', isError: true });
    }
    if (password.length < 8) {
      return setMessage({ text: 'Password minimal 8 karakter', isError: true });
    }
    setLoading(true);

    const resultAction = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(resultAction)) {
      setMessage({ text: resultAction.payload.message, isError: false });
      setTimeout(() => navigate('/'), 1500);
    } else {
      setMessage({
        text: resultAction.payload || 'Terjadi kesalahan sistem',
        isError: true,
      });
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <div className="flex justify-center items-center gap-2 mb-6">
        <img src="/Logo.png" alt="Logo" className="w-8 h-8" />
        <h1 className="font-bold text-xl">SIMS PPOB</h1>
      </div>

      <h2 className="text-2xl font-bold mb-8 px-10">Masuk atau buat akun untuk memulai</h2>

      <form onSubmit={handleLogin} className="space-y-4">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <AtSign size={18} />
          </span>
          <input type="email" className="w-full pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-500" placeholder="masukan email anda" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <Lock size={18} />
          </span>
          <input
            type={showPassword ? 'text' : 'password'}
            className="w-full pl-10 pr-10 py-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
            placeholder="masukan password anda"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-[#f42619] text-white py-3 rounded-md font-semibold hover:bg-red-700 transition disabled:bg-gray-400">
          {loading ? 'Memproses...' : 'Masuk'}
        </button>
      </form>
      {message.text && <p className={`pt-4 text-xs font-medium ${message.isError ? 'text-red-500' : 'text-green-500'}`}>{message.text}</p>}
      <p className="mt-6 text-gray-500 text-sm">
        belum punya akun? registrasi{' '}
        <Link to="/register" className="text-red-500 font-bold">
          di sini
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
