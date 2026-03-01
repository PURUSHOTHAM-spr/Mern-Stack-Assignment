import React from 'react'
import { useForm } from "react-hook-form"

function AddTask({ AddNewTask }) {

  const { register, handleSubmit, reset } = useForm();

  const onFormSubmit = (data) => {
    AddNewTask(data);   // send task to parent
    reset();
  }

  return (
    <div>
      <h1 className='text-4xl text-black-300'>Add Task</h1>

      <form onSubmit={handleSubmit(onFormSubmit)}>

        <input
          className='border-2 bg-gray-300 h-10 w-50 text-center' 
          type="text"
          placeholder="Task Name"
          {...register("TaskName", { required: true })}
        />

        <button className=" text-white bg-red-500 px-3 py-2 m-3 rounded-md"type="submit">Add Task</button>

      </form>
    </div>
  )
}

export default AddTask