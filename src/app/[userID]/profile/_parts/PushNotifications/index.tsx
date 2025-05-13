import { ActivatePushNotification } from "../ActivatePushNotification"
import WeeklyPlanner from "./WeeklyPlanner";

const PushNotification = (): React.ReactElement => {
  return (
    <div>
      <ActivatePushNotification />
      <WeeklyPlanner />
    </div>
  )
}

export default PushNotification;