import React from 'react';

const ArrowsIcon = ({ width = 18, height = 18, color = '#000000', fill = 'none', ...props }) => (
  <svg
    width={width}
    height={height}
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 7L4 12L9 17M15 7L20 12L15 17"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ArrowsIcon;
