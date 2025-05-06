
import { useGetAppointmentsQuery, useDeleteAppointmentMutation } from "../features/MyAppointments/AppointmentsAPI";
import { toast } from "sonner";

function AllAppointments() {
  // Fetch appointments
  const { data: appointments, isLoading, isError, error, refetch } = useGetAppointmentsQuery();
  
  // Delete mutation
  const [deleteAppointment, { isLoading: isDeleting }] = useDeleteAppointmentMutation();

  // Handle delete
  const handleDelete = async (id: number) => {
    try {
      await deleteAppointment(id.toString()).unwrap();
      toast.success("Appointment deleted successfully!");
      refetch(); // Refresh data
    } catch (err) {
      console.error("Failed to delete appointment:", err);
      toast.error("Failed to delete appointment. Please try again.");
    }
  };

  // Show loading state
  if (isLoading) return <p>Loading appointments...</p>;
  
  // Show error state
  if (isError) return <p>Error fetching appointments: {error.toString()}</p>;

  return (
    <div className="p-4 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">All Appointments</h1>
      
      {isDeleting && <p>Processing...</p>}
      
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            {["ID", "Full Name", "Email", "Department", "Doctor", "Date", "Actions"].map((header) => (
              <th key={header} className="border border-gray-300 p-2">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {appointments?.map((appointment) => (
            <tr key={appointment.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2">{appointment.id}</td>
              <td className="border border-gray-300 p-2">{appointment.fullName}</td>
              <td className="border border-gray-300 p-2">{appointment.email}</td>
              <td className="border border-gray-300 p-2">{appointment.department}</td>
              <td className="border border-gray-300 p-2">{appointment.doctor}</td>
              <td className="border border-gray-300 p-2">{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
              <td className="border border-gray-300 p-2">
                <button 
                  onClick={() => handleDelete(appointment.id)} 
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  disabled={isDeleting}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllAppointments;
