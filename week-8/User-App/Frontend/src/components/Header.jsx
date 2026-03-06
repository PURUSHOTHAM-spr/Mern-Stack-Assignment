import { NavLink } from 'react-router'

function Header() {
  return (
    <div className='flex justify-between items-center px-10 shadow-md bg-green-100'>
      {/* Logo Section */}
      <img 
        className="h-16 p-2" 
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNtHcf8iUsoFoAYsnId87YIfeiXJP160lgmg&s" 
        alt="Logo" 
      />

      {/* Navigation Links */}
      <nav>
        <ul className='flex gap-10 p-4' >
            <li>
                <NavLink to="/" className={({isActive}) => isActive?"text-blue-400 bg-blue-200 p-3":""}>Home</NavLink>
            </li>
            

            <li>
                <NavLink to="addUser" className={({isActive}) => isActive?"text-blue-400 bg-blue-200 p-3":""}>AddUser</NavLink>
            </li>
            <li>
                <NavLink to="userList" className={({isActive}) => isActive?"text-blue-400 bg-blue-200 p-3":""}>UserList</NavLink>
            </li>
        </ul>
      </nav>
    </div>
  )
}

export default Header