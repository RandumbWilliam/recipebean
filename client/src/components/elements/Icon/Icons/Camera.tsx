import React from "react";

interface Props {
  className: string;
  size: number;
  color: string;
}

export const CameraIcon: React.FC<Props> = ({ className, size, color }) => {
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
        <clipPath id="clip-Camera">
          <rect width="52" height="52" />
        </clipPath>
      </defs>
      <g id="Camera" clip-path="url(#clip-Camera)">
        <g id="camera-2" data-name="camera" transform="translate(0 6)">
          <path
            id="Path_20"
            data-name="Path 20"
            d="M95.8,102.375H87.363l-5.05-5.1s-.025-.025-.037-.025l-.025-.025h0A4.089,4.089,0,0,0,79.338,96h-10.5a4.134,4.134,0,0,0-3.075,1.362v.013l-4.937,5H52.2a4.151,4.151,0,0,0-4.2,4.15v25.262A4.2,4.2,0,0,0,52.2,136H95.8a4.212,4.212,0,0,0,4.2-4.213V106.525A4.159,4.159,0,0,0,95.8,102.375ZM74,129.687a11.575,11.575,0,1,1,11.55-11.575A11.584,11.584,0,0,1,74,129.687Zm21.012-20.625a1.763,1.763,0,1,1,1.75-1.763A1.758,1.758,0,0,1,95.012,109.062Z"
            transform="translate(-48 -96)"
          />
          <path
            id="Path_21"
            data-name="Path 21"
            d="M194.925,202.9a8.75,8.75,0,1,0,8.725,8.75A8.73,8.73,0,0,0,194.925,202.9Z"
            transform="translate(-168.925 -189.538)"
          />
        </g>
      </g>
    </svg>
  );
};
