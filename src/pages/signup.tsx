import { useForm } from "react-hook-form";
import { userAPI } from "../features/users/UserApi";
import { Toaster, toast } from "sonner";

export default function SignupPage() {
  const [createUser] = userAPI.useCreateUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data:any) => {
    try {
      const formattedData = {
        full_name: data.fullName, // Ensure the key names match the API expectations
        email: data.email,
        password: data.password,
        contact_phone: data.phone,
      };
      
      await createUser(formattedData).unwrap();
      toast.success("you've been registered successfully");
      console.log("User Registered", formattedData);
      
     

    } catch (error) {
      toast.error("Registration failed");
      console.error("Registration failed", error);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f3f4f6" }}>
      <Toaster richColors   position="top-right" />
      <div style={{ width: "100%", maxWidth: "400px", padding: "20px", backgroundColor: "white", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "aqua", fontWeight: "bold" }}>
  Sign Up with Therapy Linker
</h2>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input
            type="text"
            {...register("fullName", { required: "Full Name is required" })}
            placeholder="Full Name"
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
          {errors.fullName && <span style={{ color: "red" }}>{String(errors.fullName.message)}</span>}
          
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="Email"
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
          {errors.email && <span style={{ color: "red" }}>{String(errors.email.message)}</span>}
          
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            placeholder="Password"
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
          {errors.password && <span style={{ color: "red" }}>{String(errors.password.message)}</span>}
          
          <input
            type="tel"
            {...register("phone", { required: "Phone number is required" })}
            placeholder="Phone Number"
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
          {errors.phone && <span style={{ color: "red" }}>{String(errors.phone.message)}</span>}
          
          <div className="flex justify-center"> 
  <button 
  
    className="bg-aqua text-white rounded-md px-4 py-2 w-1/2 cursor-pointer bg-blue-600 hover:bg-teal-500"
    type="submit"
  >
    Sign Up
  </button>
</div>
        </form>
      </div>
    </div>
  );
}
