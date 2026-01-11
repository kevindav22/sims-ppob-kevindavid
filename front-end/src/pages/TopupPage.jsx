import TopUpForm from '../components/TopupForm';

const TopUpPage = () => {
    return (
      
    <section className="space-y-6 animate-in fade-in duration-500">
      <div>
        <p className="text-gray-600 text-lg font-medium">Silahkan masukan</p>
        <h1 className="text-3xl font-bold">Nominal Top Up</h1>
      </div>
      <TopUpForm />
      
    </section>
  );
};

export default TopUpPage;