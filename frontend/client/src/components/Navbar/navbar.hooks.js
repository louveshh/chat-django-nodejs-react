import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from 'store/slices/user';

export const useNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);
  const onClick = () => {
    dispatch(logout());
    setTimeout(() => {
      navigate('/dashboard');
    }, 3000);
  };
  return { isAuthenticated, onClick };
};
