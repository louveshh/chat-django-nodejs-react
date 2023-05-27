import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const useAlgorithms = () => {
  const navigate = useNavigate();
  
  const { isAuthenticated, loading, user } = useSelector(state => state.user);

  useEffect(()=>{
    if (!isAuthenticated && !loading)
		  return navigate('/login');
  },[isAuthenticated,loading,navigate])


  return { user, loading }
}