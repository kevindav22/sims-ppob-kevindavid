import { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '../store/slices/AuthSlice';
import { getBalance } from '../store/slices/TransactionSlice';
import { getServices } from '../store/slices/InformationSlice';
import Navbar from '../components/Navbar';
import UserHeader from '../components/UserHeader';

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const { balance } = useSelector((state) => state.transaction);

  useEffect(() => {
    if (token) {
      dispatch(fetchProfile());
      dispatch(getBalance());
      dispatch(getServices());
    }
  }, [dispatch, token]);
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 md:px-12 py-8 space-y-10">
        <UserHeader 
          firstName={user?.first_name} 
          lastName={user?.last_name} 
          profileImage={user?.profile_image} 
          balance={balance} 
        />
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;