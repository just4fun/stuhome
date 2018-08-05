import React from 'react';
import {
  Image,
  StyleSheet
} from 'react-native';
import { DEFAULT_EMOJIS } from '~/constants/emojis';
import { DEFAULT_EMOJI_ROOT } from '~/config';

// This method is also used to copy topic content and comment content,
// the second parameter here is used to exclude custom emoji as paste
// content.
export function parseContentWithEmoji(content, includeEmoji = true) {
  if (!content) { return ''; }

  // var regex = new RegExp(/xyz/, 'i');
  // The second parameter for RegExp doesn't work below iOS 10
  let contentWithEmoji = content.replace(/\[mobcent_phiz=(https?:\/\/[^\]]+\.(?:jpg|png|gif))\]/g, '___emojiBoundary___$1___emojiBoundary___')
                                .replace(/(\[[^\]]+\])/g, '___emojiBoundary___$1___emojiBoundary___');
  let contentEmojiArray = contentWithEmoji.split('___emojiBoundary___');

  return contentEmojiArray.filter(item => item.trim()).map((item, index) => {
    // Handle custom emojis.
    if (/^https?:\/\/.+(?:jpg|png|gif)$/.test(item)) {
      // Exclude custom emoji because copy something like [mobcent_phiz=..]
      // is useless as paste content.
      if (!includeEmoji) { return ''; }

      return (
        <Image
          key={index}
          source={{ uri: item }}
          style={styles.emoji} />
      );
    }

    // Handle default emojis.
    //
    // Why use hash map here instead of array? O(1).
    if (DEFAULT_EMOJIS.hasOwnProperty(item)) {
      // Return custom emoji content directly because emoji content like [阴险]
      // could be pasted in text input directly which will also be read in same
      // format.
      if (!includeEmoji) { return item; }

      return (
        <Image
          key={index}
          source={{ uri: `${DEFAULT_EMOJI_ROOT}/${DEFAULT_EMOJIS[item]}` }}
          style={styles.emoji} />
      );
    }

    return item;
  });
}

const styles = StyleSheet.create({
  emoji: {
    marginTop: 5,
    height: 30,
    width: 30,
    resizeMode: 'contain'
  }
});
