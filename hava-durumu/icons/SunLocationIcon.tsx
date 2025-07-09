import React from "react";

interface MoonLocationIconProps {
  sunrise: number;
  sunset: number;
  time: number;
}

export const SunLocationIcon: React.FC<MoonLocationIconProps> = ({
  sunrise,
  sunset,
  time,
}) => {
  const isNight = time < sunrise || time > sunset;

  const suntime = sunset - sunrise;
  const unitAngle = Math.PI / suntime;
  const angleRad = unitAngle * (time - sunrise);

  const r = 40;
  const centerX = 50;
  const centerY = 65;

  const x = centerX - r * Math.cos(angleRad);
  const y = centerY - r * Math.sin(angleRad);
  if (isNight) {
    return (
      <svg viewBox="0 0 100 100">
        <defs>
          <pattern
            id="stars-texture"
            patternUnits="userSpaceOnUse"
            width="100"
            height="100"
          >
            <image
              href="../public/stars.jpg"
              x="0"
              y="0"
              width="100"
              height="100"
            />
          </pattern>
        </defs>
        <path
          d={`
          M ${centerX - r},${centerY}
          A ${r},${r} 0 0 1 ${centerX + r},${centerY}
        `}
          fill="none"
          stroke="url(#stars-texture)"
          strokeWidth="15"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 100 100">
      <defs>
        <pattern
          id="sun-texture"
          patternUnits="userSpaceOnUse"
          width="100"
          height="100"
        >
          <image
            href="../public/sun.png"
            x="0"
            y="0"
            width="100"
            height="100"
          />
        </pattern>
        <linearGradient id="gradient2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgb(119, 212, 255)" />
          <stop offset="33%" stopColor="rgb(255, 218, 125)" />
          <stop offset="66%" stopColor="rgb(255, 179, 28)" />
          <stop offset="100%" stopColor="rgb(250, 59, 38)" />
        </linearGradient>
      </defs>
      <path
        id="sunpath"
        d={`
          M ${centerX - r},${centerY}
          A ${r},${r} 0 0 1 ${centerX + r},${centerY}
        `}
        fill="none"
        stroke="url(#gradient2)"
        strokeWidth="15"
        strokeLinecap="round"
      />

      <circle cx={x} cy={y} r="8" fill="url(#sun-texture)">
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
};
