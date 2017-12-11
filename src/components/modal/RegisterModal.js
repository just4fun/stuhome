import React, { Component } from 'react';
import { Modal } from 'react-native';
import WebPage from '../WebPage';
import { REGISTER_URL } from '../../config';

export default class RegisterModal extends Component {
  render() {
    return (
      <Modal
        animationType='slide'
        transparent={false}
        visible={this.props.visible}>
        <WebPage
          title='注册'
          url={REGISTER_URL}
          action={() => this.props.closeRegisterModal()}
          {...this.props} />
      </Modal>
    );
  }
}
