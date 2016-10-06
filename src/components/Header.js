import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/components/_Header';
import { MenuButton } from './button';

export default class Header extends Component {
  render() {
    let leftTopButton = null;
    let rightTopButton = null;
    const buttons = this.props.children;
    const count = React.Children.count(buttons);

    switch (count) {
      case 0:
        leftTopButton = <MenuButton updateMenuState={isOpen => this.props.updateMenuState(isOpen)} style={styles.left} />;
        break;
      case 1:
        leftTopButton = React.cloneElement(buttons, { style: [styles.left, buttons.props.style] });
        break;
      case 2:
        leftTopButton = React.cloneElement(buttons[0], { style: [styles.left, buttons[0].props.style] });
        rightTopButton = React.cloneElement(buttons[1], { style: [styles.right, buttons[1].props.style] });
        break;
    }

    return (
      <View style={styles.container}>
        {leftTopButton}
        <Text
          style={styles.title}
          numberOfLines={1}>
          {this.props.title}
        </Text>
        {rightTopButton || <Text style={styles.right}></Text>}
      </View>
    );
  }
}
