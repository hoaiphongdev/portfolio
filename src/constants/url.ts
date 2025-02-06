import { appEnv } from '@/configs/env';

export const ROOT_SITE_URL = [
  appEnv.public.ROOT_DOMAIN,
  appEnv.public.APP_BASEPATH,
].join('/');

export const PROFILE_URL = '/pdfs/nguyen-hoai-phong-cv.pdf';
