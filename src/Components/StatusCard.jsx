import { Card, CardContent } from "./ui/card";
import { CircleCheckBig, Clock, CircleX, Radio } from "lucide-react";

export function StatusCard({ status, count, label }) {
  const statusConfig = {
    approved: {
      bgColor: 'bg-success/10 hover:bg-success/15 border-success/20',
      textColor: 'text-success',
      icon: CircleCheckBig
    },
    pending: {
      bgColor: 'bg-warning/10 hover:bg-warning/15 border-warning/20',
      textColor: 'text-warning',
      icon: Clock
    },
    rejected: {
      bgColor: 'bg-destructive/10 hover:bg-destructive/15 border-destructive/20',
      textColor: 'text-destructive',
      icon: CircleX
    },
    live: {
      bgColor: 'bg-info/10 hover:bg-info/15 border-info/20',
      textColor: 'text-info',
      icon: Radio
    }
  };

  const config = statusConfig[status] || statusConfig.approved;
  const IconComponent = config.icon;

  return (
    <div className={`relative p-6 rounded-xl border backdrop-blur-sm transition-all duration-200 hover:shadow-lg hover:scale-[1.02] cursor-pointer ${config.bgColor}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground capitalize">{label}</p>
          <p className="text-3xl font-bold mt-2">{count}</p>
        </div>
        <div className="p-3 rounded-lg bg-background/50">
          <IconComponent className={`w-6 h-6 ${config.iconColor}`} />
        </div>
      </div>
    </div>
  );
}