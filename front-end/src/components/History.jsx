import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHistory, resetHistory } from '../store/slices/TransactionSlice';

const HistoryTransaction = () => {
  const dispatch = useDispatch();
  const { history, loading, hasMore } = useSelector((state) => state.transaction);

  const limit = 5;
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    dispatch(resetHistory());
    dispatch(getHistory({ offset: 0, limit }));
  }, [dispatch]);

  const handleShowMore = () => {
    const nextOffset = offset + limit;
    setOffset(nextOffset);
    dispatch(getHistory({ offset: nextOffset, limit }));
  };

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Intl.DateTimeFormat('id-ID', options).format(new Date(dateString)) + ' WIB';
  };

  return (
    <div className="space-y-6">
      <h2 className="font-bold text-lg">Semua Transaksi</h2>

      <div className="space-y-4">
        {history.map((item, index) => (
          <div key={index} className="border border-gray-200 p-4 rounded-lg flex justify-between items-center bg-white shadow-sm">
            <div className="space-y-1">
              <p className={`text-xl font-bold ${item.transaction_type === 'TOPUP' ? 'text-green-500' : 'text-red-500'}`}>
                {item.transaction_type === 'TOPUP' ? '+' : '-'} Rp.{item.total_amount.toLocaleString('id-ID')}
              </p>
              <p className="text-gray-400 text-[10px]">{formatDate(item.created_on)}</p>
            </div>
            <p className="text-gray-700 text-xs font-medium">{item.description}</p>
          </div>
        ))}
      </div>

      {loading && <p className="text-center text-red-500 text-sm font-medium">Memuat data...</p>}

      {!loading && history.length === 0 && <p className="text-center text-gray-500 py-10">Maaf tidak ada riwayat transaksi saat ini</p>}

      {hasMore && !loading && history.length > 0 && (
        <div className="text-center pt-4">
          <button onClick={handleShowMore} className="text-[#f42619] font-bold text-sm hover:underline">
            Show more
          </button>
        </div>
      )}
    </div>
  );
};

export default HistoryTransaction;
