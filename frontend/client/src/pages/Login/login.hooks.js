import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (registered) dispatch(resetRegistered());
    return () => {};
  }, [registered, dispatch]);

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return { onSubmit, onChange, t, email, password, loading };
};
