import { StyleSheet } from 'react-native';
import colors from '../common/_colors';

export default StyleSheet.create({
  reward: {
    marginBottom: 10,
  },
  rewardHeader: {
    height: 20,
    marginHorizontal: -10,
    backgroundColor: '#fff4dd',
  },
  rewardHeaderText: {
    fontSize: 12,
    marginLeft: 10,
    marginTop: 3,
    color: '#f26c4f',
  },
  rewardUserList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  rewardUser: {
    marginTop: 10,
    marginRight: 10,
    height: 40,
    width: 40,
    borderRadius: 20
  },
  more: {
    padding: 14,
    borderWidth: 1,
    color: colors.mainField,
    borderColor: colors.underlay,
  },
});
