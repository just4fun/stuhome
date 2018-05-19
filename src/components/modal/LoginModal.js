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
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { PopButton } from '../../components/button';
import Button from 'apsl-react-native-button';
import mainStyles from '../../styles/components/_Main';
import styles from '../../styles/components/modal/_LoginModal';
import Header from '../Header';
import SafariView from '../../services/SafariView';
import { REGISTER_URL } from '../../config';
import {
  userLogin,
  resetAuthrization,
  resetAuthrizationResult,
  cleanCache
} from '../../actions/authorizeAction';

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
    let { isFetching, authrization, hasError, result } = nextProps.user;

    if (hasError) {
      AlertIOS.alert('提示', authrization.errcode);
      nextProps.resetAuthrization();
    }

    if (result) {
      this.props.resetAuthrizationResult();
      authrization = JSON.stringify(authrization);
      AsyncStorage.setItem('authrization', authrization)
        .then(() => {
          // Remove all cache except authrization.
          this.props.cleanCache({ isLogin: true });
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
    this.props.userLogin({
      userName,
      password
    });
  }

  render() {
    let {
      user: {
        isFetching
      },
      navigation
    } = this.props;
    let { userName, password } = this.state;
    let isDisabled = !userName || !password || isFetching;

    return (
      <View style={mainStyles.container}>
        <Image
          source={require('../../images/shahe.jpg')}
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
                source={require('../../images/logo_transparent.png')} />
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

function mapStateToProps({ user }) {
  return {
    user
  };
}

export default connect(mapStateToProps, {
  userLogin,
  resetAuthrization,
  resetAuthrizationResult,
  cleanCache
})(LoginModal);
