import {useEffect, useState} from 'react'
import {useNavigate} from "react-router"

const UsersList = () => {

    let [users,setUsers] = useState([]);
    const navigate = useNavigate();
    const goToUser = (userObj) => {
        navigate("/user",{state:{userObj:userObj}})
    }

    useEffect(()=>{
        async function getUsers() {
            let res = await fetch("http://localhost:3000/user-api/users")

            if(res.status === 200){
                let resObj = await res.json();

                setUsers(resObj.payload);
            }

        }

        getUsers();
    },[])

  return (
    <div className='w-full'>
      <h1 className='text-2xl bg-gray-400 font-bold'>Add new User</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-5 gap-10'>
        {
            users.map((userObj)=>{
                return (
                    <div onClick={() => goToUser(userObj)} className='shadow-lg p-2 cursor-pointer ' key={userObj.email}>
                        <h1 className=''>{userObj.email}</h1>
                        <h1>{userObj.name}</h1>
                    </div>
                )
            })
        }
      </div>
    </div>
  )
}

export default UsersList