
import { NavLink } from 'react-router'
import logo from '../assets/logo.jpeg'

function Header() {
  return (
    <div className='flex justify-between items-center px-10 bg-blue-300'>
        <img src={logo} alt="Company Logo" className="h-12 w-auto" />
        <nav>
            <ul className='text-xl flex flex-row gap-5 p-3 mt-4'>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="register">Register</NavLink>

                </li>
                <li>
                   <NavLink to="login">Login</NavLink>
                </li>
                <li>
                    <NavLink to="technologies">Technlogies</NavLink>
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default Header