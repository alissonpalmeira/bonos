// https://thomashunter.name/posts/2021-12-11-detecting-if-pwa-twa-is-installed

const ua = navigator.userAgent;

const ios = ua.match(/iPhone|iPad|iPod/);
const android = ua.match(/Android/);
const standalone = window.matchMedia('(display-mode: standalone)').matches;

export const platform = ios ? 'ios' : android ? 'android' : 'unknown';

export const isInstalled = !!(standalone || (ios && !ua.match(/Safari/)));
