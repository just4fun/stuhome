import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  AlertIOS,
  AsyncStorage,
  Navigator,
  Modal,
  findNodeHandle
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'apsl-react-native-button';
import styles from '../../styles/components/modal/_LoginModal';
import Header from '../Header';
import RegisterModal from './RegisterModal';
import { PopButton } from '../button';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      password: '',
      isRegisterModalOpen: false
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
          // remove all cache except authrization
          this.props.cleanCache({ isLogin: true });
          // force replace Home route
          this.props.selectMenuItem(this.props.menus['home'], true);
          this._closeLoginModal();
        });
    }
  }

  _closeLoginModal() {
    this.props.closeLoginModal();
  }

  _handleSubmit(userName, password) {
    if (!userName.length) {
      AlertIOS.alert('提示', '请输入用户名');
      return;
    }

    if (!password.length) {
      AlertIOS.alert('提示', '请输入密码');
      return;
    }

    this.userNameInput.blur();
    this.passwordInput.blur();
    this.props.userLogin({
      userName,
      password
    });
  }

  toggleRegisterModal(visible) {
    this.setState({
      isRegisterModalOpen: visible
    });
  }

  render() {
    let logo = require('../../images/logo_transparent.png');
    let { isFetching } = this.props.user;
    let { userName, password, isRegisterModalOpen } = this.state;
    let isDisabled = !userName || !password || isFetching;

    return (
      <Modal
        animationType='slide'
        transparent={false}
        visible={this.props.visible}>
        <Image
          source={require('../../images/shahe.jpg')}
          style={styles.blur} />
        {isRegisterModalOpen &&
          <RegisterModal
            visible={isRegisterModalOpen}
            closeRegisterModal={() => this.toggleRegisterModal(false)} />
        }
        <Header style={styles.header}>
          <PopButton action={() => this._closeLoginModal()} />
          <Text style={styles.register}
                onPress={() => this.toggleRegisterModal(true)}>
            注册
          </Text>
        </Header>
        <KeyboardAwareScrollView>
          <View>
            <View style={styles.top}>
              <Image
                style={styles.avatar}
                source={logo} />
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
                onSubmitEditing={() => this._handleSubmit(userName, password)}
                enablesReturnKeyAutomatically={true}
                secureTextEntry={true} />
              <Button
                style={[styles.formItem, styles.formSubmit]}
                textStyle={styles.formSubmitText}
                isDisabled={isDisabled}
                isLoading={isFetching}
                onPress={() => this._handleSubmit(userName, password)}>
                登录
              </Button>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </Modal>
    );
  }
}
