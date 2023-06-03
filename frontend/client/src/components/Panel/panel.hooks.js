import { useRef } from 'react';

export const usePanel = () => {
  const canvasRef = useRef(null);
  return { canvasRef };
};
