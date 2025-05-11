import WeeklyPlanner from "@/components/collections/WeeklyPlanner";

import { ActivatePushNotification } from "../ActivatePushNotification"

const PushNotification = (): React.ReactElement => {
  return (
    <div>
      <ActivatePushNotification />
      <WeeklyPlanner />
    </div>
  )
}

export default PushNotification;