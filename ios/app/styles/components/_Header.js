import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    justifyContent: 'center',
    paddingTop: 30
  },
  left: {
    flex: 1,
    textAlign: 'left',
    paddingLeft: 15
  },
  title: {
    flex: 2,
    fontSize: 18,
    textAlign: 'center'
  },
  right: {
    flex: 1,
    textAlign: 'right',
    paddingRight: 15
  }
});
