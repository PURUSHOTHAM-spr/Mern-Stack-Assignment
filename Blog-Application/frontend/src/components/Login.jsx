import { useForm } from "react-hook-form";
import { useAuth } from "../store/useAuth.js";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import {toast} from "react-hot-toast"

const Login = () => {

  const { register, handleSubmit, formState:{errors} } = useForm();

  const login = useAuth((state) => state.login);
  const loading = useAuth((state) => state.loading);
  const error = useAuth((state) => state.error);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const currentUser = useAuth((state) => state.currentUser);
  
  const navigate = useNavigate();

  const submitHandler = (data) => {
    console.log(data)
    login(data);
  };

  useEffect(() => {

    if (isAuthenticated && currentUser) {

      if (currentUser.role === "AUTHOR") {
        navigate("/author-dash");
      }

      else if (currentUser.role === "USER") {
        toast.success("login successsfully")
        navigate("/user-dash");
      }

      else if (currentUser.role === "ADMIN") {
        navigate("/admin-dash");
      }

    }

  }, [isAuthenticated, currentUser,navigate]);

  return (
    <div className="p-20 text-center">

      <h1 className="text-2xl font-bold text-[#1d1d1f] tracking-tight mb-7">
        Login
      </h1>

      <form
        onSubmit={handleSubmit(submitHandler)}
        className="bg-gray-200 md:w-[450px] shadow rounded-2xl m-auto p-10 mt-5"
      >

        <div className="flex flex-col gap-2">

          <input
            {...register("email",{required:true})}
            className="bg-gray-400 rounded-xl p-2 text-center"
            type="email"
            placeholder="Email"
          />

          {errors.email && (
            <p className="text-red-600 text-sm">
              Email is required
            </p>
          )}

          <input
            {...register("password",{required:true,minLength:6})}
            className="bg-gray-400 rounded-xl p-2 text-center"
            type="password"
            placeholder="Password"
          />

          {errors.password && (
            <p className="text-red-600 text-sm">
              Password is required
            </p>
          )}

        </div>

        {error && (
          <p className="text-red-600 mt-3 text-sm">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-[300px] bg-[#0066cc] text-white font-semibold py-2.5 rounded-full hover:bg-[#004499] transition-colors cursor-pointer mt-4 text-sm tracking-tight"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>

    </div>
  );
};

export default Login;