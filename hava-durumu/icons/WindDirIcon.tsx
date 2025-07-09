import React from "react";

interface WindDirIconProps {
  wind_dir: number;
  color?: string;
}

export const WindDirIcon: React.FC<WindDirIconProps> = ({
  wind_dir,
  color = "#CCDDE4",
}) => {
  const id = React.useMemo(
    () => `gradient-${Math.random().toString(36).substr(2, 9)}`,
    []
  );
  return (
    <svg viewBox="0 0 100 100">
      <defs>
        <clipPath id="circle">
          <path d="M 50,10 A 40,40 0 1,0 50,90 A 40,40 0 1,0 50,10" />
        </clipPath>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(255, 0, 0)" />
          <stop offset="100%" stopColor="rgb(255, 136, 0)" />
        </linearGradient>
      </defs>

      <path
        d="M 50,10 A 40,40 0 1,0 50,90 A 40,40 0 1,0 50,10"
        fill={color}
        fillOpacity={0.3}
      />

      <text x="50" y="18" textAnchor="middle" fontSize="10" fill="black">
        K
      </text>
      <text x="50" y="89" textAnchor="middle" fontSize="10" fill="black">
        G
      </text>
      <text x="85" y="54" textAnchor="middle" fontSize="10" fill="black">
        D
      </text>
      <text x="15" y="54" textAnchor="middle" fontSize="10" fill="black">
        B
      </text>
      <text x="50" y="51" textAnchor="middle" fontSize="10" fill="black">
        .
      </text>

      <g>
        <path
          d="M 50 50 C 52 48 58 40 50 15 C 41 40 48 48 50 50 Z"
          fill={`url(#${id})`}
        />
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          from="0 50 50"
          to={`${wind_dir} 50 50`}
          dur="2s"
          begin="0.5s"
          fill="freeze"
          calcMode="spline"
          keySplines="0.25 0.1 0.25 1"
          keyTimes="0;1"
        />
      </g>
    </svg>
  );
};
