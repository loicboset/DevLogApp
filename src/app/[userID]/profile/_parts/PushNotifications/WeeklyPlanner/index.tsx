'use client';

import { useEffect, useState } from 'react';

import './index.css';

import { useUpsertUserPushNotification, useUserPushNotifications } from '@/services/user_push_notifications';

const weekDays = [
  { name: 'Monday', short: 'M', index: 1 },
  { name: 'Tuesday', short: 'T', index: 2 },
  { name: 'Wednesday', short: 'W', index: 3 },
  { name: 'Thursday', short: 'T', index: 4 },
  { name: 'Friday', short: 'F', index: 5 },
  { name: 'Saturday', short: 'S', index: 6 },
  { name: 'Sunday', short: 'S', index: 7 },
]

const WeeklyPlanner = (): React.ReactElement => {
  // STATE
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>('18:00');

  // RQ
  const { data: pushNotifications = [] } = useUserPushNotifications();
  const { mutate: upsertPushNotif } = useUpsertUserPushNotification();

  // EFFECTS
  useEffect(() => {
    if (selectedDays.length === 0 || !selectedTime) return;

    upsertPushNotif({ days: selectedDays, time: selectedTime })
  }, [selectedDays, selectedTime, upsertPushNotif]);

  useEffect(() => {
    if (pushNotifications.length === 0) return;

    const { cron_expression } = pushNotifications[0]; // we handle only one push notification per user for now
    const [minutes, hour, , , days] = cron_expression.split(' ');

    setSelectedDays(days.split(',').map((day) => weekDays.find((w) => w.index === Number(day))?.name || ''));
    setSelectedTime(`${hour.padStart(2, '0')}:${minutes.padStart(2, '0')}`);
  }, [pushNotifications]);

  // METHODS
  const handleDayClick = (day: string): void => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  return (
    <form className='flex justify-between items-center mt-4 flex-wrap'>
      <div className='flex space-x-2'>
        {weekDays.map((day) => (
          <span
            key={day.name}
            onClick={() => handleDayClick(day.name)}
            className={`
              inline-flex size-7 items-center justify-center rounded-full
              text-white border border-gray-50
              hover:bg-indigo-600  font-medium cursor-pointer
              ${selectedDays.includes(day.name) ? 'bg-indigo-600' : 'bg-gray-500'}
            `}
          >
            <span className="text-xs font-medium text-white">{day.short}</span>
          </span>
        ))}
      </div>
      <input
        type="time"
        className='bg-gray-900 text-gray-50 text-xs px-2 py-1 border border-white rounded-2xl'
        value={selectedTime}
        onChange={(e) => setSelectedTime(e.target.value)}
      />
    </form>
  )
}

export default WeeklyPlanner;
