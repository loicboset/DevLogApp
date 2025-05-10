import { useEffect, useState } from 'react'

import Button from '@/components/ui/buttons/Button';

import usePushNotificationsManager from './PushNotifications/usePushNotificationManager';

export const ActivatePushNotification = (): React.ReactElement | null => {
  // STATE
  const [permission, setPermission] = useState<NotificationPermission | null>(null);

  // HOOKS
  const { pushSubscription, subscribeDevice } =
    usePushNotificationsManager();

  // EFFECTS
  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const grantPermission = (): void => {
    Notification.requestPermission().then((perm) => {
      setPermission(perm);
      if (perm === 'granted') {
        new Notification('You can receive notifications now!');
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.ready.then(async (registration) => {
            await registration.pushManager.getSubscription();
            if (!pushSubscription) {
              await subscribeDevice();
            }
          });
        }
      }
    });
  };

  if (permission === 'default' || (permission === 'granted' && !pushSubscription)) {
    return (
      <Button className="text-sm" onClick={grantPermission}>
        Allow notifications
      </Button>
    );
  }

  if (permission === 'denied') {
    return (
      <p className="text-sm text-purple-600 sm:text-base">Notification permission denied. You can grant permissions from your browser settings.</p>
    );
  }

  return null
}
