import React from "react";

const CloseBtn = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      role="img"
      aria-label="Close"
      className={className}
    >
      <circle cx="12" cy="12" r="10" fill="#5d636e" />
      <path
        d="M8 8L16 16M16 8L8 16"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};
export default CloseBtn;
