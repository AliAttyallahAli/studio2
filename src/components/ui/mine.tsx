import { SVGProps } from "react";

export function Mine(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14.13 10.33c.53-.8.43-1.86-.3-2.59l-3.3-3.3a1.53 1.53 0 0 0-2.17 0l-3.3 3.3a1.53 1.53 0 0 0 0 2.17l3.3 3.3c.73.73 1.8.83 2.59.3M10.53 4.22l5.25 5.25M9.47 11.47l-1.94 1.94m4.89 4.89l-1.94 1.94M15 13l-1.5 1.5M12.5 10.5L14 12M22 2l-5.5 5.5"
      ></path>
    </svg>
  );
}
