import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../app/Store';
import { userAPI } from '../features/users/UserApi';
import { toast, Toaster } from 'sonner';
import Navbar from '../components/Navbar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { logout } from '../features/auth/UserSlice'; // Import the logout action

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const id = user?.id;

  console.log("User ID from Redux Store:", id); // Log the user ID for debugging

  // Ensure valid user_id
  const user_id = Number(id);

  // Fetch user data only when user_id is available
  const { data: userDetails, error, isLoading } = userAPI.useGetUserByIdQuery(user_id);

  const [updateUser] = userAPI.useUpdateUserMutation();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    contact_phone: '',
  });
  const [profilePicturePreview, setProfilePicturePreview] = useState<string | ArrayBuffer | null>(null);

  // Log user_id and fetched data for debugging
  useEffect(() => {
    console.log("Fetched User Details:", userDetails);
  }, [user_id, userDetails]);

  useEffect(() => {
    if (userDetails) {
      setFormData({
        full_name: userDetails.full_name,
        email: userDetails.email,
        contact_phone: userDetails.contact_phone,
      });
      setProfilePicturePreview(userDetails.profile_picture || '');
    }
  }, [userDetails]);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      await updateUser({ id: user_id, ...formData, profile_picture: profilePicturePreview }).unwrap();
      toast.success('Profile updated successfully');
      handleClose();
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handleLogout = () => {
    dispatch(logout()); // Clear user state in Redux
    toast.success('Logged out successfully');
    navigate('/login'); // Redirect to login page
  };

  if (!user_id) return <div className="text-center text-red-500">No user logged in</div>;
  if (isLoading) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div></div>;
  if (error) return <div className="text-center text-red-500">Error loading user profile</div>;

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen p-2">
        <div className="max-w-md w-full shadow-lg rounded-lg p-6">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center">
              {profilePicturePreview ? (
                <img src={String(profilePicturePreview)} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <AccountCircleIcon className="text-6xl" />
              )}
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center mb-4">Welcome,</h2>
          {userDetails ? (
            <div>
              <h3 className="text-xl text-center mb-2">{userDetails.full_name}</h3>
              <p className="mb-1"><strong>Email:</strong> {userDetails.email}</p>
              <p><strong>Contact Phone:</strong> {userDetails.contact_phone}</p>
              <div className="flex justify-center mt-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleClickOpen}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          ) : (
            <p className="text-center">No user details available</p>
          )}
          <div className="flex justify-center mt-4">
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded flex items-center"
              onClick={() => navigate(-1)}
            >
              <ArrowBackIcon className="mr-2" />
              Back
            </button>
          </div>
          <div className="flex justify-center mt-4">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ${open ? 'block' : 'hidden'}`}>
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
          <input
            className="w-full p-2 border rounded mb-2"
            placeholder="Full Name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
          />
          <input
            className="w-full p-2 border rounded mb-2"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            className="w-full p-2 border rounded mb-2"
            placeholder="Contact Phone"
            name="contact_phone"
            value={formData.contact_phone}
            onChange={handleChange}
          />
          <label className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer block text-center mb-4">
            Upload Profile Picture
            <input type="file" hidden onChange={handleFileChange} />
          </label>
          <div className="flex justify-end">
            <button className="mr-2 text-gray-600" onClick={handleClose}>Cancel</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>Save</button>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Profile;