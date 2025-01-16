import React from 'react';

const CampaignsIcon = ({ width = 18, height = 18, color = '#000000', fill = 'none', ...props }) => (
  <svg
    width={width}
    height={height}
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {' '}
    <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" />{' '}
  </svg>
);

export default CampaignsIcon;
