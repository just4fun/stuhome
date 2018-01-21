import { MessageBarManager } from 'react-native-message-bar';
import { isIphoneX } from 'react-native-iphone-x-helper';

export default {
  show: function(options) {
    if (typeof options !== 'object') {
      throw new Error('Expected `options` to be object.');
    }

    if (!options) {
      throw new Error('`options` is required.');
    }

    let { message, type } = options;

    if (!message) {
      throw new Error('`message` is required.');
    }

    if (!type) {
      throw new Error('`type` is required.');
    }

    MessageBarManager.showAlert({
      // Both 80 and 60 should same with variables in `_Header.js`.
      viewTopOffset: isIphoneX() ? 80 : 60,
      message,
      alertType: type,
      messageStyle: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16
      },
      // change default background color for success message bar
      stylesheetSuccess: {
        backgroundColor: '#4cba7f',
        strokeColor: '#4cba7f'
      }
    });
  }
};
