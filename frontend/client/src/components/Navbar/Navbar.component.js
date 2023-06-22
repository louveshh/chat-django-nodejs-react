import ToggleLanguage from 'components/ToggleLanguage/ToggleLanguage.component';
import ToggleTheme from 'components/ToggleTheme/ToggleTheme.component';
import { configPaths } from 'config/paths';
import { useNavbar } from './navbar.hooks';
import {
  TrapezoidNavbar,
  WrapperNavbar,
  Triangle,
  StyledButton,
  StyledNavLink,
} from './navbar.styles';

const Navbar = () => {
  const { isAuthenticated, t, onClick } = useNavbar();

  return (
    <WrapperNavbar>
      <ToggleLanguage />
      <TrapezoidNavbar>
        {!isAuthenticated ? (
          <Triangle>
            <StyledNavLink to={configPaths.login}>
              {t('navbar.login')}
            </StyledNavLink>
          </Triangle>
        ) : (
          <Triangle>
            <StyledNavLink to={configPaths.about}>
              {t('navbar.about')}
            </StyledNavLink>
          </Triangle>
        )}
        <Triangle>
          <StyledNavLink to={configPaths.algorithms}>
            {t('navbar.maps')}
          </StyledNavLink>
        </Triangle>
        {!isAuthenticated ? (
          <Triangle>
            <StyledNavLink to={configPaths.login}>
              {t('navbar.register')}
            </StyledNavLink>
          </Triangle>
        ) : (
          <Triangle>
            <StyledButton
              onClick={onClick}
              role="button"
              tabIndex="0"
              onKeyDown={() => {}}
            >
              {t('navbar.logout')}
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
//           <StyledNavLink className="triangle" to="/login">
//             Login
//           </StyledNavLink>
//         ) : (
//           <StyledNavLink className="triangle" to="/about">
//             About
//           </StyledNavLink>
//         )}
//         <StyledNavLink className="triangle" to="/algorithms">
//           Algorithms
//         </StyledNavLink>
//         {!isAuthenticated ? (
//           <StyledNavLink className="triangle" to="/login">
//             Register
//           </StyledNavLink>
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
