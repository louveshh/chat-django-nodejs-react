import { Link, NavLink } from "react-router-dom";
import { useNavbar } from './navbar.hooks';

const Navbar = () => {
  const { isAuthenticated, onClick } = useNavbar()

  const authLinks = (
    <>
      <li >
        <NavLink className="nav-link" to="/dashboard">
          Dashboard
        </NavLink>
      </li>
      <li >
      <div onClick={onClick}>
					Logout
				</div>
      </li>
    </>
  );
  const guestLinks = (
    <>
      <li>
        <NavLink className="nav-link" to="/login">
          Login
        </NavLink>
      </li>
      <li >
        <NavLink className="nav-link" to="/register">
          Register
        </NavLink>
      </li>
    </>
  );

  return (
    <nav>
      <Link to="/">
        Auth Site
      </Link>
      <div>
        <ul >
          <li >
            <NavLink  to="/">
              Home
            </NavLink>
          </li>
          {isAuthenticated ? authLinks : guestLinks}
        </ul>
      </div>
      -----------------------
    </nav>
  );
};

export default Navbar;
