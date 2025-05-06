import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import { Toaster, toast } from "sonner";
import { appointmentAPI } from "../features/MyAppointments/AppointmentsAPI";
import { departmentsApi } from "../features/department/DepartmentAPI";
import { useSelector } from "react-redux"; // Import useSelector
import { UserState } from "../features/auth/UserSlice"; // Import UserState
import Navbar from "../components/Navbar";





export default function AppointmentForm() {



  // Create appointment mutation
  const [createAppointment] = appointmentAPI.useCreateAppointmentMutation();

  // Fetch departments from the database
  const { data: departments, isLoading: isDepartmentsLoading } = departmentsApi.useGetDepartmentsQuery(undefined);

  // Get logged-in user from Redux store
  const user = useSelector((state: { user: UserState }) => state.user.user);
  const userid = user?.id
 // console.log("user id", user?.id)

  const [formData, setFormData] = useState({
    user_id: userid,
    fullName: "",
    email: "",
    department: "",
    doctor: "",
    appointmentDate: "",
  });

  const [filteredDoctors, setFilteredDoctors] = useState([]); // State to hold doctors for the selected department

  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        user_id: user.id, // Ensure user_id is a valid number
        fullName: user.full_name || "", // Fallback to empty string if undefined
        email: user.email || "", // Fallback to empty string if undefined
      }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDepartmentChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDepartment = e.target.value;
    setFormData({ ...formData, department: selectedDepartment, doctor: "" }); // Reset doctor when department changes

    try {
      // Fetch doctors directly from the API based on the selected department
      const response = await fetch(`http://localhost:8000/api/doctor?department_id=${selectedDepartment}`);
      const doctors = await response.json();
      setFilteredDoctors(doctors || []);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      toast.error("Failed to fetch doctors. Please try again.");
    }
  };

  const handleDoctorSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const doctorName = e.target.value;

    // Update formData with the selected doctor's name
    setFormData((prev) => ({
      ...prev,
      doctor: doctorName, // Set the doctor's name
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.department) {
      toast.error("Department is required.");
      return;
    }

    if (!formData.doctor) {
      toast.error("Doctor is required.");
      return;
    }

    // Validate appointment date
    const selectedDate = new Date(formData.appointmentDate);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison
    if (selectedDate < currentDate) {
      toast.error("You cannot book an appointment on a past date.");
      return;
    }

    const payload = {
      ...formData,
      user_id: Number(formData.user_id), // Ensure user_id is a number
      department: Number(formData.department), // Ensure department is a number
      appointment_date: formData.appointmentDate, // Map to API field
    };

    try {
      console.log("Submitting form data:", payload); // Log payload
      const response = await createAppointment(payload).unwrap();
      console.log("Appointment created:", response);

      toast.success("Appointment booked successfully!");
      setTimeout(() => navigate(-1), 2000);
    } catch (error: any) {
      console.error("Error creating appointment:", error);
      console.error("Request payload:", payload); // Log payload for debugging
      toast.error("Failed to book appointment. Please try again.");
      console.log(error);
    }
  };

  return (
    <>
    <Navbar />
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      {/* Sonner Toaster */}
      <Toaster position="top-right" richColors />

      <h2 className="text-xl font-bold mb-4 text-teal-300">Book an Appointment</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="department"
          value={formData.department}
          onChange={handleDepartmentChange}
          className="w-full p-2 border rounded"
          required
          disabled={isDepartmentsLoading} // Disable while loading
        >
          <option value="" disabled>
            {isDepartmentsLoading ? "Loading departments..." : "Select Department"}
          </option>
          {departments?.map((dept: { id: number; department_name: string }) => (
            <option key={dept.id} value={dept.id}>
              {dept.department_name}
            </option>
          ))}
        </select>
        <select
          name="doctor"
          value={formData.doctor} // Use the doctor's name from formData
          onChange={handleDoctorSelect}
          className="w-full p-2 border rounded"
          required
          disabled={!filteredDoctors.length} // Disable if no doctors are available
        >
          <option value="" disabled>
            {filteredDoctors.length ? "Select Doctor" : "No doctors available"}
          </option>
          {filteredDoctors.map((doctor: { id: number; name: string }) => (
            <option key={doctor.id} value={doctor.name}>
              {doctor.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          name="appointmentDate"
          value={formData.appointmentDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-teal-400 text-white p-2 rounded hover:bg-gray-500 cursor-pointer"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-teal-300 text-white p-2 rounded hover:bg-teal-600 cursor-pointer"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
    </>
  );
}