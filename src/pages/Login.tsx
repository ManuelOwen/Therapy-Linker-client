import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import { loginSucces } from "../features/auth/UserSlice";
import { loginAPI } from "../features/login/LoginAPI";
import Navbar from "../components/Navbar"; 


export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const from = location.state?.from || "/appointment"; // Default to "/" if no redirect location is provided

  const [loginUser] = loginAPI.useLoginUserMutation(); // Use the login mutation from the API

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    console.log("Form Data:", data); // Log form data for debugging
    try {
      const response = await loginUser(data).unwrap(); // Call the login API
      dispatch(
        loginSucces({
          user: response.user, // Ensure the correct user object is dispatched
          token: response.token, // Include the token if provided
        })
      );
      toast.success("Login successful!");
      console.log("User Logged In:", response);

      // Navigate to the redirect path after successful login
      navigate(from, { replace: true }); // Use `replace` to avoid adding to history stack
    } catch (error: any) {
      toast.error("Login failed. Please check your credentials.");
      console.error("Login failed:", error);
    }
  };

  return (
    <>  
    <Navbar />
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Toaster position="top-right" richColors />
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-teal-500 mb-4">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter your email"
            />
            {errors.email?.message && (
              <p className="text-red-500 text-sm mt-1">{String(errors.email?.message)}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{String(errors.password.message)}</p>}
          </div>
          <div className="flex justify-center"> 
  <button 
  
    className="bg-aqua text-white rounded-md px-4 py-2 w-1/2 cursor-pointer bg-blue-600 hover:bg-teal-500"
    type="submit"
  >
    Login
  </button>
</div>
        </form>
      </div>
    </div>
    </>
  );
}