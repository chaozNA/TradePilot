import { Activity } from "@/lib/entity/portfolio";
import { formatCurrency } from "@/lib/utils/PriceUtil";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils/DateTimeUtils";

interface RecentActivityProps {
  activities: Activity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  if (activities.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground">
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
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium">{activity.type}</h3>
          <p className="text-sm text-muted-foreground">
            {activity.symbol} - {activity.qty} shares @{" "}
            {formatCurrency(activity.price)}
          </p>
        </div>
        <div className="text-right">
          <p className="font-medium">{formatCurrency(activity.total)}</p>
          <p className="text-sm text-muted-foreground">
            {formatDate(activity.timestamp)}
          </p>
        </div>
      </div>
    </Card>
  );
}
