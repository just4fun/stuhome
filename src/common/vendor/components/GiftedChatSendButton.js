// This component is <Send /> from react-native-gifted-chat 0.3.0,
// just change the `label` property to another name to distinguish
// from the text for <LoadEarlier />.

import PropTypes from 'prop-types';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewPropTypes,
} from 'react-native';

export default class Send extends React.Component {
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.text.trim().length === 0 && nextProps.text.trim().length > 0 || this.props.text.trim().length > 0 && nextProps.text.trim().length === 0) {
  //     return true;
  //   }
  //   return false;
  // }
  render() {
    if (this.props.text.trim().length > 0) {
      return (
        <TouchableOpacity
          style={[styles.container, this.props.containerStyle]}
          onPress={() => {
            this.props.onSend({ text: this.props.text.trim() }, true);
          }}
          accessibilityTraits="button"
        >
          <View>
            {this.props.children || <Text style={[styles.text, this.props.textStyle]}>{this.props.sendButtonLabel}</Text>}
          </View>
        </TouchableOpacity>
      );
    }
    return <View />;
  }
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    justifyContent: 'flex-end',
  },
  text: {
    color: '#0084ff',
    fontWeight: '600',
    fontSize: 17,
    backgroundColor: 'transparent',
    marginBottom: 12,
    marginLeft: 10,
    marginRight: 10,
  },
});

Send.defaultProps = {
  text: '',
  onSend: () => {},
  sendButtonLabel: 'Send',
  containerStyle: {},
  textStyle: {},
};

Send.propTypes = {
  text: PropTypes.string,
  onSend: PropTypes.func,
  sendButtonLabel: PropTypes.string,
  containerStyle: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
};
