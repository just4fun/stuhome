import { StyleSheet } from 'react-native';
import Dimensions from 'Dimensions';
import colors from '~/common/styles/colors.style';

const window = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    height: window.height,
    paddingTop: 30,
  },
  blur: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: null,
    height: null
  },
  menus: {
    marginTop: 20
  },
  menuFooter: {
    flexDirection: 'row',
    position: "absolute",
    left: 30,
    right: 30,
    bottom: 0,
    // borderTopWidth: 1,
    // borderTopColor: colors.underlay,
    justifyContent: 'center',
  },
  menuBottomItemWrapper: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  menuBottomSettings: {
    justifyContent: 'flex-start',
  },
  menuBottomLogout: {
    justifyContent: 'flex-end',
  },
});
