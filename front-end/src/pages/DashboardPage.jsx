import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBanners, getServices } from '../store/slices/InformationSlice';
import ServiceMenu from '../components/ServiceMenu';
import PromoBanner from '../components/PromoBanner';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { banners, services } = useSelector((state) => state.information);

  useEffect(() => {
    dispatch(getServices());
    dispatch(getBanners());
  }, [dispatch]);

  return (
    <div className="space-y-10">
      <ServiceMenu services={services} />
      <PromoBanner banners={banners} />
    </div>
  );
};

export default Dashboard;