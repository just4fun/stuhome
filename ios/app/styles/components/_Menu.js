import { StyleSheet } from 'react-native';
import Dimensions from 'Dimensions';

const window = Dimensions.get('window');

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    width: window.width * 2 / 3,
    height: window.height,
    borderRightWidth: 1,
    borderRightColor: '#ddd',
    backgroundColor: '#fff',
    paddingTop: 30,
  },
  menuHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingLeft: 30,
    paddingBottom: 15
  },
  avatar: {
    height: 70,
    width: 70,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  item: {
    fontSize: 18,
    paddingTop: 10,
    paddingLeft: 30,
    paddingBottom: 10,
  }
});
