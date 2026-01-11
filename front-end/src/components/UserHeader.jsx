import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const UserHeader = ({ firstName, lastName, profileImage, balance }) => {
  const [showBalance, setShowBalance] = useState(false);
  const imgSrc = profileImage && !profileImage.includes('default') ? `${profileImage}?t=${new Date().getTime()}` : '/Profile Photo.png';

  return (
    <section className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
      <div className="lg:col-span-2 space-y-2">
        <img
          src={imgSrc}
          alt="Profile"
          className="w-20 h-20 rounded-full border-2 border-gray-100 object-cover"
          onError={(e) => {
            e.target.src = '/Profile Photo.png';
          }}
        />
        <div className="pt-2">
          <p className="text-gray-600 text-xl font-medium">Selamat datang,</p>
          <h1 className="text-3xl font-bold">
            {firstName || 'User'} {lastName || 'Nutech'}
          </h1>
        </div>
      </div>

      <div className="lg:col-span-3 bg-[#f42619] rounded-2xl p-8 text-white relative overflow-hidden shadow-md min-h-40 flex flex-col justify-center">
        <p className="text-lg opacity-90 font-medium">Saldo anda</p>
        <h2 className="text-3xl font-bold mt-2">Rp {showBalance ? (balance || 0).toLocaleString('id-ID') : '● ● ● ● ● ● ●'}</h2>
        <button onClick={() => setShowBalance(!showBalance)} className="text-sm mt-4 flex items-center gap-2 hover:opacity-80 w-fit">
          {showBalance ? 'Tutup Saldo' : 'Lihat Saldo'}
          {showBalance ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>

        <div className="absolute top-0 right-0 opacity-20 pointer-events-none">
          <svg width="200" height="160" viewBox="0 0 200 160" fill="none">
            <circle cx="180" cy="40" r="100" stroke="white" strokeWidth="2" />
            <circle cx="180" cy="40" r="80" stroke="white" strokeWidth="2" />
            <circle cx="180" cy="40" r="60" stroke="white" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default UserHeader;
