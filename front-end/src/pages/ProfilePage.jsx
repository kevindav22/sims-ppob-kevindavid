import Navbar from '../components/Navbar';
import UserProfile from '../components/UserProfile';

const ProfilePage = () => {
  return (
    <>
      <Navbar />
      <div className="py-10">
        <UserProfile />
      </div>
    </>
  );
};

export default ProfilePage;
