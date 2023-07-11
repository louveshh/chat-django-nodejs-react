import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';
import { resetRegistered } from 'store/slices/user/user';
import { login } from 'store/slices/user/userAsync';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { loading, isAuthenticated, registered } = useSelector(
    (state) => state.user
  );

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const updateRegistered = useCallback(() => {
    dispatch(resetRegistered());
  }, [dispatch]);

  const updateLogin = useCallback(
    (payload) => {
      dispatch(login(payload));
    },
    [dispatch]
  );

  useEffect(() => {
    if (registered) {
      updateRegistered();
    }
    return () => {};
  }, [registered, dispatch, updateRegistered]);

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    updateLogin({ email, password });
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return {
    handleOnSubmit,
    handleOnChange,
    t,
    email: formData.email,
    password: formData.password,
    loading,
  };
};
