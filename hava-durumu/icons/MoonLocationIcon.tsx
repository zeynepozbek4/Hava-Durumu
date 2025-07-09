import React from "react";

interface MoonLocationIconProps {
  moonrise: number;
  moonset: number;
  time: number;
}

export const MoonLocationIcon: React.FC<MoonLocationIconProps> = ({
  moonrise,
  moonset,
  time,
}) => {
  const moontime = moonset - moonrise;
  const unitAngle = Math.PI / moontime;
  const angleRad = unitAngle * (time - moonrise);

  const r = 40;
  const centerX = 50;
  const centerY = 65;
  const x = centerX - r * Math.cos(angleRad);
  const y = centerY - r * Math.sin(angleRad);
  if (time < moonrise || time > moonset) {
    return (
      <svg viewBox="0 0 100 100">
        <defs>
          <pattern
            id="moon-texture"
            patternUnits="userSpaceOnUse"
            width="100"
            height="100"
          >
            <image
              href="../public/moon.png"
              x="0"
              y="0"
              width="100"
              height="100"
            />
          </pattern>
          <linearGradient id="gradient3" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgb(0, 4, 55)" />
            <stop offset="100%" stopColor="rgb(0, 17, 255)" />
          </linearGradient>
        </defs>
        <path
          d={`
          M ${centerX - r},${centerY}
          A ${r},${r} 0 0 1 ${centerX + r},${centerY}
        `}
          fill="none"
          stroke="url(#gradient3)"
          strokeWidth="15"
          strokeLinecap="round"
        />
      </svg>
    );
  } else {
    return (
      <svg viewBox="0 0 100 100">
        <defs>
          <pattern
            id="moon-texture"
            patternUnits="userSpaceOnUse"
            width="100"
            height="100"
          >
            <image
              href="../public/moon.png"
              x="0"
              y="0"
              width="100"
              height="100"
            />
          </pattern>
          <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgb(0, 174, 255)" />
            <stop offset="100%" stopColor="rgb(0, 17, 255)" />
          </linearGradient>
        </defs>
        <path
          d={`
          M ${centerX - r},${centerY}
          A ${r},${r} 0 0 1 ${centerX + r},${centerY}
        `}
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="15"
          strokeLinecap="round"
        />

        <circle cx={x} cy={y} r="8" fill="url(#moon-texture)">
          <animate
            attributeName="r"
            from="0"
            to="8"
            dur="2s"
            begin="0.5s"
            fill="freeze"
            repeatCount="1"
            calcMode="spline"
            keySplines="0.25 0.1 0.25 1"
            keyTimes="0;1"
          />
        </circle>
      </svg>
    );
  }
};
