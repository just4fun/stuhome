import { Linking } from 'react-native';
import SafariView from 'react-native-safari-view';

export default {
  show(url) {
    SafariView.isAvailable()
      .then(() => {
        SafariView.show({ url });
      })
      .catch(() => {
        // Fallback iOS built-in Safari.
        Linking.openURL(url);
      });
  }
};
