import React from 'react'

function TaskCount({ tasks }) {
  return (
    <div>
      <h1 className='text-2xl font-bold'>Tasks Count</h1>
      <p className='text-red-400 font-bold  text-xl'>{tasks.length}</p>
    </div>
  )
}

export default TaskCount