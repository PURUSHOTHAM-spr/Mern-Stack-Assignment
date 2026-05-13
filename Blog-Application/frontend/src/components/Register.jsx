import { useForm } from "react-hook-form";
import {
  pageBackground,
  formCard,
  formTitle,
  formGroup,
  labelClass,
  inputClass,
  submitBtn,
  errorClass,
  mutedText,
  divider,
} from "../styles/common";
import { NavLink } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const onUserRegister = async (newUser) => {
    setLoading(true);
    setError(null);
    try {
      // Create form data object
      const formData = new FormData();
      //get user object
      let { role, profilePic, ...userObj } = newUser;
      //add all fields except profilePic to FormData object
      Object.keys(userObj).forEach((key) => {
        formData.append(key, userObj[key]);
      });
      // add profilePic to Formdata object
      if (profilePic && profilePic[0]) {
        formData.append("profilePic", profilePic[0]);
      }

      let resObj;
      if (role === "user") {
        //make API req to user-api
        resObj = await axios.post("http://localhost:4000/user-api/users", formData);
      } else if (role === "author") {
        //make API req to author-api
        resObj = await axios.post("http://localhost:4000/author-api/users", formData);
      }

      if (resObj && resObj.status === 201) {
        //navigate to login
        navigate("/login");
      }
    } catch (err) {
      setError(
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className={`${pageBackground} flex items-center justify-center py-16 px-4`}>
      <div className={formCard}>
        {/* Title */}
        <h2 className={formTitle}>Create an Account</h2>
        {/* error message */}
        {error && <p className={errorClass}>{error}</p>}
        <form onSubmit={handleSubmit(onUserRegister)}>
          {/* Role Selection */}
          <div className="mb-5">
            <p className={labelClass}>Register as</p>
            <div className="flex gap-6 mt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  {...register("role", { required: "Please select a role" })}
                  id="user"
                  value="user"
                  className="accent-violet-600 w-4 h-4"
                />
                <span className="text-sm text-stone-700 font-medium">User</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  {...register("role", { required: "Please select a role" })}
                  id="author"
                  value="author"
                  className="accent-violet-600 w-4 h-4"
                />
                <span className="text-sm text-stone-700 font-medium">Author</span>
              </label>
            </div>
            {errors.role && (
              <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
            )}
          </div>

          <div className={divider} />

          {/* First & Last Name — side by side */}
          <div className="sm:flex gap-4 mb-4">
            <div className="flex-1">
              <label className={labelClass}>First Name</label>
              <input
                type="text"
                {...register("firstName", { required: "First name is required" })}
                placeholder="First name"
                className={inputClass}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
              )}
            </div>
            <div className="flex-1">
              <label className={labelClass}>Last Name</label>
              <input type="text" {...register("lastName")} placeholder="Last name" className={inputClass} />
            </div>
          </div>

          {/* Email */}
          <div className={formGroup}>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
              placeholder="you@example.com"
              className={inputClass}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className={formGroup}>
            <label className={labelClass}>Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              placeholder="Min. 6 characters"
              className={inputClass}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Profile Image */}
          <div className={formGroup}>
            <label className={labelClass}>Profile Image</label>
            <input
              type="file"
              accept="image/png, image/jpeg"
              {...register("profilePic")}
              onChange={(e) => {
                // call react-hook-form's onChange first
                register("profilePic").onChange(e);

                //get image file
                const file = e.target.files[0];
                // validation for image format
                if (file) {
                  if (!["image/jpeg", "image/png"].includes(file.type)) {
                    setError("Only JPG or PNG allowed");
                    return;
                  }
                  //validation for file size
                  if (file.size > 2 * 1024 * 1024) {
                    setError("File size must be less than 2MB");
                    return;
                  }
                  //Converts file → temporary browser URL(create preview URL)
                  const previewUrl = URL.createObjectURL(file);
                  setPreview(previewUrl);
                  setError(null);
                }
              }}
            />
            {preview && (
              <div className="mt-3 flex justify-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-full border"
                />
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className={submitBtn}
            disabled={loading}
            style={loading ? { opacity: 0.6, cursor: "not-allowed" } : {}}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Footer note */}
        <p className={`${mutedText} text-center mt-5`}>
          Already have an account?{" "}
          <NavLink to="/login" className="text-violet-600 hover:text-violet-500 font-medium">
            Sign in
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Register;