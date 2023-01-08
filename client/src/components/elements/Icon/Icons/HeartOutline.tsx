import React from "react";

interface Props {
  className: string;
  size: number;
  color: string;
}

export const HeartOutlineIcon: React.FC<Props> = ({
  className,
  size,
  color,
}) => {
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
        <clipPath id="clip-HeartOutline">
          <rect width="52" height="52" />
        </clipPath>
      </defs>
      <g id="HeartOutline" clipPath="url(#clip-HeartOutline)">
        <g id="Heart" transform="translate(0 1.234)">
          <path
            id="Combined-Shape"
            d="M26,2.639A17.5,17.5,0,0,1,40.352.826C50.662,4.15,53.862,15.39,51,24.333,46.582,38.379,27.718,48.856,26.918,49.3a1.9,1.9,0,0,1-1.826.005C24.3,48.866,5.57,38.544,1.005,24.336a0,0,0,0,1,0,0C-1.862,15.387,1.328,4.145,11.628.826A17.091,17.091,0,0,1,26,2.639ZM12.8,4.453C4.462,7.14,2.369,16.1,4.633,23.172,8.194,34.252,22.262,43.21,26,45.427c3.752-2.24,17.922-11.3,21.369-22.245,2.263-7.076.163-16.04-8.184-18.73A13.433,13.433,0,0,0,27.17,6.464a1.905,1.905,0,0,1-2.311.015A13.294,13.294,0,0,0,12.8,4.453ZM36.748,9.5a8.954,8.954,0,0,1,6.185,7.81,1.9,1.9,0,0,1-1.745,2.052c-.053.005-.1.008-.157.008a1.905,1.905,0,0,1-1.9-1.75,5.141,5.141,0,0,0-3.553-4.493A1.905,1.905,0,1,1,36.748,9.5Z"
            transform="translate(0 0)"
            fillRule="evenodd"
          />
        </g>
      </g>
    </svg>
  );
};
