import React, {
  Image,
} from 'react-native';
import md5 from 'MD5';
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

export function parseContentWithImage(content) {
  if (!content) { return ''; }

  let contentWithEmoticonUrl = content.replace(/\[mobcent_phiz=(https?:\/\/[^\]]+\.(?:jpg|png|gif))\]/g, '___emoticonBoundary___$1___emoticonBoundary___');
  let contentEmoticonUrlArray = contentWithEmoticonUrl.split('___emoticonBoundary___');

  return contentEmoticonUrlArray.map(item => {
    if (/https?:\/\/.+(?:jpg|png|gif)/.test(item)) {
      return <Image source={{uri: item}} />;
    } else {
      return item;
    }
  })
}
