import React, { Component } from 'react';
import {
  View,
  WebView
} from 'react-native';
import mainStyles from '../styles/components/_Main';
import Header from '../components/Header';
import { PopButton } from '../components/button';

export default class Browser extends Component {
  render() {
    return (
      <View style={mainStyles.container}>
        <Header title='浏览器'>
          <PopButton router={this.props.router} />
        </Header>
        <WebView
          automaticallyAdjustContentInsets={false}
          source={{ uri: this.props.passProps.url }}
          decelerationRate="normal"
          startInLoadingState={true} />
        </View>
    );
  }
}
