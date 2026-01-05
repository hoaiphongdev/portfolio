import { ONE_DAY_IN_MS } from '@/constants/common';

import { isClientSide } from './common';

function getCookieDomain(): string {
  if (!isClientSide) {
    return 'localhost';
  }
  const hostname = window.location.hostname;
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'localhost';
  }
  const parts = hostname.split('.');
  if (parts.length >= 2) {
    return `.${parts.slice(-2).join('.')}`;
  }
  return hostname;
}

export const setCookie = (cname: string, cvalue: string, exdays: number) => {
  if (isClientSide) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * ONE_DAY_IN_MS);
    const expires = `expires=${d.toUTCString()}`;
    const cookieDomain = getCookieDomain();
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
  const cookieDomain = getCookieDomain();
  document.cookie = `${name}=; Domain=${cookieDomain}; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};
