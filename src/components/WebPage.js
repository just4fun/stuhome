
import React, { Component } from 'react';
import {
  View,
  WebView
} from 'react-native';
import mainStyles from '../styles/components/_Main';

export default class WebPage extends Component {
  render() {
    let {
      url,
      navigation: {
        state: {
          params
        }
      }
    } = this.props;

    return (
      <View style={mainStyles.container}>
        <WebView
          automaticallyAdjustContentInsets={false}
          source={{ uri: url || params.url }}
          decelerationRate="normal"
          startInLoadingState={true} />
      </View>
    );
  }
}
