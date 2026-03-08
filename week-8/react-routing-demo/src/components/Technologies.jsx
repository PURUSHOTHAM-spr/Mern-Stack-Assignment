import React from 'react'
import { NavLink } from 'react-router'
import { Outlet } from 'react-router'

function Technologies() {
  return (
    <div className=''>
        <ul className='text-2xl flex justify-around p-10 '>
            <li>
                <NavLink to="java">Java</NavLink>
            </li>
            <li>
                <NavLink to="nodejs">nodejs</NavLink>
            </li>
            <li>
                <NavLink to="vue">Vue</NavLink>
            </li>
        </ul>
       <Outlet/>
    </div>
  )
}

export default Technologies