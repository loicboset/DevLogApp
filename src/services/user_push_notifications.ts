import { useMutation, useQuery, useQueryClient, UseQueryResult, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";

import { UserSettings } from "@/types/api/user_settings";
import { UpsertUserPushNotif } from "@/types/payload/user_push_notifications";

// GET USER PUSH NOTIFICATIONS
const getuserPushNotifications = async (): Promise<UserSettings> => {
  const { data } = await axios.get(`/api/user_push_notifications`);
  return data;
};

const useUserPushNotifications = (): UseQueryResult<UserSettings, Error> => {
  return useQuery({ queryKey: ["user_push_notifications"], queryFn: () => getuserPushNotifications() });
};

// UPSERT USER PUSH NOTIFICATIONS
const upsertUserPushNotification = async (body: UpsertUserPushNotif): Promise<void> => {
  const { data } = await axios.put("/api/user_push_notifications", body);
  return data;
};

const useUpsertUserPushNotification = (): UseMutationResult<void, Error, UpsertUserPushNotif, unknown> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: upsertUserPushNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user_push_notifications"] });
    },
  });
};

export { useUserPushNotifications, useUpsertUserPushNotification };
