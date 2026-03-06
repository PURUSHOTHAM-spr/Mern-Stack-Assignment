import { useState,useRef} from "react";
import AddTaskForm from "./AddTaskForm";
import TaskList from "./TaskList";

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const idCounter = useRef(1);

  
const addTask = (taskData) => {
  const newTask = {
    id: idCounter.current,
    ...taskData,
  };

  idCounter.current += 1;

  setTasks([...tasks, newTask]);
};

  const taskStatus = (id) => {
    const updated = tasks.map((task) =>
      task.id === id? { ...task, completed: !task.completed }: task
    );
    setTasks(updated);
  };

const deleteTask = (id) => {
  let newTasks = [];

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id !== id) {
      newTasks.push(tasks[i]);
    }
  }

  setTasks(newTasks);
};

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

      <p className="mb-4">
        Total: {tasks.length} | Completed: {completedCount}
      </p>

      <AddTaskForm addTask={addTask} />

      <TaskList
        tasks={tasks}
        taskStatus={taskStatus}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default TaskManager;