import React from "react";

interface Props {
  className: string;
  size: number;
  color: string;
}

export const CheckAltIcon: React.FC<Props> = ({ className, size, color }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 52 52"
      fill={color}
    >
      <g clipPath="url(#clip0_208_382)">
        <path
          d="M44.0274 5.02738C42.4836 5.36254 41.6203 5.91097 40.0156 7.53597C39.3758 8.18597 33.9828 13.6907 28.0313 19.7539L17.2149 30.7836L13.9141 27.4524C10.3594 23.8672 10.0141 23.5828 8.58204 23.1258C7.62735 22.8211 5.61642 22.811 4.77345 23.0953C2.66095 23.8063 1.08673 25.3399 0.385947 27.3711C-0.335146 29.4836 0.0507913 31.9719 1.3711 33.668C2.1836 34.7243 12.8274 45.5 13.5078 45.9571C15.9047 47.5922 19.0938 47.4703 21.2774 45.6727C21.5617 45.4391 28.2242 38.6852 36.0953 30.6719C45.6524 20.9219 50.5274 15.8743 50.8219 15.4375C52.4977 12.9086 52.3453 9.66878 50.4359 7.28206C48.943 5.43363 46.343 4.51957 44.0274 5.02738Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_208_382">
          <rect width="52" height="52" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
