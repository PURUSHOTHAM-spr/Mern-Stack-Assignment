import TaskItem from "./TaskItem";

function TaskList({ tasks, taskStatus, deleteTask }) {
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          taskStatus={taskStatus}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
}

export default TaskList;