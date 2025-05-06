export type DrawerData = {
    id: number;
    name: string;
   link:string;
    adminOnly: boolean;
}
export const drawerData: DrawerData[] = [
    {
        id: 0,
        name: 'profile',
               link: 'profile',
        adminOnly: false
    },
    {
        id: 1,
        name: 'doctors',
               link: 'doctors',
        adminOnly: false
    },
    {
        id: 3,
        name: 'mybookings',
               link: 'mybookings',
        adminOnly: false
    },
    {
        id: 4,
        name: 'departments',
               link: 'departments',
        adminOnly: false
    },
    
    {
        id: 6,
        name: 'All Bookings',
                link: 'appointments',
        adminOnly: true
    },
    
    {
        id: 8,
        name: 'Account',
                link: 'account',
        adminOnly: true
    },
    {
        id: 2,
        name: 'Profile',
             link: 'profile',
        adminOnly: false
    },
    {
        id: 5,
        name: 'Logout',
                link: 'logout',
        adminOnly: false
    },
    {
        id: 7,
        name: 'users',
                link: 'users',
        adminOnly: true
    },
];