import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { configPaths } from 'config/paths';
import { useTranslation } from 'react-i18next';

export const useUnknown = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [counting, setCounting] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounting((prevCounting) => prevCounting - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (counting === 0) {
      navigate(configPaths.modes);
    }
  }, [counting, navigate]);

  return { counting, t };
};
