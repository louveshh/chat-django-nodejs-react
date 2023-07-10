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
            $isActive={isActive(configPaths.login)}
          >
            {t('navbar.login')}
          </StyledNavLink>
        ) : (
          <StyledNavLink
            to={configPaths.home}
            $isActive={isActive(configPaths.home)}
          >
            {t('navbar.home')}
          </StyledNavLink>
        )}

        <StyledNavLink
          to={configPaths.modes}
          $isActive={isActive(configPaths.modes)}
        >
          {t('navbar.maps')}
        </StyledNavLink>

        {!isAuthenticated ? (
          <StyledNavLink
            to={configPaths.register}
            $isActive={isActive(configPaths.register)}
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
