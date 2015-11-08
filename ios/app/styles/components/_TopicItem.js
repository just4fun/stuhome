import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  title: {
    flex: 1,
    fontSize: 18,
    textAlign: 'left',
    padding: 10
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 10
  },
  name: {
    flex: 1,
    textAlign: 'left',
    color: '#B7B7B7',
    paddingLeft: 10
  },
  date: {
    flex: 1,
    textAlign: 'right',
    color: '#B7B7B7',
    paddingRight: 10
  }
});
