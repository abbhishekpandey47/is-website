import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

export function StatusCard({ status, count, label }) {
  const statusColors = {
    approved: 'bg-approved text-approved-foreground',
    pending: 'bg-pending text-pending-foreground',
    rejected: 'bg-rejected text-rejected-foreground',
    live: 'bg-live text-live-foreground'
  };

  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-foreground">{count}</h3>
            <p className="text-muted-foreground text-sm">{label}</p>
          </div>
          <Badge 
            className={`${statusColors[status]} capitalize px-3 py-1 text-xs font-medium`}
          >
            {status}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}