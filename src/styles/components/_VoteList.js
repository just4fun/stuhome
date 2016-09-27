import {
  StyleSheet
} from 'react-native';
import colors from '../common/_colors';

module.exports = StyleSheet.create({
  pollList: {
    marginVertical: 20
  },
  pollTitle: {
    color: colors.mainField
  },
  pollItemList: {
    marginTop: 20
  },
  pollItem: {
    marginBottom: 10
  },
  pollItemText: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  checkbox: {
    width: 18,
    height: 18
  },
  checkboxLabel: {
    fontSize: 13
  },
  checkboxLabelOnly: {
    fontSize: 13,
    marginTop: 1,
    marginRight: 10,
    color: 'grey',
  },
  text: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 1,
  },
  percentText: {
    color: colors.mainField,
    fontSize: 13
  },
  totalNumberText: {
    marginLeft: 5,
    fontSize: 13
  },
  pollItemPercentageBackground: {
    height: 10,
    backgroundColor: '#e3e3e3',
    borderRadius: 5
  },
  pollItemPercentage: {
    height: 10,
    borderRadius: 5
  },
  submit: {
    width: 50,
    height: 30
  },
  submitText: {
    fontSize: 14,
  },
  pollStatusText: {
    color: colors.mainField,
    marginTop: 20
  }
});
