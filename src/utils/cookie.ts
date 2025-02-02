import { appEnv } from '@/configs/env';
import { ONE_DAY_IN_MS } from '@/constants/common';

import { isClientSide } from './common';

const cookieDomain = appEnv.isDevelopment ? 'localhost' : '.mydomain.com';

export const setCookie = (cname: string, cvalue: string, exdays: number) => {
  if (isClientSide) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * ONE_DAY_IN_MS));
    const expires = `expires=${d.toUTCString()}`;
    document.cookie = `${cname}=${cvalue};domain=${cookieDomain};${expires};path=/`;
  }
};

export const getCookie = (cname: string) => {
  if (isClientSide) {
    const name = `${cname}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
  }
  return '';
};

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; Domain=${cookieDomain}; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};
