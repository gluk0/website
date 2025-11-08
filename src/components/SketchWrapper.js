import React, { useEffect, useRef } from 'react';
import canvasSketch from 'canvas-sketch';

const SketchWrapper = ({ sketch }) => {
  const canvasRef = useRef(null);
  const managerRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const settings = {
      dimensions: [800, 800],
      animate: true,
      canvas: canvasRef.current
    };

    const initSketch = async () => {
      if (managerRef.current) {
        managerRef.current.unload();
      }
      managerRef.current = await canvasSketch(sketch, settings);
    };

    initSketch();

    const intervalId = setInterval(() => {
      initSketch();
    }, 1000);

    return () => {
      clearInterval(intervalId);
      if (managerRef.current) {
        managerRef.current.unload();
      }
    };
  }, [sketch]);

  return <canvas ref={canvasRef} />;
};

export default SketchWrapper; 