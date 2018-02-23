import { StyleSheet } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import colors from '../common/_colors';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.blue,
    borderBottomWidth: 1,
    borderBottomColor: colors.underlay,
    justifyContent: 'center',
    // This is workaround to adjust iPhone X for modal Card,
    // see more information in `Navigator.js`.
    ...ifIphoneX({
      height: 80,
      paddingTop: 50
    }, {
      height: 60,
      paddingTop: 30
    })
  },
  left: {
    flex: 1,
    textAlign: 'left',
    paddingLeft: 15,
    paddingTop: 2,
    color: colors.white
  },
  title: {
    width: 150,
    fontSize: 18,
    textAlign: 'center',
    color: colors.white
  },
  right: {
    flex: 1,
    textAlign: 'right',
    paddingRight: 15,
    paddingTop: 2,
    color: colors.white
  },
  rightIndicator: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 15,
    height: 20,
  }
});
