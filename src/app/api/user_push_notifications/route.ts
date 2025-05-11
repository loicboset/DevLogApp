import easyCron from "@/lib/easycron";
import { createClient } from "@/lib/supabase/server";
import { UpsertUserPushNotif } from "@/types/payload/user_push_notifications";

import toCron from "./_utils/toCron";

export async function GET(): Promise<Response> {
  const supabase = await createClient();

  const { data } = await supabase.from("user_push_notifications").select("*");

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  return new Response(JSON.stringify(data), { status: 200, headers });
}

export async function PUT(request: Request): Promise<Response> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const req = await request.json();
  const { days, time } = req as UpsertUserPushNotif;

  const cron_expression = toCron(days, time);

  const { data, status } = await easyCron.add(process.env.ENV_URL as string, cron_expression);

  if (![200, 201].includes(status) || !data?.cron_job_id) {
    throw new Error(`Failed to create cron job: ${data?.message}`);
  }

  const { error } = await supabase
    .from("user_push_notifications")
    .upsert({ user_id: user.id, cron_expression, cronjob_id: data.cron_job_id }, { onConflict: "cronjob_id" })
    .select();

  if (error) {
    return new Response("Error while creating push notif", { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}
