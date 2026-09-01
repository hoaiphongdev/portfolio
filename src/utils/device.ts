export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  const userAgent = window.navigator.userAgent.toLowerCase();

  const mobileKeywords = [
    'android',
    'webos',
    'iphone',
    'ipad',
    'ipod',
    'blackberry',
    'windows phone',
    'opera mini',
    'mobile',
    'crios', // Chrome on iOS
    'fxios', // Firefox on iOS
  ];

  return mobileKeywords.some(keyword => userAgent.includes(keyword));
}
