import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from './styles/global';
import HomePage from './pages/Home/Home.page';
import DashboardPage from './pages/Dashboard/Dashboard.page';
import LoginPage from './pages/Login/Login.page';
import RegisterPage from './pages/Register/Register.page';
import { checkAuth } from './store/slices/user';
import AlgorithmsPage from './pages/Algorithms/Algorithms.page';

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
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/algorithms" element={<AlgorithmsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
      <GlobalStyles />
    </ThemeProvider>
  );
};

export default AppRoutes;
