import React, { useState, useRef, useEffect } from 'react';

const Canvas= () => {
  const canvasRef = useRef(null);
  const [circlePoint, setCirclePoint] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Draw the circle on the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.arc(circlePoint.x, circlePoint.y, 10, 0, 2 * Math.PI);
    context.fillStyle = 'red';
    context.fill();
    context.closePath();
  }, [circlePoint]);

  const handleCanvasClick = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setCirclePoint({ x, y });
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        style={{ border: '1px solid black' }}
        onClick={handleCanvasClick}
      />
    </div>
  );
};

export default Canvas;