import { useState } from 'react';

function User({ user, onDelete, onUpdate }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    
    setIsDeleting(true);
    try {
      const res = await fetch(`http://localhost:3000/user-api/users/${user._id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        alert("User deleted successfully");
        onDelete();
      } else {
        alert("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Something went wrong");
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
      <div className="mb-4 pb-4 border-b-2 border-gray-200">
        <h3 className="text-xl font-bold text-gray-800">{user.name}</h3>
        <p className="text-gray-600 text-sm">{user.email}</p>
      </div>

      <div className="space-y-3 mb-6">
        <div>
          <p className="text-gray-500 text-sm font-semibold">Date of Birth</p>
          <p className="text-gray-700">{formatDate(user.DOB)}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm font-semibold">Mobile Number</p>
          <p className="text-gray-700">{user.mobileNumber}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm font-semibold">Status</p>
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
            user.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}>
            {user.isActive ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-semibold py-2 rounded-lg transition"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
        <button
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition"
          title="Edit functionality coming soon"
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default User;