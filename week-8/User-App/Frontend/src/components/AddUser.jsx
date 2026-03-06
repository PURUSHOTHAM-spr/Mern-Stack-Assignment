import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useState } from "react";

function AddUser() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    
    try {
      const res = await fetch("http://localhost:3000/user-api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();
      
      if (res.ok) {
        setSuccessMsg("✓ User added successfully!");
        reset();
        setTimeout(() => navigate("/userList"), 1500);
      } else {
        setErrorMsg(result.message || "Failed to add user");
      }
    } catch (error) {
      setErrorMsg("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Add New User</h2>

          {successMsg && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              {successMsg}
            </div>
          )}
          
          {errorMsg && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                  errors.name ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-indigo-500"
                }`}
                {...register("name", { 
                  required: "Name is required",
                  minLength: { value: 3, message: "Name must be at least 3 characters" },
                  maxLength: { value: 16, message: "Name must be at most 16 characters" }
                })}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                placeholder="example@email.com"
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                  errors.email ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-indigo-500"
                }`}
                {...register("email", { 
                  required: "Email is required",
                  pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address" }
                })}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Date of Birth Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth</label>
              <input
                type="date"
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                  errors.DOB ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-indigo-500"
                }`}
                {...register("DOB", { required: "Date of birth is required" })}
              />
              {errors.DOB && <p className="text-red-500 text-sm mt-1">{errors.DOB.message}</p>}
            </div>

            {/* Mobile Number Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number</label>
              <input
                type="tel"
                placeholder="1234567890"
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                  errors.mobileNumber ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-indigo-500"
                }`}
                {...register("mobileNumber", { 
                  required: "Mobile number is required",
                  pattern: { value: /^[0-9]{10}$/, message: "Mobile number must be 10 digits" }
                })}
              />
              {errors.mobileNumber && <p className="text-red-500 text-sm mt-1">{errors.mobileNumber.message}</p>}
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition"
              >
                {loading ? "Adding user..." : "Add User"}
              </button>
              <button
                type="button"
                onClick={() => reset()}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 rounded-lg transition"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddUser;