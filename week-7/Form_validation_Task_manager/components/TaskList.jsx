import React from 'react'

function TaskList({ tasks }) {
    //  if (tasks.length===0){
    //     return <p className='text-xl text-red-400'>Empty</p>

    //  }

  return (
    <div>
      <h3 className='text-2xl font-bold'>List Of Tasks</h3>
      { tasks.length===0 }? <p className='text-xl text-red-400'>Empty</p>
    
     
      {tasks.map((task, index) => (
        <p className='text-red-400 text-xl' key={index}>{task.TaskName}</p>
      ))
      }

    </div>
  )
}

export default TaskList


//if tasks list  empty then "empty" else iterate the list
//condition ? empty