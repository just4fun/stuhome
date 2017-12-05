import React from 'react';
import { CachedImage } from "react-native-img-cache";

export function parseContentWithImage(content) {
  if (!content) { return ''; }

  let contentWithEmoticonUrl = content.replace(/\[mobcent_phiz=(https?:\/\/[^\]]+\.(?:jpg|png|gif))\]/g, '___emoticonBoundary___$1___emoticonBoundary___');
  let contentEmoticonUrlArray = contentWithEmoticonUrl.split('___emoticonBoundary___');

  return contentEmoticonUrlArray.map((item, index) => {
    if (/https?:\/\/.+(?:jpg|png|gif)/.test(item)) {
      return (
        <CachedImage
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
