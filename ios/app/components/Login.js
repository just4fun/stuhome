import React, {
  Component,
  StyleSheet,
  View,
  Text,
  TextInput
} from 'react-native';
import Button from 'react-native-button';

var styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5FCFF'
  },
  formItem: {
    height: 40,
    borderRadius: 5,
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
  },
  formSubmit: {
    color: '#fff',
    backgroundColor: '#93adc6',
    paddingTop: 5,
  },
});

export default class Login extends Component {
  render() {
    return (
      <View style={styles.form}>
        <TextInput
          style={[styles.formItem, styles.formInput]}
          placeholder='请输入用户名' />
        <TextInput
          style={[styles.formItem, styles.formInput]}
          placeholder='请输入密码' />
        <Button
          style={[styles.formItem, styles.formSubmit]}
          >
          登录
        </Button>
      </View>
    );
  }
}
