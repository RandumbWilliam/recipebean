import React from "react";

interface Props {
  className: string;
  size: number;
  color: string;
}

export const CookbookIcon: React.FC<Props> = ({ className, size, color }) => {
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
      <g id="Cookbook" clipPath="url(#clip-Cookbook)">
        <g id="saved" transform="translate(-202.835 -161.53)">
          <path
            id="Path_5"
            data-name="Path 5"
            d="M333.567,245.094a4.6,4.6,0,0,0-7.629-3.489,4.54,4.54,0,0,0-6.031.023,4.615,4.615,0,1,0-4.83,7.726v7.219h15.664v-7.22a4.623,4.623,0,0,0,2.826-4.258Z"
            transform="translate(-91.156 -69.358)"
          />
          <path
            id="Path_6"
            data-name="Path 6"
            d="M335.52,392.12h15.664v2.312H335.52Z"
            transform="translate(-111.599 -202.599)"
          />
          <path
            id="Path_7"
            data-name="Path 7"
            d="M213.373,161.53a4.874,4.874,0,0,0-4.87,4.867v35.847a4.878,4.878,0,0,0,4.874,4.87h13.361v6.415l4.882-2.9,4.876,2.9v-6.414l10.185,0v-7.036h2.486V161.533Zm30.6,42.879H236.5v-1.946H226.74v1.946H213.378a2.164,2.164,0,1,1,0-4.328h30.6Zm2.485-7.033H217.017V164.24h29.445Z"
            transform="translate(0 0)"
          />
        </g>
      </g>
    </svg>
  );
};
