
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
      url,
      navigation,
      navigation: {
        state: {
          params
        }
      },
      title
    } = this.props;

    return (
      <View style={mainStyles.container}>
        <Header title={title || params.title || '浏览器'}>
          <PopButton navigation={navigation} />
        </Header>
        <WebView
          automaticallyAdjustContentInsets={false}
          source={{ uri: url || params.url }}
          decelerationRate="normal"
          startInLoadingState={true} />
      </View>
    );
  }
}
