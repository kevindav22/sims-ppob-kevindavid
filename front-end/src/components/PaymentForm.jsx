import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Banknote } from 'lucide-react';
import { createTransaction, getBalance } from '../store/slices/TransactionSlice';
import Swal from 'sweetalert2';

const PaymentForm = ({ serviceCode }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { services } = useSelector((state) => state.information);
  const selectedService = services.find((s) => s.service_code === serviceCode);

  const handlePayment = async (e) => {
    e.preventDefault();

    const confirm = await Swal.fire({
      title: `Beli ${selectedService?.service_name} senilai`,
      text: `Rp ${selectedService?.service_tariff.toLocaleString('id-ID')} ?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Ya, Bayar',
      cancelButtonText: 'Batalkan',
      confirmButtonColor: '#f42619',
    });

    if (!confirm.isConfirmed) return;

    setLoading(true);
    try {
      const resultAction = await dispatch(createTransaction(serviceCode));

      if (createTransaction.fulfilled.match(resultAction)) {
        Swal.fire({
          title: 'Pembayaran Berhasil!',
          text: `Transaksi ${selectedService?.service_name} sukses`,
          icon: 'success',
          confirmButtonColor: '#f42619',
        });
        dispatch(getBalance());
      } else {
        Swal.fire({
          title: 'Pembayaran Gagal',
          text: resultAction.payload,
          icon: 'error',
          confirmButtonColor: '#f42619',
        });
      }
    } catch (err) {
      Swal.fire('Error', 'Terjadi kesalahan sistem', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <img src={selectedService?.service_icon} alt={selectedService?.service_name} className="w-8 h-8" />
        <h2 className="font-bold text-lg">{selectedService?.service_name}</h2>
      </div>

      <form onSubmit={handlePayment} className="space-y-4">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <Banknote size={20} />
          </span>
          <input type="text" readOnly className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-md bg-gray-50 outline-none" value={selectedService?.service_tariff.toLocaleString('id-ID')} />
        </div>

        <button type="submit" disabled={loading || !selectedService} className="w-full bg-[#f42619] text-white py-3 rounded-md font-semibold hover:bg-red-700 transition disabled:bg-gray-300">
          {loading ? 'Memproses...' : 'Bayar'}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
