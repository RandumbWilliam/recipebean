import React from "react";

interface Props {
  className: string;
  size: number;
  color: string;
}

export const ChevronRightIcon: React.FC<Props> = ({
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
      <g clipPath="url(#clip0_271_400)">
        <g clipPath="url(#clip1_271_400)">
          <path
            d="M9.84141 46.5969C10.1461 47.4602 10.6844 48.1406 12.3297 49.7352C14.0258 51.3805 14.5133 51.6953 15.6711 51.9086C16.5344 52.0711 17.5195 51.9289 18.3117 51.5328C18.7383 51.3196 21.0438 49.0649 30.093 40.036C36.2781 33.8508 41.4984 28.5594 41.6812 28.2852C42.1586 27.5641 42.3516 26.9039 42.3516 26C42.3516 25.1063 42.1586 24.4461 41.6812 23.7149C41.5086 23.4305 36.3086 18.1594 30.1031 11.9641C21.0336 2.91486 18.7383 0.680487 18.3117 0.467206C17.1336 -0.121857 15.6508 -0.111701 14.4219 0.487518C13.6602 0.8633 10.4914 3.98127 10.1359 4.72267C9.52656 5.95158 9.48594 7.34299 10.0039 8.53127C10.2781 9.1508 10.7453 9.64846 18.6773 17.5906L27.0664 26L18.6773 34.3992C10.7656 42.3313 10.2781 42.8492 10.0039 43.4688C9.61797 44.3321 9.54688 45.7539 9.84141 46.5969Z"
            fill={color}
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_271_400">
          <rect width="52" height="52" fill="white" />
        </clipPath>
        <clipPath id="clip1_271_400">
          <rect
            width="52"
            height="52"
            fill="white"
            transform="translate(0 52) rotate(-90)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
