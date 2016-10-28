import { StyleSheet } from 'react-native';
import Dimensions from 'Dimensions';
import colors from '../common/_colors';

const window = Dimensions.get('window');


export default StyleSheet.create({
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
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  checkbox: {
    width: 18,
    height: 18
  },
  checkboxLabel: {
    fontSize: 13,
    // window.width - (window-padding * 2 + topic-content-padding * 2 + checkbox-width + checkbox-label-marginLeft)
    width: window.width - (10 * 2 + 10 * 2 + 18 + 10)
  },
  checkboxLabelOnly: {
    flex: 1,
    fontSize: 13,
    marginTop: 1,
    color: 'grey',
  },
  text: {
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
