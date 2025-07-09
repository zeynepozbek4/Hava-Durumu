import React from "react";

interface WaterDropIconProps {
  percentage: number; // fill percentage
  color?: string; // optional color override
}

export const WaterDropIcon: React.FC<WaterDropIconProps> = ({
  percentage,
  color = "#CCDDE4",
}) => {
  const id = React.useMemo(
    () => `gradient-${Math.random().toString(36).substr(2, 9)}`,
    []
  );
  return (
    <svg viewBox="0 0 100 100">
      <defs>
        <clipPath id="drop-shape">
          <path d="M 50 2 C 0 50 16 96 51 96 C 85 96 101 49 50 2 Z" />
        </clipPath>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(60, 200, 255, 1)" />
          <stop offset="100%" stopColor="rgba(54, 47, 247, 1)" />
        </linearGradient>
      </defs>

      <rect
        x="0"
        y={100 - percentage}
        width="100"
        height={percentage}
        fill={`url(#${id})`}
        clipPath="url(#drop-shape)"
      >
        <animate
          attributeName="y"
          from="100"
          to={100 - percentage}
          dur="2s"
          begin="0.5s"
          fill="freeze"
          repeatCount="1"
          calcMode="spline"
          keySplines="0.25 0.1 0.25 1"
          keyTimes="0;1"
        />
      </rect>

      <path
        d="M 50 2 C 0 50 16 96 51 96 C 85 96 101 49 50 2 Z"
        fill={color}
        fillOpacity={0.3}
      />
    </svg>
  );
};
