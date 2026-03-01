import { CircleCheckBig, Clock, CircleX, Radio } from "lucide-react";

const statusConfig = {
  live: {
    iconColor: "text-[#34d399]",
    iconBg: "bg-[rgba(52,211,153,0.1)]",
    icon: CircleCheckBig,
  },
  underApproval: {
    iconColor: "text-[#fbbf24]",
    iconBg: "bg-[rgba(251,191,36,0.1)]",
    icon: Clock,
  },
  removed: {
    iconColor: "text-[#f87171]",
    iconBg: "bg-[rgba(248,113,113,0.1)]",
    icon: CircleX,
  },
  notPosted: {
    iconColor: "text-[#60a5fa]",
    iconBg: "bg-[rgba(96,165,250,0.1)]",
    icon: Radio,
  },
};

export function StatusCard({ status, count, label }) {
  const config = statusConfig[status] || statusConfig.live;
  const IconComponent = config.icon;

  return (
    <div className="group relative p-5 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] transition-all duration-200 hover:border-[rgba(255,255,255,0.12)] hover:bg-[rgba(255,255,255,0.03)]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[12px] font-medium uppercase tracking-[0.04em] text-[rgba(255,255,255,0.25)]">
            {label}
          </p>
          <p className="text-[28px] font-semibold text-[#ededed] mt-1.5 tracking-[-0.02em]" style={{ fontVariantNumeric: "tabular-nums" }}>
            {count}
          </p>
        </div>
        <div className={`flex items-center justify-center w-9 h-9 rounded-lg ${config.iconBg}`}>
          <IconComponent className={`w-[18px] h-[18px] ${config.iconColor}`} />
        </div>
      </div>
    </div>
  );
}
