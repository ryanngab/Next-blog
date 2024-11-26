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
import { AdblockDetector } from 'adblock-detector';

const AdblockDialog = () => {
  const [userHasAdblock, setUserHasAdblock] = useState(false);

  useEffect(() => {
    const adbDetector = new AdblockDetector();
    const adblockDetected = adbDetector.detect();
    setUserHasAdblock(adblockDetected);
  }, []);

  return (
    <AlertDialog open={userHasAdblock}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>AdBlock Detected</AlertDialogTitle>
          <AlertDialogDescription>
            Our website relies on ads to provide free services. Please disable
            your AdBlocker to continue.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setUserHasAdblock(false)}>
            Close
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <a
              href="https://support.google.com/chrome/answer/7632919?hl=en"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn More
            </a>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AdblockDialog;
