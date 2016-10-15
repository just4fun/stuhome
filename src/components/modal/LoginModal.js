import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  AlertIOS,
  AsyncStorage,
  Navigator,
  Modal
} from 'react-native';
import Button from 'apsl-react-native-button';
import mainStyles from '../../styles/components/_Main';
import styles from '../../styles/components/modal/_LoginModal';

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
          this.props.selectMenuItem({
            title: '最新',
            actionName: 'toHome'
          });
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
    let { isFetching } = this.props.user;
    let { userName, password } = this.state;
    let isDisabled = !userName || !password || isFetching;

    return (
      <Modal
        animationType='slide'
        transparent={false}
        visible={this.state.isModalOpen}>
        <View style={mainStyles.container}>
          <Text
            style={styles.close}
            onPress={() => this._closeLoginModal()}>
            &times;
          </Text>
          <View style={styles.top}>
            <Text style={styles.title}>清水河畔</Text>
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
      </Modal>
    );
  }
}
