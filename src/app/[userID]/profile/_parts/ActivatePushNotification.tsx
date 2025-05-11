import { useEffect, useState } from 'react'

import Toggle from '@/components/ui/Toggle';
import InfoTooltip from '@/components/ui/tooltips/InfoTooltip';

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

  // if (permission === 'default' || (permission === 'granted' && !pushSubscription)) {
  //   return (
  //     <Button className="text-sm" onClick={grantPermission}>
  //       Allow notifications
  //     </Button>
  //   );
  // }

  // if (permission === 'denied') {
  //   return (
  //     <p className="text-sm text-purple-600 sm:text-base">Notification permission denied. You can grant permissions from your browser settings.</p>
  //   );
  // }

  return (
    <div className='flex justify-between max-w-2xl'>
      <div className='flex'>
        <span className="block text-sm/6 font-medium text-white">
          Reminders
        </span>
        <InfoTooltip message='Never forget to journal by receiving reminders at the time that suits you best.' />
      </div>
      <Toggle state={true} toggleSwitch={grantPermission} />
    </div>
  );
}
