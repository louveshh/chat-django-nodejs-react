import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from 'styles/global';
import HomePage from 'pages/Home/Home.page';
import DashboardPage from 'pages/Dashboard/Dashboard.page';
import LoginPage from 'pages/Login/Login.page';
import RegisterPage from 'pages/Register/Register.page';
import AlgorithmsPage from 'pages/Algorithms/Algorithms.page';
import { checkAuth } from 'store/slices/user';
import { configPaths } from './config/paths';

const AppRoutes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const { theme } = useSelector((state) => state.toggle);

  return (
    <ThemeProvider theme={theme.mode}>
      <Router>
        <Routes>
          <Route path={configPaths.home} element={<HomePage />} />
          <Route path={configPaths.dashboard} element={<DashboardPage />} />
          <Route path={configPaths.algorithms} element={<AlgorithmsPage />} />
          <Route path={configPaths.login} element={<LoginPage />} />
          <Route path={configPaths.register} element={<RegisterPage />} />
        </Routes>
      </Router>
      <GlobalStyles />
    </ThemeProvider>
  );
};

export default AppRoutes;
