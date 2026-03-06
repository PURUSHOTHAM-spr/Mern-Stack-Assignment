import { useState } from "react";

function AddTaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Low");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title) {
      setError("Title is required");
      return;
    }

    if (title.length < 3) {
      setError("Title must be at least 3 characters");
      return;
    }

    const newTask = {
      title,
      priority,
      completed: false,
    };

    addTask(newTask);

    setTitle("");
    setPriority("Low");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Enter task title"
        className="border p-2 w-full mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <select
        className="border p-2 w-full mb-2"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Task
      </button>
    </form>
  );
}

export default AddTaskForm;