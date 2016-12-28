import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  AlertIOS,
  AsyncStorage,
  Navigator,
  Modal
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
      isModalOpen: !!this.props.visible,
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
          // remove all cache except authrization
          this.props.cleanCache(true);
          // force replace Home route
          this.props.selectMenuItem(this.props.menus['home'], true);
          this._closeLoginModal();
        });
    }
  }

  _openLoginModal() {
    this.setState({
      isModalOpen: true
    });
  }

  _closeLoginModal() {
    this.setState({
      isModalOpen: false,
      userName: '',
      password: ''
    });
  }

  _handleSubmit(userName, password) {
    this.userNameInput.blur();
    this.passwordInput.blur();
    this.props.userLogin(userName, password);
  }

  render() {
    let logo = require('../../images/logo.png');
    let { isFetching } = this.props.user;
    let { userName, password } = this.state;
    let isDisabled = !userName || !password || isFetching;

    return (
      <Modal
        animationType='slide'
        transparent={false}
        visible={this.state.isModalOpen}>
        <RegisterModal
          ref={component => this._registerModal = component}
          visible={false} />
        <Header title='登录'>
          <PopButton action={() => this._closeLoginModal()} />
          <Text style={styles.register}
                onPress={() => this._registerModal.openRegisterModal()}>
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
                autoFocus={true} />
              <TextInput
                ref={component => this.passwordInput = component}
                style={[styles.formItem, styles.formInput]}
                onChangeText={text => this.setState({ password: text })}
                placeholder='请输入密码'
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
