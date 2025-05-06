import  { useState } from 'react';
import UserDrawer from './UserDrawer';
import { Outlet } from 'react-router-dom';

function UserDashboardLayout() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <UserDrawer isOpen={isOpen} toggleDrawer={toggleDrawer} />
      <div style={{ marginLeft: isOpen ? '250px' : '0', transition: 'margin-left 0.3s' }}>
        <Outlet />
      </div>
    </div>
  );
}

export default UserDashboardLayout;