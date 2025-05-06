import { useSelector } from 'react-redux';
import { appointmentAPI } from '../features/MyAppointments/AppointmentsAPI';
import { RootState } from '../app/Store';
import Navbar from '../components/Navbar';

const UserAppointments = () => {
  const user = useSelector((state: RootState) => state.user.user); // Get the user object from Redux store
  const user_id = user?.user_id; // Safely access user_id

  console.log("User ID from Redux Store:", user_id); // Log the user ID for debugging

  const { data: appointments, error, isLoading } = appointmentAPI.useGetAppointmentsQuery();

  // Filter appointments for the logged-in user
  const userAppointments = appointments?.filter((appointment) => appointment.user_id === user_id);

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-8">
        <h1 className="text-2xl font-bold mb-4">Your Appointments</h1>
        {isLoading && <p><span className="loading loading-spinner text-success"></span></p>}
        {error && <p>Error fetching appointments</p>}
        {userAppointments && userAppointments.length > 0 ? (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">Appointment ID</th>
                <th className="py-2">Full Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Department</th>
                <th className="py-2">Doctor</th>
                <th className="py-2">Appointment Date</th>
              </tr>
            </thead>
            <tbody>
              {userAppointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td className="py-2">{appointment.id}</td>
                  <td className="py-2">{appointment.fullName}</td>
                  <td className="py-2">{appointment.email}</td>
                  <td className="py-2">{appointment.department}</td>
                  <td className="py-2">{appointment.doctor}</td>
                  <td className="py-2">{appointment.appointmentDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No appointments found</p>
        )}
      </div>
    </>
  );
};

export default UserAppointments;
