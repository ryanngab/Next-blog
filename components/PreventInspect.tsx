'use client';
import { useEffect } from 'react';

const PreventInspect = () => {
  useEffect(() => {
    // Disable klik kanan
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    // Disable F12, Ctrl+U, dan Ctrl+Shift+I
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.key === 'u') ||
        (e.ctrlKey && e.shiftKey && e.key === 'i')
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return null; // Komponen ini hanya untuk logika, tidak merender apa pun
};

export default PreventInspect;
