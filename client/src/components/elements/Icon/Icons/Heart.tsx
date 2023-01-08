import React from "react";

interface Props {
  className: string;
  size: number;
  color: string;
}

export const HeartIcon: React.FC<Props> = ({ className, size, color }) => {
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
        <clipPath id="clip-Heart">
          <rect width="52" height="52" />
        </clipPath>
      </defs>
      <g id="Heart" clipPath="url(#clip-Heart)">
        <g
          id="Iconly_Light-Outline_Heart"
          data-name="Iconly/Light-Outline/Heart"
          transform="translate(-2 -1.766)"
        >
          <g id="Heart-2" data-name="Heart" transform="translate(2 3)">
            <path
              id="Combined-Shape"
              d="M26,2.639A17.5,17.5,0,0,1,40.352.826C50.662,4.15,53.862,15.39,51,24.333,46.582,38.379,27.718,48.856,26.918,49.3a1.9,1.9,0,0,1-1.826.005C24.3,48.866,5.57,38.544,1.005,24.336a0,0,0,0,1,0,0C-1.862,15.387,1.328,4.145,11.628.826A17.091,17.091,0,0,1,26,2.639Z"
              transform="translate(0 0)"
              fillRule="evenodd"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};
