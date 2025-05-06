import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

const UserDrawer = ({ isOpen, toggleDrawer }: { isOpen: boolean, toggleDrawer: () => void }) => {
  return (
    <div>
      <Drawer anchor="right" open={isOpen} onClose={toggleDrawer}>
        <List>
          {/* user booking */}
          <ListItem component={(props) => <Link {...props} to="/dashboard/user/mybookings" />} onClick={toggleDrawer}>
            <ListItemText primary="My Bookings" />
          </ListItem>

          {/* user profile */}
          <ListItem component={Link} to="/dashboard/user/myprofile" onClick={toggleDrawer}>
            <ListItemText primary="My profile" />
          </ListItem>
        </List>
      </Drawer>
      <Outlet />
    </div>
  );
};

export default UserDrawer;
