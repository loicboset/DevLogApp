import { useEffect, useState } from 'react'

import Toggle from '@/components/ui/Toggle';
import InfoTooltip from '@/components/ui/tooltips/InfoTooltip';
import { useTogglePushNotification, useUserSettings } from '@/services/user_settings';

import usePushNotificationsManager from './PushNotifications/usePushNotificationManager';


export const ActivatePushNotification = (): React.ReactElement | null => {
  // STATE
  const [permission, setPermission] = useState<NotificationPermission | null>(null);
  console.log(' permission', permission);

  // RQ
  const { data: userSettings } = useUserSettings();
  const { mutate: togglePushNotification } = useTogglePushNotification();


  // HOOKS
  const { subscribeDevice } = usePushNotificationsManager();

  // EFFECTS
  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  // METHODS
  const grantPermission = (checked: boolean): void => {
    togglePushNotification({ is_push_notifications_active: checked });
    return;

    // togglePushNotification();

    Notification.requestPermission().then((perm) => {
      setPermission(perm);
      if (perm === 'granted') {
        // new Notification('You can receive notifications now!');
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.ready.then(async (registration) => {
            // console.log('registration.pushManager', registration.pushManager.subscribe());
            const sub = await registration.pushManager.getSubscription();
            if (sub) await sub.unsubscribe();
            // if (!pushSubscription) {
            console.log('subscribeDevice...')
            await subscribeDevice();
            // }
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
      <Toggle enabled={!!userSettings?.is_push_notifications_active} onChange={grantPermission} />
    </div>
  );
}
