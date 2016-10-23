import md5 from 'md5';
import { APP_AUTH_KEY } from '../config';

// http://phpjs.org/functions/time/
function time() {
  return Math.floor(new Date().getTime() / 1000);
}

// https://github.com/UESTC-BBS/API-Docs/wiki/Mobcent-API#apphash
export function getAppHashValue() {
  let timeStr = time().toString();
  let encryptedTimeStr = md5(timeStr.substr(0, 5) + APP_AUTH_KEY);
  return encryptedTimeStr.substr(8, 8);
}
