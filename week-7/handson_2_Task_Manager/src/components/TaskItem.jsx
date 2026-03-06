function TaskItem({ task, taskStatus, deleteTask }) {
  return (
    <div className="border p-3 mb-2 rounded flex justify-between items-center">
      <div>
        <h3
          className={`font-bold ${task.completed ? "line-through text-gray-400" : ""}`}
        >
          {task.title}
        </h3>
        <p className="text-sm text-gray-600">
          Priority: {task.priority}
        </p>
      </div>

      <div className="space-x-2">
        <button
          onClick={() => taskStatus(task.id)}
          className="bg-green-500 text-white px-2 py-1 rounded">
          {task.completed ? "Undo" : "Complete"}
        </button>

        <button
          onClick={() => deleteTask(task.id)}
          className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
      </div>
    </div>
  );
}

export default TaskItem;