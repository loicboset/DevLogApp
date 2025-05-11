'use client';

import { useState } from 'react';

import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type Reminder = {
  time: string;
};

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const WeeklyPlanner = (): React.ReactElement => {
  // TODO: use persisted state for reminders instead of useState - handle reminders model?
  // TODO: implement logic to send push notifications at the time set by the reminders in the weekly planner
  // TODO: improve UX
  const [reminders, setReminders] = useState<Record<string, Reminder[]>>({});
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [pickerTime, setPickerTime] = useState<Date | null>(null);
  const [showPickerFor, setShowPickerFor] = useState<string | null>(null);
  const [editingReminder, setEditingReminder] = useState<{ day: string; index: number } | null>(null);

  const handleAddReminder = (day: string): void => {
    if (pickerTime) {
      const formattedTime = pickerTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      setReminders(prev => {
        const current = [...(prev[day] || [])];

        if (editingReminder && editingReminder.day === day) {
          // Edit mode
          current[editingReminder.index] = { time: formattedTime };
        } else {
          // Add mode
          if (current.length >= 3) return prev;
          current.push({ time: formattedTime });
        }

        return { ...prev, [day]: current };
      });

      setPickerTime(null);
      setShowPickerFor(null);
      setSelectedDay(null);
      setEditingReminder(null);
    }
  };

  const handleEditReminder = (day: string, index: number): void => {
    const reminder = reminders[day]?.[index];
    if (!reminder) return;

    const [hours, minutes] = reminder.time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);

    setPickerTime(date);
    setShowPickerFor(day);
    setSelectedDay(day);
    setEditingReminder({ day, index });
  };

  const handleDeleteReminder = (day: string, index: number): void => {
    setReminders(prev => {
      const updated = [...(prev[day] || [])];
      updated.splice(index, 1);
      return { ...prev, [day]: updated };
    });
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 space-y-4">
      <h1 className="text-xl font-semibold flex-1">My Weekly Planner</h1>
      {daysOfWeek.map(day => {
        const dayReminders = reminders[day] || [];
        const reachedLimit = dayReminders.length >= 3 && !editingReminder;

        return (
          <div key={day} className={`flex flex-col border rounded p-4 shadow-sm ${selectedDay === day ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <button
                disabled={reachedLimit}
                onClick={() => {
                  setShowPickerFor(day);
                  setSelectedDay(day);
                  setEditingReminder(null);
                }}
                className={`rounded-full w-8 h-8 text-white flex items-center justify-center mr-2 ${
                  reachedLimit ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                +
              </button>
              <h3 className="text-lg font-semibold flex-1">{day}</h3>
              <span className="text-sm text-gray-600">{dayReminders.length}/3</span>
            </div>

            {/* Reminder List */}
            <div className="mt-2 space-y-1">
              {dayReminders.map((reminder, index) => (
                <div key={index} className="text-sm text-gray-700 bg-white px-3 py-1 rounded flex items-center justify-start gap-2 max-w-40">
                  <span>⏰ {reminder.time}</span>
                  <div className="flex-1 flex items-center gap-2">
                    <PencilIcon
                      className="h-4 w-4 text-gray-500 cursor-pointer hover:text-gray-700"
                      onClick={() => handleEditReminder(day, index)}
                    />
                    <TrashIcon
                      className="h-4 w-4 text-gray-500 cursor-pointer hover:text-gray-700"
                      onClick={() => handleDeleteReminder(day, index)}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Date Picker */}
            {showPickerFor === day && (
              <div className="mt-2 flex items-center gap-2">
                <DatePicker
                  selected={pickerTime}
                  onChange={(date: Date | null) => setPickerTime(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="HH:mm"
                  className="border p-2 rounded"
                  inline
                />
                <button
                  onClick={() => handleAddReminder(day)}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  disabled={!pickerTime}
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setShowPickerFor(null);
                    setSelectedDay(null);
                    setPickerTime(null);
                    setEditingReminder(null);
                  }}
                  className="bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default WeeklyPlanner;
