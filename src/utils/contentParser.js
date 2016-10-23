import React from 'react';
import {
  Image
} from 'react-native';

export function parseContentWithImage(content) {
  if (!content) { return ''; }

  let contentWithEmoticonUrl = content.replace(/\[mobcent_phiz=(https?:\/\/[^\]]+\.(?:jpg|png|gif))\]/g, '___emoticonBoundary___$1___emoticonBoundary___');
  let contentEmoticonUrlArray = contentWithEmoticonUrl.split('___emoticonBoundary___');

  return contentEmoticonUrlArray.map((item, index) => {
    if (/https?:\/\/.+(?:jpg|png|gif)/.test(item)) {
      return (
        <Image
          key={index}
          source={{ uri: item }}
          style={{
            marginTop: 5,
            height: 30,
            width: 30,
            resizeMode: 'contain'
          }} />
      );
    }

    return item;
  });
}
