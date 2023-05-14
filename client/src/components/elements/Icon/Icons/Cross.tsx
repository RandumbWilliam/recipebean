import React from "react";

interface Props {
  className: string;
  size: number;
  color: string;
}

export const CrossIcon: React.FC<Props> = ({ className, size, color }) => {
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
        <clipPath id="clip-Cookbook">
          <rect width="52" height="52" />
        </clipPath>
      </defs>
      <g id="Cross" clipPath="url(#clip-Cross)">
        <path
          id="path3936"
          d="M57.868,16.222,16.222,57.868"
          transform="translate(-11.038 -11.039)"
          fill={color}
          stroke={color}
          strokeLinecap="round"
          strokeWidth="10"
          fillRule="evenodd"
        />
        <path
          id="path2186"
          d="M16.222,16.222,57.868,57.868"
          transform="translate(-11.038 -11.039)"
          fill={color}
          stroke={color}
          strokeLinecap="round"
          strokeWidth="10"
          fillRule="evenodd"
        />
      </g>
    </svg>
  );
};
