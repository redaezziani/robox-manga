import React from 'react';

const FolderCloseIcon = ({
  width = 18,
  height = 18,
  color = '#000000',
  fill = 'none',
  ...props
}) => (
  <svg
    width={width}
    height={height}
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
  >
    {' '}
    <path d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2"></path>{' '}
  </svg>
);

const FolderOpenIcon = ({
  width = 18,
  height = 18,
  color = '#000000',
  fill = 'none',
  ...props
}) => (
  <svg
    width={width}
    height={height}
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
  >
    {' '}
    <path d="M5 19l2.757 -7.351a1 1 0 0 1 .936 -.649h12.307a1 1 0 0 1 .986 1.164l-.996 5.211a2 2 0 0 1 -1.964 1.625h-14.026a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v2"></path>{' '}
  </svg>
);

export { FolderCloseIcon, FolderOpenIcon };
