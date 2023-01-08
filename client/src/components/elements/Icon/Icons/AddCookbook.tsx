import React from "react";

interface Props {
  className: string;
  size: number;
  color: string;
}

export const AddCookbookIcon: React.FC<Props> = ({
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
        <clipPath id="clip-AddCookbook">
          <rect width="52" height="52" />
        </clipPath>
      </defs>
      <g id="AddCookbook" clipPath="url(#clip-AddCookbook)">
        <g id="add" transform="translate(-202.835 -161.53)">
          <path
            id="Path_7"
            data-name="Path 7"
            d="M213.373,161.53a4.874,4.874,0,0,0-4.87,4.867v35.847a4.878,4.878,0,0,0,4.874,4.87h13.361v6.415l4.882-2.9,4.876,2.9v-6.414l10.185,0v-7.036h2.486V161.533Zm30.6,42.879H236.5v-1.946H226.74v1.946H213.378a2.164,2.164,0,1,1,0-4.328h30.6Zm2.485-7.033H217.017V164.24h29.445Z"
            transform="translate(0 0)"
          />
          <g id="plus" transform="translate(223.741 172.933)">
            <rect
              id="Rectangle_44"
              data-name="Rectangle 44"
              width="3.075"
              height="17.424"
              transform="translate(7.174 0)"
            />
            <rect
              id="Rectangle_45"
              data-name="Rectangle 45"
              width="4.1"
              height="17.424"
              transform="translate(17.424 6.149) rotate(90)"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};
