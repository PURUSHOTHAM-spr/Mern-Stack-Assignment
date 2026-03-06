import { useEffect, useState } from "react";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const res = await fetch("http://localhost:3000/user-api/users", {
          method: "GET"
        });

        const data = await res.json();
        setUsers(data);

      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    getUsers();
  }, []);

  return (
    <div>
      <h1 className="text-5xl text-gray-300">List of Users</h1>

      {users && users.usersList && users.usersList.map((user, index) => (
        <div key={index}>
          <p>{user.name}</p>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}

export default UserList;