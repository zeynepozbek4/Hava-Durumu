import React from "react";

interface BarometerIconProps {
  pressure: number; // fill percentage
}

export const BarometerIcon: React.FC<BarometerIconProps> = ({ pressure }) => {
  const id = React.useMemo(
    () => `gradient-${Math.random().toString(36).substr(2, 9)}`,
    []
  );

  const barometer_gradient = React.useMemo(
    () => `gradient-${Math.random().toString(36).substr(2, 9)}`,
    []
  );
  const barometerPercentage = Math.round(pressure - 950);

  return (
    <svg viewBox="0 0 100 100">
      <defs>
        <clipPath id="barometer-shape">
          <path d="M 39 11 A 10 10 0 0 1 61 11 L 61 89 A 10 10 0 0 1 39 89 Z" />
        </clipPath>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(255, 60, 60)" />
          <stop offset="50%" stopColor="rgb(255, 148, 60)" />
          <stop offset="100%" stopColor="rgba(60, 200, 255, 1)" />
        </linearGradient>
        <linearGradient id={barometer_gradient} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgb(176, 176, 176)" />
          <stop offset="100%" stopColor="rgb(242, 242, 242)" />
        </linearGradient>
      </defs>

      <path
        d="M 39 11 A 10 10 0 0 1 61 11 L 61 89 A 10 10 0 0 1 39 89 Z"
        fill={`url(#${barometer_gradient})`}
        fillOpacity={0.5}
      />

      <rect
        x="0"
        y={100 - barometerPercentage}
        width="100"
        height={barometerPercentage}
        fill={`url(#${id})`}
        clipPath="url(#barometer-shape)"
      >
        <animate
          attributeName="y"
          from="100"
          to={100 - barometerPercentage}
          dur="2s"
          begin="0.5s"
          fill="freeze"
          repeatCount="1"
          calcMode="spline"
          keySplines="0.25 0.1 0.25 1"
          keyTimes="0;1"
        />
      </rect>
    </svg>
  );
};
