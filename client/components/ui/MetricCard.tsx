import { LucideIcon, ArrowUp, ArrowDown } from 'lucide-react';

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down';
  color?: 'blue' | 'purple' | 'green' | 'cyan' | 'yellow' | 'red';
  size?: 'sm' | 'md' | 'lg';
}

const colorClasses = {
  blue: "from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-400",
  purple: "from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-400",
  green: "from-green-500/20 to-green-600/10 border-green-500/30 text-green-400",
  cyan: "from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 text-cyan-400",
  yellow: "from-yellow-500/20 to-yellow-600/10 border-yellow-500/30 text-yellow-400",
  red: "from-red-500/20 to-red-600/10 border-red-500/30 text-red-400",
};

const sizeClasses = {
  sm: {
    icon: "h-3 w-3",
    label: "text-[10px]",
    value: "text-lg",
    change: "text-[10px]",
    padding: "p-2",
  },
  md: {
    icon: "h-4 w-4",
    label: "text-xs",
    value: "text-xl",
    change: "text-xs",
    padding: "p-3",
  },
  lg: {
    icon: "h-5 w-5",
    label: "text-sm",
    value: "text-2xl",
    change: "text-sm",
    padding: "p-4",
  },
};

export default function MetricCard({
  icon: Icon,
  label,
  value,
  change,
  trend,
  color = 'blue',
  size = 'md',
}: MetricCardProps) {
  const sizes = sizeClasses[size];
  const colors = colorClasses[color];

  return (
    <div
      className={`group relative rounded-lg bg-gradient-to-br ${colors} border ${sizes.padding} transition-all duration-300 hover:scale-105 hover:shadow-lg`}
    >
      <div className={`flex items-center gap-1.5 ${size === 'sm' ? 'mb-1' : 'mb-2'}`}>
        <Icon className={sizes.icon} />
        <span className={`${sizes.label} font-medium text-slate-400`}>{label}</span>
      </div>
      <p className={`${sizes.value} font-bold text-white ${size === 'sm' ? 'mb-0.5' : 'mb-1'}`}>
        {value}
      </p>
      {change && trend && (
        <div className="flex items-center gap-1">
          {trend === "up" ? (
            <ArrowUp className={`${size === 'sm' ? 'h-2.5 w-2.5' : 'h-3 w-3'} text-green-400`} />
          ) : (
            <ArrowDown className={`${size === 'sm' ? 'h-2.5 w-2.5' : 'h-3 w-3'} text-red-400`} />
          )}
          <span className={`${sizes.change} font-semibold ${trend === "up" ? "text-green-400" : "text-red-400"}`}>
            {change}
          </span>
        </div>
      )}
    </div>
  );
}

