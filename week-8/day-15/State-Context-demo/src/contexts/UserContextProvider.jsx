import React, { useState } from 'react'
import { UserContext } from './UserContext'

function UserContextProvider({children}) {
    //we have to provide state
    const [user1,setUser]=useState(
        {
            name:"spr",
            age:20,
            email:"spr@gmail.com"

        }
       
       );

    //function to modify state
    const changeUser1=()=>{
       setUser(
        {
            name:"ravi",
            age:20,
            email:"spr@gmail.com"

        }
       )
    }
  return (
    <UserContext.Provider value={{changeUser1,user1}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider