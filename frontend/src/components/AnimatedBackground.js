// src/components/AnimatedBackground.js
import React, { useEffect } from 'react';
import './AnimatedBackground.css';

function AnimatedBackground({ children }) {
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const matrixContainer = document.querySelector('.matrix');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    matrixContainer.appendChild(canvas);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    matrixContainer.appendChild(canvas);

    const columns = canvas.width / 20;
    const drops = Array(Math.floor(columns)).fill(0);

    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#00ff00';
      ctx.font = '20px monospace';
      
      drops.forEach((y, i) => {
        const text = String.fromCharCode(Math.floor(Math.random() * 128));
        ctx.fillText(text, i * 20, y);
        drops[i] = y > canvas.height || y > 10000 * Math.random() ? 0 : y + 20;
      });
    }

    const interval = setInterval(draw, 50);

    // Clean up on component unmount
    return () => {
      clearInterval(interval);
      matrixContainer.removeChild(canvas);
    };
  }, []);

  return (
    <div className="background-container">
      <div className="matrix"></div>
      <div className="wallpaper"></div>
      <div className="content">
         {children}
      </div>
    </div>
  );
}

export default AnimatedBackground;
