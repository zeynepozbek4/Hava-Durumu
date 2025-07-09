import React from "react";

interface PrecIconProps {
  pop: number;
  rain: number;
  snow: number;
}

const Droplet = ({ x, y, fill }: { x: number; y: number; fill: string }) => (
  <g transform="scale(0.1)">
    <g transform={`translate(${(x - 10) * 10}, ${(y - 10) * 10})`}>
      <path d="M 50 2 C 0 50 16 96 51 96 C 85 96 101 49 50 2 " fill={fill} />
      <animateTransform
        attributeName="transform"
        type="translate"
        from={`${(x - 10) * 10} ${(y - 15) * 10}`}
        to={`${(x - 10) * 10} ${(y - 10) * 10}`}
        dur="2s"
        begin="0.5s"
        fill="freeze"
        calcMode="spline"
        keySplines="0.25 0.1 0.25 1"
        keyTimes="0;1"
      />
    </g>
  </g>
);

const Snowflake = ({ x, y, fill }: { x: number; y: number; fill: string }) => (
  <g transform="scale(0.1)">
    <g transform={`translate(${(x - 10) * 10}, ${(y - 10) * 10})`}>
      <path
        d="M50 10 L50 90 M10 50 L90 50 M25 25 L75 75 M75 25 L25 75"
        stroke={fill}
        strokeWidth="15"
        strokeLinecap="round"
        fill="none"
      />
      <animateTransform
        attributeName="transform"
        type="translate"
        from={`${(x - 10) * 10} ${(y - 15) * 10}`}
        to={`${(x - 10) * 10} ${(y - 10) * 10}`}
        dur="2s"
        begin="0.5s"
        fill="freeze"
        calcMode="spline"
        keySplines="0.25 0.1 0.25 1"
        keyTimes="0;1"
      />
    </g>
  </g>
);

const CloudPath = ({ fill }: { fill: string }) => (
  <path
    d="M20 65 Q15 50 30 45 Q35 30 50 35 Q65 25 70 45 Q85 50 80 65 Q70 75 50 75 Q30 75 20 65 "
    fill={fill}
    fillOpacity={0.75}
  />
);

export const PrecIcon: React.FC<PrecIconProps> = ({ pop, rain, snow }) => {
  const totalIconNum = Math.floor(pop / 20);
  const rainIconNum = totalIconNum * (rain / (rain + snow));
  const snowIconNum = totalIconNum - rainIconNum;

  const spacing = 8;
  const startX = 50 - ((totalIconNum - 1) * spacing) / 2;
  const yOffset = 80;

  const icons: React.ReactElement[] = [];
  let index = 0;
  for (let i = 0; i < rainIconNum; i++) {
    icons.push(
      <Droplet
        key={`d-${i}`}
        x={startX + index * spacing}
        y={yOffset}
        fill={`url(#droplet-gradient)`}
      />
    );
    index++;
  }
  for (let i = 0; i < snowIconNum; i++) {
    icons.push(
      <Snowflake
        key={`s-${i}`}
        x={startX + index * spacing}
        y={yOffset + 3}
        fill={`url(#snowflake-gradient)`}
      />
    );
    index++;
  }

  return (
    <svg viewBox="0 0 100 100">
      <defs>
        <radialGradient id="cloud-gradient">
          <stop offset="0%" stopColor="rgb(255, 255, 255)" />
          <stop offset="50%" stopColor="rgb(238, 238, 238)" />
          <stop offset="100%" stopColor="rgb(227, 227, 227)" />
        </radialGradient>
        <linearGradient id="droplet-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(60, 200, 255, 1)" />
          <stop offset="100%" stopColor="rgba(54, 47, 247, 1)" />
        </linearGradient>
        <radialGradient id="snowflake-gradient">
          <stop offset="0%" stopColor="rgb(255, 255, 255)" />
          <stop offset="100%" stopColor="rgb(174, 181, 212)" />
        </radialGradient>
      </defs>
      <CloudPath fill={`url(#cloud-gradient)`} />
      {icons}
    </svg>
  );
};
