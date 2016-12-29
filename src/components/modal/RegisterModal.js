import React, { Component } from 'react';
import { Modal } from 'react-native';
import WebPage from '../WebPage';

export default class RegisterModal extends Component {
  render() {
    return (
      <Modal
        animationType='slide'
        transparent={false}
        visible={this.props.visible}>
        <WebPage
          title='注册'
          url='http://bbs.uestc.edu.cn/member.php?mod=register'
          action={() => this.props.closeRegisterModal()}
          {...this.props} />
      </Modal>
    );
  }
}
