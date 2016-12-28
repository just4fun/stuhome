import React, { Component } from 'react';
import {
  View,
  WebView
} from 'react-native';
import Header from '../components/Header';
import { PopButton } from '../components/button';
import mainStyles from '../styles/components/_Main';

export default class WebPage extends Component {
  render() {
    let {
      action,
      url,
      passProps,
      router,
      title
    } = this.props;

    return (
      <View style={mainStyles.container}>
        <Header title={title || passProps.title || '浏览器'}>
          <PopButton router={router} action={action} />
        </Header>
        <WebView
          automaticallyAdjustContentInsets={false}
          source={{ uri: url || passProps.url }}
          decelerationRate="normal"
          startInLoadingState={true} />
      </View>
    );
  }
}
