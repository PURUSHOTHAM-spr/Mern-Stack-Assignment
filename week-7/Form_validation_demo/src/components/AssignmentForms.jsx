import { useForm } from "react-hook-form"
import { useState } from "react"

function AssignmentForms() {

  const { register, handleSubmit, reset, formState:{ errors } } = useForm();
  const [users, setUsers] = useState([]);

  const submitForm = (data) => {
    setUsers([...users, data]);
    reset();
  }

  setError("DOB",{
    type:"manual",
    message:"the date not after 2020"
  })
  //

  return(

    <div className="flex flex-col md:flex-column gap-8">

      {/* making two cards to represent */}
      <div className="bg-pink-400 w-[400px] p-6">

        <h1 className="text-2xl font-bold text-center mb-4">
          User Registration Form
        </h1>

        <form onSubmit={handleSubmit(submitForm)}>

          <div className="mb-3">
            <input
              className="border bg-gray-300 w-full p-2 rounded"
              type="text"
              placeholder="Firstname"
              {...register("Firstname", { required: true, minLength: 3 })}
            />
            {errors.Firstname && (
              <p className="text-red-600 text-sm mt-1">
                First name must be at least 3 characters
              </p>
            )}
          </div>

          <div className="mb-3">
            <input
              className="border bg-gray-300 w-full p-2 rounded"
              type="text"
              placeholder="Lastname"
              {...register("Lastname", { required: true, minLength: 3 })}
            />
            {errors?.Lastname && (
              <p className="text-red-600 text-sm mt-1">
                Last name must be at least 3 characters
              </p>
            )}
          </div>

          <div className="mb-3">
            <input
              className="border bg-gray-300 w-full p-2 rounded"
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
            />
          </div>

          <div className="mb-4">
            <input
              className="border bg-gray-300 w-full p-2 rounded" type="date"{...register("DOB", 
                { required: true,

                })}
            />
             {errors?.DOB && (<p className="text-red-600 text-sm mt-1">date must be below 2026</p>)}
          </div>

          <button
            className="bg-yellow-500 py-2 px-5 rounded-md text-white hover:bg-yellow-600 w-full"
            type="submit"
          >
            Submit
          </button>

        </form>
      </div>


      {/*  this is card 2 of table */}
      <div className="bg-pink-500 w-[700px] p-6  overflow-auto">

        <h2 className="text-xl font-bold mb-4 text-center">
          List Of Users
        </h2>


        
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Firstname</th>
                <th className="border p-2">Lastname</th>
                <th className="border p-2">Email</th>
              </tr>
            </thead>

            <tbody>
              {users.map((userObj, index) => (
                <tr key={index} className="text-center">
                  <td className="border p-2">{userObj.Firstname}</td>
                  <td className="border p-2">{userObj.Lastname}</td>
                  <td className="border p-2">{userObj.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        

      </div>

    </div>
  )
}

export default AssignmentForms;