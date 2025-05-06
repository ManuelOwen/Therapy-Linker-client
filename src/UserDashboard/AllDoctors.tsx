import React, { useState } from "react";
import { Toaster, toast } from "sonner"; // Import Sonner toast
import { useGetDoctorsQuery, useAddDoctorMutation, useEditDoctorMutation, useDeleteDoctorMutation } from "../features/Doctors/DoctorsAPI";

const DoctorsManagement: React.FC = () => {
    const { data: doctors, isLoading, refetch } = useGetDoctorsQuery(); // Add refetch to refresh data
    const [addDoctor] = useAddDoctorMutation();
    const [editDoctor] = useEditDoctorMutation();
    const [deleteDoctor] = useDeleteDoctorMutation();
    const [formData, setFormData] = useState({ name: "", department_id: "", position: "", description: "", image_url: "" });

    const handleAddDoctor = async () => {
        try {
            await addDoctor(formData).unwrap();
            toast.success("Doctor added successfully!");
            refetch(); // Refresh the list of doctors
        } catch (error) {
            console.error("Error adding doctor:", error);
            toast.error("Failed to add doctor. Please try again.");
        }
    };

    const handleEditDoctor = async (id: number) => {
        try {
            await editDoctor({ id, ...formData }).unwrap();
            toast.success("Doctor updated successfully!");
            refetch(); // Refresh the list of doctors
        } catch (error) {
            console.error("Error editing doctor:", error);
            toast.error("Failed to update doctor. Please try again.");
        }
    };

    const handleDeleteDoctor = async (id: number) => {
        try {
            await deleteDoctor(id).unwrap();
            toast.success("Doctor deleted successfully!");
            refetch(); // Refresh the list of doctors
        } catch (error) {
            console.error("Error deleting doctor:", error);
            toast.error("Failed to delete doctor. Please try again.");
        }
    };

    if (isLoading) return <p>Loading doctors...</p>;

    return (
        <div className="p-4">
            {/* Sonner Toaster */}
            <Toaster position="top-right" richColors />

            <h1 className="text-xl font-bold mb-4">Doctors Management</h1>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="border p-2 mr-2"
                />
                <input
                    type="text"
                    placeholder="Department ID"
                    value={formData.department_id}
                    onChange={(e) => setFormData({ ...formData, department_id: e.target.value })}
                    className="border p-2 mr-2"
                />
                <input
                    type="text"
                    placeholder="Position"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="border p-2 mr-2"
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="border p-2 mr-2"
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="border p-2 mr-2"
                />
                <button onClick={handleAddDoctor} className="bg-green-500 text-white p-2 rounded">Add Doctor</button>
            </div>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">ID</th>
                        <th className="border border-gray-300 p-2">Name</th>
                        <th className="border border-gray-300 p-2">Department</th>
                        <th className="border border-gray-300 p-2">Position</th>
                        <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors?.map((doctor) => (
                        <tr key={doctor.id}>
                            <td className="border border-gray-300 p-2">{doctor.id}</td>
                            <td className="border border-gray-300 p-2">{doctor.name}</td>
                            <td className="border border-gray-300 p-2">{doctor.department_id}</td>
                            <td className="border border-gray-300 p-2">{doctor.position}</td>
                            <td className="border border-gray-300 p-2">
                                <button
                                    onClick={() => handleEditDoctor(doctor.id)}
                                    className="bg-blue-500 text-white p-2 rounded mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteDoctor(doctor.id)}
                                    className="bg-red-500 text-white p-2 rounded"
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
};

export default DoctorsManagement;
