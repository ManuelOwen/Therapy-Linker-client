
import { userAPI } from "../features/users/UserApi";

interface User {
  id: number;
  full_name: string;
  email: string;
  role: string;
}

function Allusers() {
  const { data: users, isLoading, error } = userAPI.useGetUsersQuery({});

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Error fetching users.</p>;

  return (
    <div>
      <h1>All Users</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            {["ID", "Full Name", "Email", "Role"].map((header) => (
              <th key={header} className="border border-gray-300 p-2">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users?.map((user:any) => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2">{user.id}</td>
              <td className="border border-gray-300 p-2">{user.full_name}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Allusers;