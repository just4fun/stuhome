import { StyleSheet } from 'react-native';
import colors from '~/common/styles/colors.style';

export default StyleSheet.create({
  disabledForm: {
    backgroundColor: colors.disable,
  },
  replyBox: {
    padding: 10,
    // To overwrite `paddingTop: 5` which provided in new RN version.
    paddingTop: 10,
    height: 200,
    fontSize: 16,
    color: colors.significantField,
  },
  formItem: {
    borderBottomWidth: 1,
    borderBottomColor: colors.underlay,
  },
  upload: {
    padding: 10,
  },
  keyboardAccessoryContainer: {
    flexDirection: 'row',
    height: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  keyboardAccessoryItem: {
    color: '#979797',
    width: 40
  }
});
