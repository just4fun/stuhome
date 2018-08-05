import { StyleSheet } from 'react-native';
import Dimensions from 'Dimensions';
import colors from '~/common/styles/colors.style';

const window = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  text: {
    color: colors.mainField,
  },
  item: {
    marginVertical: 5,
  },
  imageWrapper: {
    width: window.width - 10 * 2,
  },
  image: {
    marginVertical: 5,
  },
  url: {
    color: colors.link,
  }
});
