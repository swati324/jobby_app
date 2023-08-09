import { NavLink } from 'react-router-dom'
import Cookies from 'js-cookie';
import './Navbar.css'

const Navbar = () => {
  const handleLogout = () => {
    Cookies.remove('jwt_token');
    window.location.href = '/login';
  };
  return (
    <div className="header-container">
      <div className="logo-container">
        <NavLink to="/Login">
          {' '}
          <img
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          />
        </NavLink>
      </div>
      <div>
        <nav className="nav-link">
          <NavLink
            to="/"
            style={({ isActive }) => ({
              color: isActive ? 'greenyellow' : 'white',
            })}
          >
            Home
          </NavLink>
          <NavLink
            to="/Job"
            style={({ isActive }) => ({
              color: isActive ? 'greenyellow' : 'white',
            })}
          >
            Job
          </NavLink>
        </nav>
      </div>
      <div>
        <button onClick={handleLogout} className="logoutbutton" type="button" >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar
