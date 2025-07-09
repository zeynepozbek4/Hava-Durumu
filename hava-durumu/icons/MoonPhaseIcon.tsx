import React from "react";

interface MoonPhaseIconProps {
  moon_phase_lunation: number;
  latitude: number;
}

export const MoonPhaseIcon: React.FC<MoonPhaseIconProps> = ({
  moon_phase_lunation, // actual lunation
  latitude,
}) => {
  const isSouthernHemisphere = latitude < 0;
  const isEquator = Math.abs(latitude) < 5;
  let rotation;
  if (isEquator) {
    rotation = isSouthernHemisphere ? 270 : 90;
  } else {
    rotation = isSouthernHemisphere ? 180 : 0;
  }

  const offset = 100 - moon_phase_lunation * 200;
  const offset2 = 100 - (moon_phase_lunation - 0.5) * 200;
  const d = `M 50 0 C ${offset} 0 ${offset} 100 50 100 
           a 50 50 0 0 1 0 -100 Z`;

  const d2 = `M 50 0 C ${offset2} 0 ${offset2} 100 50 100 A 50 50 0 0 0 50 0 Z`;

  if (moon_phase_lunation < 0.5 && moon_phase_lunation != 0) {
    return (
      <svg viewBox="0 0 100 100">
        <defs>
          <mask id="moon-mask">
            <rect x="0" y="0" width="100" height="100" fill="white" />
            <path d={d} fill="black" opacity="0.75">
              <animate
                attributeName="opacity"
                from="0"
                to="0.75"
                dur="2s"
                begin="0.5s"
                fill="freeze"
                repeatCount="1"
                calcMode="spline"
                keySplines="0.25 0.1 0.25 1"
                keyTimes="0;1"
              />
            </path>
          </mask>

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
        </defs>

        <g transform={`rotate(${rotation}, 50, 50)`}>
          <circle cx="50" cy="50" r="50" fill="black" />
          <circle
            cx="50"
            cy="50"
            r="50"
            fill="url(#moon-texture)"
            mask="url(#moon-mask)"
          />
          <circle
            cx="50"
            cy="50"
            r="50"
            fill="rgb(254, 247, 169)"
            opacity="0.5"
            mask="url(#moon-mask)"
          />
        </g>
      </svg>
    );
  } else if (moon_phase_lunation > 0.5 && moon_phase_lunation != 1) {
    return (
      <svg viewBox="0 0 100 100">
        <defs>
          <mask id="moon-mask">
            <rect x="0" y="0" width="100" height="100" fill="white" />
            <path d={d2} fill="black" opacity="0.75">
              <animate
                attributeName="cx"
                from="0"
                to="50"
                dur="2s"
                begin="0.5s"
                fill="freeze"
                repeatCount="1"
                calcMode="spline"
                keySplines="0.25 0.1 0.25 1"
                keyTimes="0;1"
              />
            </path>
          </mask>

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
        </defs>

        <g transform={`rotate(${rotation}, 50, 50)`}>
          <circle cx="50" cy="50" r="50" fill="black" />
          <circle
            cx="50"
            cy="50"
            r="50"
            fill="url(#moon-texture)"
            mask="url(#moon-mask)"
          />
          <circle
            cx="50"
            cy="50"
            r="50"
            fill="rgb(254, 247, 169)"
            opacity="0.5"
            mask="url(#moon-mask)"
          />
        </g>
      </svg>
    );
  } else if (moon_phase_lunation == 0.5) {
    return (
      <svg viewBox="0 0 100 100">
        <defs>
          <mask id="moon-mask">
            <rect x="0" y="0" width="100" height="100" fill="white" />
          </mask>

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
        </defs>

        <g transform={`rotate(${rotation}, 50, 50)`}>
          <circle cx="50" cy="50" r="50" fill="black" />
          <circle
            cx="50"
            cy="50"
            r="50"
            fill="url(#moon-texture)"
            mask="url(#moon-mask)"
          />
          <circle
            cx="50"
            cy="50"
            r="50"
            fill="rgb(254, 247, 169)"
            opacity="0.5"
            mask="url(#moon-mask)"
          />
        </g>
      </svg>
    );
  } else if (moon_phase_lunation == 1 || moon_phase_lunation == 0) {
    return (
      <svg viewBox="0 0 100 100">
        <defs>
          <mask id="moon-mask">
            <rect x="0" y="0" width="100" height="100" fill="white" />
            <circle cx="50" cy="50" r="50" fill="black" opacity="0.75">
              <animate
                attributeName="cx"
                from="0"
                to="50"
                dur="2s"
                begin="0.5s"
                fill="freeze"
                repeatCount="1"
                calcMode="spline"
                keySplines="0.25 0.1 0.25 1"
                keyTimes="0;1"
              />
            </circle>
          </mask>

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
        </defs>

        <g transform={`rotate(${rotation}, 50, 50)`}>
          <circle cx="50" cy="50" r="50" fill="black" />
          <circle
            cx="50"
            cy="50"
            r="50"
            fill="url(#moon-texture)"
            mask="url(#moon-mask)"
          />
          <circle
            cx="50"
            cy="50"
            r="50"
            fill="rgb(254, 247, 169)"
            opacity="0.5"
            mask="url(#moon-mask)"
          />
        </g>
      </svg>
    );
  }
};
