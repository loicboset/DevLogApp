type UpsertUserSettings = {
  user_id: string;
  role?: string;
  experience?: number;
  goal?: string;
  mood_checks_enabled: boolean;
};

type EditIsPushNotificationActive = {
  is_push_notifications_active: boolean;
};

export type { UpsertUserSettings, EditIsPushNotificationActive };
