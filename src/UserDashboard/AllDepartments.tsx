import React, { useState } from "react";
import { Toaster, toast } from "sonner";
import { departmentsApi } from "../features/department/DepartmentAPI";

const AllDepartments: React.FC = () => {
  const { data: departments, isLoading, error, refetch } = departmentsApi.useGetDepartmentsQuery(undefined);
  const [createDepartment] = departmentsApi.useCreateDepartmentMutation();
  const [updateDepartment] = departmentsApi.useUpdateDepartmentMutation();
  const [deleteDepartment] = departmentsApi.useDeleteDepartmentMutation();

  const [formData, setFormData] = useState({
    id: null,
    department_name: "",
    description: "",
    icon: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddDepartment = async () => {
    if (!formData.department_name || !formData.description) {
      toast.error("Please fill in all required fields!");
      return;
    }

    try {
      await createDepartment({ ...formData, id: undefined }).unwrap();
      toast.success("Department added successfully!");
      refetch();
      resetForm();
    } catch (error) {
      console.error("Error adding department:", error);
      toast.error("Failed to add department. Please try again.");
    }
  };

  const handleEditDepartment = async () => {
    if (!formData.id) {
      toast.error("Invalid department ID!");
      return;
    }

    try {
      await updateDepartment(formData).unwrap();
      toast.success("Department updated successfully!");
      refetch();
      resetForm();
    } catch (error) {
      console.error("Error editing department:", error);
      toast.error("Failed to update department. Please try again.");
    }
  };

  const handleDeleteDepartment = async (id: number) => {
    try {
      await deleteDepartment(id).unwrap();
      toast.success("Department deleted successfully!");
      refetch();
    } catch (error) {
      console.error("Error deleting department:", error);
      toast.error("Failed to delete department. Please try again.");
    }
  };

  const handleEditButtonClick = (department: any) => {
    setFormData(department);
    setIsEditing(true);
  };

  const resetForm = () => {
    setFormData({ id: null, department_name: "", description: "", icon: "" });
    setIsEditing(false);
  };

  if (isLoading) return <p>Loading departments...</p>;
  if (error) return <p>Error fetching departments.</p>;

  return (
    <div className="p-4">
      <Toaster position="top-right" richColors />

      <h1 className="text-xl font-bold mb-4">All Departments</h1>

      <div className="mb-4 flex flex-wrap gap-2">
        {["department_name", "description"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field.replace("_", " ").toUpperCase()}
            value={formData[field as keyof typeof formData] || ""}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
        ))}

        <button
          onClick={isEditing ? handleEditDepartment : handleAddDepartment}
          className={`p-2 text-white rounded ${isEditing ? "bg-blue-500" : "bg-green-500"}`}
        >
          {isEditing ? "Update Department" : "Add Department"}
        </button>

        {isEditing && (
          <button onClick={resetForm} className="bg-gray-500 text-white p-2 rounded">
            Cancel
          </button>
        )}
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            {["ID", "Name", "Description", "Actions"].map((header) => (
              <th key={header} className="border border-gray-300 p-2">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {departments?.map((department: any) => (
            <tr key={department.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2">{department.id}</td>
              <td className="border border-gray-300 p-2">{department.department_name}</td>
              <td className="border border-gray-300 p-2">{department.description}</td>
              <td className="border border-gray-300 p-2 flex gap-2">
                <button
                  onClick={() => handleEditButtonClick(department)}
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteDepartment(department.id)}
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

export default AllDepartments;
