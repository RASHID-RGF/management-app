import { motion } from "framer-motion";
import { useMemo } from "react";

interface MiniChartProps {
  data: number[];
  color?: string;
  height?: number;
}

export function MiniChart({ data, color = "hsl(var(--primary))", height = 40 }: MiniChartProps) {
  const points = useMemo(() => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const w = 100 / (data.length - 1);
    return data
      .map((v, i) => `${i * w},${height - ((v - min) / range) * (height - 8)}`)
      .join(" ");
  }, [data, height]);

  const areaPoints = `0,${height} ${points} 100,${height}`;
  const gradientId = `chartGrad-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg viewBox={`0 0 100 ${height}`} className="w-full h-full overflow-visible" preserveAspectRatio="none">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.4} />
          <stop offset="90%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <motion.polygon
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
        points={areaPoints}
        fill={`url(#${gradientId})`}
        className="origin-bottom"
      />
      <motion.polyline
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      {/* Glow effect line */}
      <motion.polyline
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.3 }}
        transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        className="blur-sm"
      />
    </svg>
  );
}
