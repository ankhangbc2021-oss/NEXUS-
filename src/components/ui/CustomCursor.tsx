'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (cursorRef.current) {
      cursorRef.current.style.left = `${e.clientX - 10}px`;
      cursorRef.current.style.top = `${e.clientY - 10}px`;
    }
    if (dotRef.current) {
      dotRef.current.style.left = `${e.clientX - 2}px`;
      dotRef.current.style.top = `${e.clientY - 2}px`;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    const interactiveElements = document.querySelectorAll('a, button, .magnetic-btn, [data-cursor-hover]');
    
    const handleEnter = () => setIsHovering(true);
    const handleLeave = () => setIsHovering(false);

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, [handleMouseMove]);

  return (
    <>
      <div ref={cursorRef} className={`custom-cursor ${isHovering ? 'hovering' : ''}`} />
      <div ref={dotRef} className="custom-cursor-dot" />
    </>
  );
}
