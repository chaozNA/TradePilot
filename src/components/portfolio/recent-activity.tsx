import { Activity } from "@/lib/types/portfolio";
import { formatCurrency } from "@/lib/utils/utils";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils/DateTimeUtils";

interface RecentActivityProps {
  activities: Activity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  if (activities.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500 dark:text-gray-400">
        No recent activity
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
}

function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <Card className="rounded-lg bg-white p-4 shadow-sm hover:shadow-md dark:bg-gray-800">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white">
            {activity.type}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {activity.symbol} - {activity.qty} shares @{" "}
            {formatCurrency(activity.price)}
          </p>
        </div>
        <div className="text-right">
          <p className="font-medium text-gray-900 dark:text-white">
            {formatCurrency(activity.total)}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {formatDate(activity.timestamp)}
          </p>
        </div>
      </div>
    </Card>
  );
}
