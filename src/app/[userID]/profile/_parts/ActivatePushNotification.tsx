import { useEffect, useState } from 'react'

import Button from '@/components/ui/buttons/Button';

import usePushNotificationsManager from './PushNotifications/usePushNotificationManager';

export const ActivatePushNotification = (): React.ReactElement | null => {
  // STATE
  const [permission, setPermission] = useState<NotificationPermission | null>(null);
  console.log(' permission', permission);

  // HOOKS
  const { pushSubscription, subscribeDevice } =
    usePushNotificationsManager();

  // EFFECTS
  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  // METHODS
  const testNotification = (): void => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('Hello from a notification!');
        }
      });
    } else {
      console.log('test')
      new Notification('Hello from a notification!');
    }
  };

  const grantPermission = (): void => {
    Notification.requestPermission().then((perm) => {
      setPermission(perm);
      console.log('perm', perm);
      if (perm === 'granted') {
        // new Notification('You can receive notifications now!');
        console.log('condition', 'serviceWorker' in navigator)
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.ready.then(async (registration) => {
            console.log('registration', registration);
            // console.log('registration.pushManager', registration.pushManager.subscribe());
            // await registration.pushManager.getSubscription();
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

  return (
    <Button className="text-sm" onClick={testNotification}>
      Test
    </Button>
  );
}
