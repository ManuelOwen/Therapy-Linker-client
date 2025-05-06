import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../app/Store";
import UserDrawer from "./UserDrawer";
import { drawerData, DrawerData } from "./DrawerData";

const ParentComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredDrawerData, setFilteredDrawerData] = useState<DrawerData[]>([]);
  const user = useSelector((state: RootState) => state.user);

  const toggleDrawer = () => {
    setIsOpen((prev) => !prev);
  };

  // Function to filter drawer data based on role
  const filterDrawerDataByRole = () => {
    const role = user?.user?.role;
    if (role === "admin") {
      setFilteredDrawerData(drawerData); // Admin sees all items
    } else if (role) {
      setFilteredDrawerData(drawerData.filter((item) => !item.adminOnly)); // Users see non-admin items
    } else {
      setFilteredDrawerData([]); // Default to an empty array if role is undefined
    }
  };

  useEffect(() => {
    filterDrawerDataByRole();
  }, [user?.user?.role]); // Trigger effect on role change

  return (
    <div>
      <Button onClick={toggleDrawer}>Open Drawer</Button>
      <UserDrawer isOpen={isOpen} toggleDrawer={toggleDrawer} drawerData={filteredDrawerData} />
    </div>
  );
};

export default ParentComponent;
