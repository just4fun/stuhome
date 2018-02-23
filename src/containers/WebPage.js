import React, { Component } from 'react';
import { WebView } from 'react-native';

export default class WebPage extends Component {
  static navigationOptions = ({ navigation }) => {
    let { title } = navigation.state.params;
    return {
      title
    };
  }

  render() {
    let {
      url,
      title,
      navigation,
      navigation: {
        state: {
          params
        }
      }
    } = this.props;

    return (
      <WebView
        automaticallyAdjustContentInsets={false}
        source={{ uri: url || (params && params.url) }}
        decelerationRate="normal"
        startInLoadingState={true} />
    );
  }
}
