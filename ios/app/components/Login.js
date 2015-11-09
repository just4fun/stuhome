import React, {
  Component,
  View,
  Text,
  TextInput,
  AlertIOS,
  AsyncStorage,
  Navigator
} from 'react-native';
import styles from '../styles/components/_Login';
import Button from 'react-native-button';
import { userLogin, resetAuthrization } from '../actions/authorizeAction';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this._userNameValue = '';
    this._passwordValue = '';
  }

  componentWillReceiveProps(nextProps) {
    this.router = nextProps.router;
    let { isFetching, authrization, hasError } = nextProps.entity.user;

    if (hasError) {
      AlertIOS.alert('提示', authrization.errcode);
      nextProps.dispatch(resetAuthrization());
    }

    if (authrization.token) {
      authrization = JSON.stringify(authrization);
      AsyncStorage.setItem('authrization', authrization)
        .then(this.router.popToHome());
    }
  }

  _onSubmit() {
    if (this._userNameValue === '') {
      AlertIOS.alert('提示', '请输入用户名');
      return;
    }

    if (this._passwordValue === '') {
      AlertIOS.alert('提示', '请输入密码');
      return;
    }

    this.props.dispatch(userLogin(this._userNameValue, this._passwordValue));
  }

  render() {
    const { isFetching } = this.props.entity.user;

    return (
      <View style={styles.form}>
        <TextInput
          ref={component => this._userName = component}
          style={[styles.formItem, styles.formInput]}
          onChangeText={(text) => {
            this._userName.setNativeProps({ text: text });
            this._userNameValue = text;
          }}
          placeholder='请输入用户名'
          autoFocus={true}
          editable={!isFetching} />
        <TextInput
          ref={component => this._password = component}
          style={[styles.formItem, styles.formInput]}
          onChangeText={(text) => {
            this._password.setNativeProps({ text: text });
            this._passwordValue = text;
          }}
          placeholder='请输入密码'
          secureTextEntry={true}
          editable={!isFetching} />
        <Button
          style={[styles.formItem, styles.formSubmit]}
          onPress={this._onSubmit.bind(this)} >
          登录
        </Button>
      </View>
    );
  }
}
