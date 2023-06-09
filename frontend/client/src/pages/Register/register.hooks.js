/* eslint-disable camelcase */
import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from 'store/slices/user/userAsync';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const useRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isAuthenticated, loading, registered } = useSelector(
    (state) => state.user
  );

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });
  const sendRegister = useCallback(
    (payload) => {
      dispatch(register(payload));
    },
    [dispatch]
  );

  const { first_name, last_name, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    sendRegister({ first_name, last_name, email, password });
  };

  useEffect(() => {
    if (isAuthenticated || registered) {
      navigate('/login');
    }
    return () => {};
  }, [isAuthenticated, registered, navigate]);
  return {
    onSubmit,
    onChange,
    t,
    first_name,
    last_name,
    email,
    password,
    loading,
  };
};
