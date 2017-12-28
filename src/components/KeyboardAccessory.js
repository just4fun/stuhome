import React, { Component } from 'react';
import {
  View,
  Text,
  Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/components/_KeyboardAccessory';

export default class KeyboardAccessory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otherPanelheight: new Animated.Value(0),
    };
  }

  componentWillReceiveProps(nextProps) {
    Animated.timing(this.state.otherPanelheight, {
      duration: 300,
      toValue: nextProps.selectedPanel !== 'keyboard' ? 200 : 0
    }).start();
  }

  render() {
    let { style, selectedPanel } = this.props;

    return (
      <View style={[styles.container, style]}>
        <View style={styles.selection}>
          {selectedPanel === 'meme' &&
            <Icon
              style={styles.item}
              name='keyboard-o'
              size={30}
              onPress={() => this.props.handleSelect('keyboard')} />
            ||
            <Icon
              style={styles.item}
              name='smile-o'
              size={30}
              onPress={() => this.props.handleSelect('meme')} />
          }
        </View>
        {selectedPanel === 'meme' &&
          <Animated.View style={[styles.otherPanel, { height: this.state.otherPanelheight }]}>

          </Animated.View>
        }
      </View>
    );
  }
}
