import { NavLink } from 'react-router-dom';
import { useNavbar } from './navbar.hooks';
import { TrapezoidNavbar, WrapperNavbar, Triangle } from './navbar.styles';
import ToggleLanguage from './../ToggleLanguage/ToggleLanguage.component';
import ToggleTheme from './../ToggleTheme/ToggleTheme.component';

const Navbar = () => {
  const { isAuthenticated, onClick } = useNavbar();

  return (
    <WrapperNavbar>
      <ToggleLanguage />
      <TrapezoidNavbar>
        {!isAuthenticated ? (
          <Triangle>
            <NavLink to="/login">Login</NavLink>
          </Triangle>
        ) : (
          <Triangle>
            <NavLink to="/about">About</NavLink>
          </Triangle>
        )}
        <Triangle>
          <NavLink to="/algorithms">Algorithms</NavLink>
        </Triangle>
        {!isAuthenticated ? (
          <Triangle>
            <NavLink to="/login">Register</NavLink>
          </Triangle>
        ) : (
          <Triangle>
            <div
              onClick={onClick}
              role="button"
              tabIndex="0"
              onKeyDown={() => {}}
            >
              <div>Logout</div>
            </div>
          </Triangle>
        )}
      </TrapezoidNavbar>
      <ToggleTheme />
    </WrapperNavbar>
  );
};

export default Navbar;

// const Navbar = () => {
//   const { isAuthenticated, onClick } = useNavbar();

//   return (
//     <nav className="wrapper-navbar">
//       <div className="trapezoid-navbar">
//         {!isAuthenticated ? (
//           <NavLink className="triangle" to="/login">
//             Login
//           </NavLink>
//         ) : (
//           <NavLink className="triangle" to="/about">
//             About
//           </NavLink>
//         )}
//         <NavLink className="triangle" to="/algorithms">
//           Algorithms
//         </NavLink>
//         {!isAuthenticated ? (
//           <NavLink className="triangle" to="/login">
//             Register
//           </NavLink>
//         ) : (
//           <div className="triangle">
//             <div
//               onClick={onClick}
//               role="button"
//               tabIndex="0"
//               onKeyDown={() => {}}
//             >
//               <div>Logout</div>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };
