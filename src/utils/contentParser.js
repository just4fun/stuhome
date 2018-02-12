import React from 'react';
import { Image } from 'react-native';

const EMOJI_REGEX = /\[mobcent_phiz=(https?:\/\/[^\]]+\.(?:jpg|png|gif))\]/;

export function parseContentWithImage(content, replaceWithImage = true) {
  if (!content) { return ''; }

  let contentWithEmoticonUrl = content.replace(new RegExp(EMOJI_REGEX, 'g'), '___emoticonBoundary___$1___emoticonBoundary___');
  let contentEmoticonUrlArray = contentWithEmoticonUrl.split('___emoticonBoundary___');

  return contentEmoticonUrlArray.filter(item => item.trim()).map((item, index) => {
    if (/https?:\/\/.+(?:jpg|png|gif)/.test(item)) {
      if (!replaceWithImage) { return '' };

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
