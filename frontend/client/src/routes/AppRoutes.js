import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { StyledToastContainer } from 'styles/notifcations';
import 'react-toastify/dist/ReactToastify.css';

import GlobalStyles from 'styles/global';
import HomePage from 'pages/Home/Home.page';
import LoginPage from 'pages/Login/Login.page';
import RegisterPage from 'pages/Register/Register.page';
import ModesPage from 'pages/Modes/Modes.page';
import UnknownPage from 'pages/Unknown/Unknown.page';
import { configPaths } from 'config/paths';

const AppRoutes = () => {
  const { theme } = useSelector((state) => state.toggle);

  return (
    <ThemeProvider theme={theme.mode}>
      <Router>
        <Routes>
          <Route path="*" element={<UnknownPage />} />
          <Route path={configPaths.home} element={<HomePage />} />
          <Route path={configPaths.modes} element={<ModesPage />} />
          <Route path={configPaths.login} element={<LoginPage />} />
          <Route path={configPaths.register} element={<RegisterPage />} />
        </Routes>
      </Router>
      <StyledToastContainer />
      <GlobalStyles />
    </ThemeProvider>
  );
};

export default AppRoutes;
