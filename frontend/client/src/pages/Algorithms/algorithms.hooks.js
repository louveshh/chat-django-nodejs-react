import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const useAlgorithms = () => {
  const navigate = useNavigate();
  
  const { isAuthenticated, loading, user } = useSelector(state => state.user);


  const activeMode =useSelector((state) => state.toggle.activeMode);

  // useEffect(()=>{
  //   if (!isAuthenticated && !loading)
	// 	  return navigate('/login');
  // },[isAuthenticated,loading,navigate])


  return { user, loading, activeMode }
}