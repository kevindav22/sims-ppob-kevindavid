import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';
import DashboardLayout from '../layout/DashboardLayout';
import DashboardPage from '../pages/DashboardPage';
import TopUpPage from '../pages/TopupPage';
import TransactionPage from '../pages/TransactionPage';
import HistoryPage from '../pages/HistoryPage';
import ProfilePage from '../pages/ProfilePage';
import ProtectedRoute from './ProtectedRoutes';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/:type" element={<AuthPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/topup" element={<TopUpPage />} />
          <Route path="/transaction/:service_code" element={<TransactionPage />} />
          <Route path="/transaction/history" element={<HistoryPage />} />
        </Route>
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;