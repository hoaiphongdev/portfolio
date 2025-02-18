export const STATIC_PAGE_ORIGIN_URL = {
  HOME: '/',
  ABOUT_ME: '/about-me',
  EXPERIENCES: '/experiences',
  PROJECTS: '/projects',
};

export const DYNAMIC_PAGE_ORIGIN_URL = {
  PROJECT_DETAIL: '/projects/[slug]',
};

export const DYNAMIC_ROUTE_MAPPING = {
  [DYNAMIC_PAGE_ORIGIN_URL.PROJECT_DETAIL]: STATIC_PAGE_ORIGIN_URL.PROJECTS,
};

export type StaticRoute =
  (typeof STATIC_PAGE_ORIGIN_URL)[keyof typeof STATIC_PAGE_ORIGIN_URL];
export type DynamicRoute =
  (typeof DYNAMIC_PAGE_ORIGIN_URL)[keyof typeof DYNAMIC_PAGE_ORIGIN_URL];
export type Route = StaticRoute | DynamicRoute;
