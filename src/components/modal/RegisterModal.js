import React, { Component } from 'react';
import { Modal } from 'react-native';
import WebPage from '../WebPage';

export default class RegisterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: !!this.props.visible
    };
  }

  openRegisterModal() {
    this.setState({
      isModalOpen: true
    });
  }

  handleCancel() {
    this.setState({
      isModalOpen: false
    });
  }

  render() {
    let { types } = this.props;

    return (
      <Modal
        animationType='slide'
        transparent={false}
        visible={this.state.isModalOpen}>
        <WebPage
          title='注册'
          url='http://bbs.uestc.edu.cn/member.php?mod=register'
          action={() => this.handleCancel()}
          {...this.props} />
      </Modal>
    );
  }
}
