'use client';

import { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';

export function ConnectionAlertDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const updateStatus = () => {
      const onlineStatus = navigator.onLine;
      setIsOnline(onlineStatus);
      setIsOpen(!onlineStatus); // Buka modal jika offline
    };

    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);

    // Periksa status awal saat komponen dimount
    updateStatus();

    return () => {
      window.removeEventListener('online', updateStatus);
      window.removeEventListener('offline', updateStatus);
    };
  }, []);

  const closeModal = () => setIsOpen(false);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Koneksi Terputus</AlertDialogTitle>
          <AlertDialogDescription>
            Kami mendeteksi bahwa koneksi internet Anda terputus. Periksa
            jaringan Anda dan coba lagi.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={closeModal}>OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
