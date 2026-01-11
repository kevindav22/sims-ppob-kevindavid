import { useParams } from 'react-router-dom';
import TransactionForm from '../components/PaymentForm';

const TransactionPage = () => {
  const { service_code } = useParams();

  return (
    <section className="space-y-6 animate-in fade-in duration-500">
      <div>
        <p className="text-gray-600 text-lg font-medium">PemBayaran</p>
      </div>
      <TransactionForm serviceCode={service_code} />
    </section>
  );
};

export default TransactionPage;