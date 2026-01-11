import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Banknote } from 'lucide-react';
import { topUp } from '../store/slices/TransactionSlice';
import Swal from 'sweetalert2';

const TopUpForm = () => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState('');
  const { loading } = useSelector((state) => state.transaction);

  const presets = [10000, 20000, 50000, 100000, 250000, 500000];

  const handleTopUp = async (e) => {
    e.preventDefault();
    const nominal = parseInt(amount);

    if (nominal < 10000 || nominal > 1000000) {
      return Swal.fire({
        title: 'Gagal',
        text: 'Minimal nominal Rp 10.000 dan maksimal Rp 1.000.000',
        icon: 'error',
        confirmButtonColor: '#f42619',
      });
    }

    try {
      const resultAction = await dispatch(topUp(nominal));

      if (topUp.fulfilled.match(resultAction)) {
        Swal.fire({
          title: 'Berhasil!',
          text: `Top Up sebesar Rp ${nominal.toLocaleString('id-ID')} sukses`,
          icon: 'success',
          confirmButtonColor: '#f42619',
        });
        setAmount('');
      } else {
        Swal.fire({
          title: 'Gagal',
          text: resultAction.payload,
          icon: 'error',
          confirmButtonColor: '#f42619',
        });
      }
    } catch (err) {
      Swal.fire('Error', 'Terjadi kesalahan sistem', 'error');
    }
  };
  const isButtonDisabled = !amount || parseInt(amount) <= 0 || loading;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <form onSubmit={handleTopUp} className="lg:col-span-2 space-y-4">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <Banknote size={20} />
          </span>
          <input
            id="nominal"
            name="nominal"
            type="number"
            className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
            placeholder="masukkan nominal Top Up"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button type="submit" disabled={isButtonDisabled} className="w-full bg-[#f42619] text-white py-3 rounded-md font-semibold hover:bg-red-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed">
          {loading ? 'Memproses...' : 'Top Up'}
        </button>
      </form>

      <div className="grid grid-cols-3 gap-3">
        {presets.map((val) => (
          <button
            key={val}
            type="button"
            onClick={() => setAmount(val.toString())}
            className={`py-3 px-1 border rounded-md text-sm font-medium transition ${amount === val.toString() ? 'border-red-500 bg-red-50 text-red-500' : 'border-gray-300 text-gray-700 hover:border-red-500'}`}
          >
            Rp{val.toLocaleString('id-ID')}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TopUpForm;
