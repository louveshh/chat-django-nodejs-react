import { NavLink } from 'react-router-dom';

import ToggleLanguage from 'components/ToggleLanguage/ToggleLanguage.component';
import ToggleTheme from 'components/ToggleTheme/ToggleTheme.component';
import { configPaths } from 'config/paths';
import { useNavbar } from './navbar.hooks';
import { TrapezoidNavbar, WrapperNavbar, Triangle, StyledButton } from './navbar.styles';

const Navbar = () => {
  const { isAuthenticated, onClick } = useNavbar();

  return (
    <WrapperNavbar>
      <ToggleLanguage />
      <TrapezoidNavbar>
        {!isAuthenticated ? (
          <Triangle>
            <NavLink to={configPaths.login}>Login</NavLink>
          </Triangle>
        ) : (
          <Triangle>
            <NavLink to={configPaths.about}>About</NavLink>
          </Triangle>
        )}
        <Triangle>
          <NavLink to={configPaths.algorithms}>Algorithms</NavLink>
        </Triangle>
        {!isAuthenticated ? (
          <Triangle>
            <NavLink to={configPaths.login}>Register</NavLink>
          </Triangle>
        ) : (
          <Triangle>
            <StyledButton onClick={onClick} role="button" tabIndex="0" onKeyDown={() => {}}>
              Logout
            </StyledButton>
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
