// Simple Icons https://simpleicons.org | SimpleIcons.org

import type { ComponentProps } from 'react';

const NextJS = (props: ComponentProps<'svg'>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-menu"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M9 15V9l7.745 10.65A9 9 0 1119 17.657M15 12V9" />
    </svg>
  );
};

export default NextJS;
