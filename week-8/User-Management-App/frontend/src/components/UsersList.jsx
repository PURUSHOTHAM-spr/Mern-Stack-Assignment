import { useEffect, useState } from "react";
import {useNavigate} from 'react-router'

function UsersList() {
  let [users, setUsers] = useState([]);
  let navigate=useNavigate()

  useEffect(() => {
    async function getUsers() {
      try {
        let res = await fetch("https://user-management-app-1-kc19.onrender.com/user-api/users", {
          method: "GET",
        });

        if (res.status === 200) {
          //extract json data
          let resObj = await res.json();
          //update the state
          setUsers(resObj.payload);
        } else {
        }
      } catch (err) {
        //set error
      }
    }

    getUsers();
  }, []);


  //go to user
  const gotoUser=(userObj)=>{
    navigate("/user",{state:{user:userObj}})
  }

  return (
    <div>
      <h1 className="text-5xl font-bold text-[#1d1d1f] tracking-tight leading-none mb-2">List of Users</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  bg-[#e8e8ed] border border-[#e8e8ed] rounded-2xl overflow-hidden p-3 m-5 gap-12">
        {users?.map((userObj) => (
          <div key={userObj.email} className="p-10 shadow-2xl cursor-pointer" onClick={()=>gotoUser(userObj)}>
            <p className="text-3xl">{userObj.name}</p>
            <p className="text-lg break-all">{userObj.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UsersList;
