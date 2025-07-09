import React from "react";

interface CloudIconProps {
  percentage: number; // fill percentage
  color?: string; // optional color override
}

export const CloudIcon: React.FC<CloudIconProps> = ({
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
        <clipPath id="cloud-shape">
          <path d="M20 65 Q15 50 30 45 Q35 30 50 35 Q65 25 70 45 Q85 50 80 65 Q70 75 50 75 Q30 75 20 65 Z" />
        </clipPath>
        <radialGradient id={id}>
          <stop offset="0%" stopColor="rgb(93, 91, 91)" />
          <stop offset="100%" stopColor="rgb(255, 255, 255)" />
        </radialGradient>
      </defs>

      <rect
        x="0"
        y="0"
        width={percentage + 10}
        height="100"
        fill={`url(#${id})`}
        clipPath="url(#cloud-shape)"
      >
        <animate
          attributeName="width"
          from="0"
          to={percentage + 10}
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
        d="M20 65 Q15 50 30 45 Q35 30 50 35 Q65 25 70 45 Q85 50 80 65 Q70 75 50 75 Q30 75 20 65 Z"
        fill={color}
        fillOpacity={0.3}
      />
    </svg>
  );
};
