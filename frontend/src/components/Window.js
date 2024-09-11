import React, { useState } from 'react';
import './Window.css';

function Window({ title, children, onClose }) {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ width: 600, height: 400 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseDownDrag = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setMouseOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseDownResize = (e) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - mouseOffset.x,
        y: e.clientY - mouseOffset.y,
      });
    } else if (isResizing) {
      setSize({
        width: e.clientX - position.x,
        height: e.clientY - position.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  return (
    <div
      className="window"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="window-header" onMouseDown={handleMouseDownDrag}>
        <span>{title}</span>
        <button onClick={onClose}>X</button>
      </div>
      <div className="window-content">
        {children}
      </div>
      <div className="window-resizer" onMouseDown={handleMouseDownResize}></div>
    </div>
  );
}

export default Window;
