import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

function AddUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);

  let navigate = useNavigate();

  //form submit
  const onUserCreate = async (newUser) => {
    //console.log(newUser);
    setLoading(true);
    // make HTTP POST req to create new user
    try {
      let res = await fetch("http://localhost:3000/user-api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (res.status === 201) {
        //user created it shd navigate to users list
        navigate("/users-list");
      } else {
        console.log(res)
        throw new Error("error occurred");
      }
    } catch (err) {
      console.log(err)
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center text-red-500 text-3xl"> Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 text-3xl"> {error.message}</p>;
  }

  return (
    <div className="text-center">
      <h1 className="text-5xl font-bold text-[#1d1d1f] tracking-tight leading-none mb-2">Add New User</h1>
      {/* Create user form */}
      <form onSubmit={handleSubmit(onUserCreate)} className="bg-[#f5f5f7] rounded-2xl p-10 max-w-md mx-auto">
        <input type="text" {...register("name")} className="mb-5 border w-full text-2xl" placeholder="Name" />
        <input type="email" {...register("email")} className="mb-5 border w-full text-2xl" placeholder="Email" />
        <input
          type="date"
          {...register("dateOfBirth")}
          className="mb-5 border w-full text-2xl"
          placeholder="Date of birth"
        />
        <input
          type="number"
          {...register("mobileNumber")}
          className="mb-5 border w-full text-2xl"
          placeholder="Mobile number"
        />
        <button type="submit" className="bg-[#0066cc] text-white w-full font-semibold px-5 py-2 rounded-full hover:bg-[#004499] transition-colors cursor-pointer text-sm tracking-tight">
          Add User
        </button>
      </form>
    </div>
  );
}

export default AddUser;
