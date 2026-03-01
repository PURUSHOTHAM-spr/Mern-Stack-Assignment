import React, { useState } from 'react'
import AddTask from './AddTask'
import TaskList from './TaskList'
import TaskCount from './TaskCount'

function TaskManager() {

  const [tasks, setTasks] = useState([]);

  // Add new task
  const AddNewTask = (taskObj) => {
    setTasks([...tasks, taskObj]);
  }

  return (
    <div className='text-center'>
      <h1 className= 'text-4xl text-blue-400 font-bold '>Task Manager</h1>
       <div className='flex justify-center gap-15 mt-7'>
      <AddTask AddNewTask={AddNewTask} />
      <TaskCount tasks={tasks} />
      <TaskList tasks={tasks} />
      </div>

    </div>
  )
}

export default TaskManager