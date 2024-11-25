'use client';
import React, { useEffect, useState } from 'react';
import Modal from './Modal';

const ConnectionDetector: React.FC = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const updateStatus = () => {
      setIsOnline(navigator.onLine);
      if (!navigator.onLine) {
        setShowModal(true);
      }
    };

    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);

    // Initial check
    updateStatus();

    return () => {
      window.removeEventListener('online', updateStatus);
      window.removeEventListener('offline', updateStatus);
    };
  }, []);

  const closeModal = () => setShowModal(false);

  return (
    <Modal
      isOpen={showModal}
      onClose={closeModal}
      message="Koneksi internet Anda terputus. Periksa kembali jaringan Anda."
    />
  );
};

export default ConnectionDetector;
