import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Keyboard,
  AlertIOS,
  AsyncStorage,
  Navigator,
  findNodeHandle
} from 'react-native';
import Button from 'apsl-react-native-button';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PopButton from '~/components/PopButton/PopButton';
import Header from '~/components/Header/Header';
import SafariView from '~/services/SafariView';
import { REGISTER_URL } from '~/config';
import {
  login,
  resetSession,
  resetSessionResult,
  logout
} from '~/common/modules/user/session.ducks';

import mainStyles from '~/common/styles/Main.style';
import styles from './LoginModal.style';

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Main' })
  ]
});

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    let { isFetching, data, hasError, result } = nextProps.session;

    if (hasError) {
      AlertIOS.alert('提示', data.errcode);
      nextProps.resetSession();
    }

    if (result) {
      this.props.resetSessionResult();
      data = JSON.stringify(data);
      AsyncStorage.setItem('session', data)
        .then(() => {
          // Remove all cache except session.
          this.props.logout({ isLogin: true });
          // Back home page.
          this.props.navigation.dispatch(resetAction);
        });
    }
  }

  handleSubmit(userName, password) {
    if (!userName.length) {
      AlertIOS.alert('提示', '请输入用户名');
      return;
    }

    if (!password.length) {
      AlertIOS.alert('提示', '请输入密码');
      return;
    }

    Keyboard.dismiss();
    this.props.login({
      userName,
      password
    });
  }

  render() {
    let {
      session: {
        isFetching
      },
      navigation
    } = this.props;
    let { userName, password } = this.state;
    let isDisabled = !userName || !password || isFetching;

    return (
      <View style={mainStyles.container}>
        <Image
          source={require('~/images/shahe.jpg')}
          style={styles.blur} />
        <Header style={styles.header}>
          <PopButton navigation={navigation} />
          <Text
            style={styles.register}
            onPress={() => SafariView.show(REGISTER_URL)}>
            注册
          </Text>
        </Header>
        <KeyboardAwareScrollView>
          <View>
            <View style={styles.top}>
              <Image
                style={styles.avatar}
                source={require('~/images/logo_transparent.png')} />
            </View>
            <View style={styles.form}>
              <TextInput
                ref={component => this.userNameInput = component}
                style={[styles.formItem, styles.formInput]}
                onChangeText={text => this.setState({ userName: text })}
                placeholder='请输入用户名'
                returnKeyType='next'
                onSubmitEditing={() => this.passwordInput.focus()}
                enablesReturnKeyAutomatically={true}
                autoFocus={true} />
              <TextInput
                ref={component => this.passwordInput = component}
                style={[styles.formItem, styles.formInput]}
                onChangeText={text => this.setState({ password: text })}
                placeholder='请输入密码'
                returnKeyType='go'
                onSubmitEditing={() => this.handleSubmit(userName, password)}
                enablesReturnKeyAutomatically={true}
                secureTextEntry={true} />
              <Button
                style={[styles.formItem, styles.formSubmit]}
                textStyle={styles.formSubmitText}
                isDisabled={isDisabled}
                isLoading={isFetching}
                onPress={() => this.handleSubmit(userName, password)}>
                登录
              </Button>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

function mapStateToProps({ session }) {
  return {
    session
  };
}

export default connect(mapStateToProps, {
  login,
  resetSession,
  resetSessionResult,
  logout
})(LoginModal);
