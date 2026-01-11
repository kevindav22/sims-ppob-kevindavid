import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AtSign, Lock, User, Eye, EyeOff } from 'lucide-react';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', isError: false });

  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    confirm_password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage({ text: '', isError: false });

    if (formData.password !== formData.confirm_password) {
      return setMessage({ text: 'Password dan konfirmasi password tidak sama', isError: true });
    }

    if (formData.password.length < 8) {
      return setMessage({ text: 'Password minimal 8 karakter', isError: true });
    }

    setLoading(true);
    try {
      const response = await fetch('https://take-home-test-api.nutech-integrasi.com/registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          first_name: formData.first_name,
          last_name: formData.last_name,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (result.status === 0) {
        setMessage({ text: result.message, isError: false });
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setMessage({ text: result.message, isError: true });
      }
    } catch (error) {
      setMessage({ text: 'Terjadi kesalahan koneksi ke server', isError: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <div className="flex justify-center items-center gap-2 mb-6">
        <img src="/Logo.png" alt="Logo" className="w-8 h-8" />
        <h1 className="font-bold text-xl">SIMS PPOB</h1>
      </div>

      <h2 className="text-2xl font-bold mb-8 px-10">Lengkapi data untuk membuat akun</h2>

      <form onSubmit={handleRegister} className="space-y-4 text-left">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <AtSign size={18} />
          </span>
          <input name="email" type="email" required value={formData.email} onChange={handleChange} className="w-full pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-500" placeholder="masukan email anda" />
        </div>

        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <User size={18} />
          </span>
          <input name="first_name" type="text" required value={formData.first_name} onChange={handleChange} className="w-full pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-500" placeholder="nama depan" />
        </div>

        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <User size={18} />
          </span>
          <input name="last_name" type="text" required value={formData.last_name} onChange={handleChange} className="w-full pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-500" placeholder="nama belakang" />
        </div>

        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <Lock size={18} />
          </span>
          <input
            name="password"
            type={showPass ? 'text' : 'password'}
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full pl-10 pr-10 py-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
            placeholder="buat password"
          />
          <button type="button" onClick={() => setShowPass(!showPass)} className="absolute inset-y-0 right-0 pr-3 text-gray-400">
            {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <Lock size={18} />
          </span>
          <input
            name="confirm_password"
            type={showConfirmPass ? 'text' : 'password'}
            required
            value={formData.confirm_password}
            onChange={handleChange}
            className="w-full pl-10 pr-10 py-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
            placeholder="konfirmasi password"
          />
          <button type="button" onClick={() => setShowConfirmPass(!showConfirmPass)} className="absolute inset-y-0 right-0 pr-3 text-gray-400">
            {showConfirmPass ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-[#f42619] text-white py-3 rounded-md font-semibold mt-4 hover:bg-red-700 disabled:bg-gray-400 transition">
          {loading ? 'Memproses...' : 'Registrasi'}
        </button>

        {message.text && <p className={`mt-2 text-center text-xs font-medium ${message.isError ? 'text-red-500' : 'text-green-500'}`}>{message.text}</p>}
      </form>

      <p className="mt-6 text-gray-500 text-sm">
        sudah punya akun? login{' '}
        <Link to="/login" className="text-red-500 font-bold">
          di sini
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
