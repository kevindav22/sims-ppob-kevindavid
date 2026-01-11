import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProfile, updateProfileImage, logout, fetchProfile } from '../store/slices/AuthSlice';
import { Pencil, AtSign, User } from 'lucide-react';
import Swal from 'sweetalert2';

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const fileInputRef = useRef(null);

  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
  });
  
  useEffect(() => {
    if (!user && localStorage.getItem('token')) {
      dispatch(fetchProfile());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      });
    }
  }, [user]);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 100 * 1024) {
      Swal.fire('Error', 'Ukuran gambar maksimal adalah 100 KB', 'error');
      return;
    }

    const result = await dispatch(updateProfileImage(file));
    if (updateProfileImage.fulfilled.match(result)) {
      Swal.fire('Sukses', 'Foto profil berhasil diperbarui', 'success');
      dispatch(fetchProfile());
    } else {
      Swal.fire('Gagal', result.payload, 'error');
    }
  };

  const handleSave = async () => {
    const result = await dispatch(
      updateProfile({
        first_name: formData.first_name,
        last_name: formData.last_name,
      })
    );

    if (updateProfile.fulfilled.match(result)) {
      Swal.fire('Sukses', 'Profil berhasil diperbarui', 'success');
      setIsEdit(false);
    } else {
      Swal.fire('Gagal', result.payload, 'error');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const imgSrc = user?.profile_image && !user.profile_image.includes('default') ? `${user.profile_image}?t=${new Date().getTime()}` : '/Profile Photo.png';

  return (
    <div className="max-w-2xl mx-auto flex flex-col items-center space-y-8">
      <div className="relative group cursor-pointer" onClick={handleImageClick}>
        <img
          src={imgSrc}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border border-gray-200"
          onError={(e) => {
            e.target.src = '/Profile Photo.png';
          }}
        />
        <div className="absolute bottom-0 right-0 bg-white p-1.5 border border-gray-300 rounded-full shadow-sm">
          <Pencil size={14} className="text-gray-600" />
        </div>
        <input type="file" ref={fileInputRef} className="hidden" accept="image/jpeg,image/png" onChange={handleFileChange} />
      </div>

      <h1 className="text-2xl font-bold">
        {user?.first_name} {user?.last_name}
      </h1>

      <div className="w-full space-y-6">
        <div className="space-y-1">
          <label className="text-sm font-medium">Email</label>
          <div className="relative">
            <AtSign size={18} className="absolute left-3 top-3.5 text-gray-400" />
            <input type="email" readOnly value={formData.email} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md bg-gray-50 outline-none text-gray-500" />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Nama Depan</label>
          <div className="relative">
            <User size={18} className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="text"
              disabled={!isEdit}
              value={formData.first_name}
              onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              className={`w-full pl-10 pr-4 py-3 border rounded-md outline-none ${isEdit ? 'border-gray-800' : 'border-gray-300 bg-gray-50'}`}
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Nama Belakang</label>
          <div className="relative">
            <User size={18} className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="text"
              disabled={!isEdit}
              value={formData.last_name}
              onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
              className={`w-full pl-10 pr-4 py-3 border rounded-md outline-none ${isEdit ? 'border-gray-800' : 'border-gray-300 bg-gray-50'}`}
            />
          </div>
        </div>
      </div>

      <div className="w-full space-y-4 pt-4">
        {!isEdit ? (
          <>
            <button onClick={() => setIsEdit(true)} className="w-full py-3 border border-[#f42619] text-[#f42619] rounded-md font-bold hover:bg-red-50">
              Edit Profile
            </button>
            <button onClick={handleLogout} className="w-full py-3 bg-[#f42619] text-white rounded-md font-bold hover:bg-red-700 transition-colors">
              Logout
            </button>
          </>
        ) : (
          <>
            <button onClick={handleSave} className="w-full py-3 bg-[#f42619] text-white rounded-md font-bold hover:bg-red-700">
              Simpan
            </button>
            <button onClick={() => setIsEdit(false)} className="w-full py-3 border border-[#f42619] text-[#f42619] rounded-md font-bold hover:bg-red-50">
              Batalkan
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
