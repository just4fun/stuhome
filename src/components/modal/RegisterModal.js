import React, { Component } from 'react';
import WebPage from '../WebPage';
import { REGISTER_URL } from '../../config';

export default class RegisterModal extends Component {
  render() {
    return (
      <WebPage
        title='注册'
        url={REGISTER_URL}
        action={() => this.props.closeRegisterModal()}
        {...this.props} />
    );
  }
}
