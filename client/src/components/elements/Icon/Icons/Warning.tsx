import React from "react";

interface Props {
  className: string;
  size: number;
  color: string;
}

export const WarningIcon: React.FC<Props> = ({ className, size, color }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 52 52"
      fill={color}
    >
      <defs>
        <clipPath id="clip-Warning">
          <rect width="52" height="52" />
        </clipPath>
      </defs>
      <g id="Warning" clipPath="url(#clip-Warning)">
        <g
          id="warning-2"
          data-name="warning"
          transform="translate(-2.171 -0.643)"
        >
          <path
            id="Path_46"
            data-name="Path 46"
            d="M28.172,8.8c1.484,0,2.96.936,4.084,2.809L47.9,37.678c2.251,3.743.513,6.806-3.852,6.806H12.3c-4.365,0-6.1-3.066-3.852-6.806L24.087,11.611c1.124-1.873,2.6-2.809,4.084-2.809m0-5.291c-3.428,0-6.566,1.958-8.621,5.373L3.911,34.956C1.832,38.419,1.6,42.111,3.29,45.087s4.971,4.687,9.01,4.687H44.043c4.039,0,7.328-1.709,9.01-4.685s1.458-6.669-.622-10.132L36.793,8.892C34.737,5.469,31.6,3.511,28.172,3.511Z"
            transform="translate(0 0)"
          />
          <circle
            id="Ellipse_4"
            data-name="Ellipse 4"
            cx="3.439"
            cy="3.439"
            r="3.439"
            transform="translate(24.733 33.109)"
          />
          <path
            id="Path_47"
            data-name="Path 47"
            d="M18.434,12.468a3.966,3.966,0,1,0-7.642,1.487c1.466,3.64,3.674,9.095,3.674,9.095l3.68-9.095A4.065,4.065,0,0,0,18.434,12.468Z"
            transform="translate(13.706 8.208)"
          />
        </g>
      </g>
    </svg>
  );
};
