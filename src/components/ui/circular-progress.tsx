'use client';

import * as React from 'react';

interface CircularProgressProps extends React.SVGProps<SVGSVGElement> {
  value?: number;
  strokeWidth?: number;
}

const CircularProgress = React.forwardRef<SVGSVGElement, CircularProgressProps>(
  ({ value = 0, strokeWidth = 8, className, ...props }, ref) => {
    const radius = 50 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
      <svg
        ref={ref}
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        className={className}
        {...props}
      >
        <circle
          className="text-secondary"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
        />
        <circle
          className="text-primary transition-all duration-500"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 50 50)"
        />
      </svg>
    );
  }
);
CircularProgress.displayName = 'CircularProgress';

export { CircularProgress };
