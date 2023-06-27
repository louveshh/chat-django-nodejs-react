import ToggleLanguage from 'components/ToggleLanguage/ToggleLanguage.component';
import ToggleTheme from 'components/ToggleTheme/ToggleTheme.component';
import { configPaths } from 'config/paths';
import { useNavbar } from './navbar.hooks';
import {
  TrapezoidNavbar,
  WrapperNavbar,
  StyledButton,
  StyledNavLink,
} from './navbar.styles';

const Navbar = () => {
  const { isAuthenticated, isActive, t, onClick } = useNavbar();
  return (
    <WrapperNavbar>
      <ToggleLanguage />
      <TrapezoidNavbar>
        {!isAuthenticated ? (
          <StyledNavLink
            to={configPaths.login}
            isActive={isActive(configPaths.login)}
          >
            {t('navbar.login')}
          </StyledNavLink>
        ) : (
          <StyledNavLink
            to={configPaths.about}
            isActive={isActive(configPaths.about)}
          >
            {t('navbar.about')}
          </StyledNavLink>
        )}

        <StyledNavLink
          to={configPaths.algorithms}
          isActive={isActive(configPaths.algorithms)}
        >
          {t('navbar.maps')}
        </StyledNavLink>

        {!isAuthenticated ? (
          <StyledNavLink
            to={configPaths.register}
            isActive={isActive(configPaths.register)}
          >
            {t('navbar.register')}
          </StyledNavLink>
        ) : (
          <StyledButton
            onClick={onClick}
            role="button"
            tabIndex="0"
            onKeyDown={() => {}}
          >
            {t('navbar.logout')}
          </StyledButton>
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
