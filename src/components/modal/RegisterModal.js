import React, { Component } from 'react';
import { View } from 'react-native';
import WebPage from '../../containers/WebPage';
import Header from '../../components/Header';
import { PopButton } from '../../components/button';
import { REGISTER_URL } from '../../config';
import mainStyles from '../../styles/components/_Main';

export default class RegisterModal extends Component {
  render() {
    let { navigation } = this.props;
    return (
      <View style={mainStyles.container}>
        <Header title='注册'>
          <PopButton navigation={navigation} />
        </Header>
        <WebPage
          url={REGISTER_URL}
          {...this.props} />
      </View>
    );
  }
}
