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
    let {
      alertCount,
      children,
      style,
      title,
      isPublishFromHomePage
    } = this.props;

    let leftTopButton = <MenuButton style={styles.left}
                                    alertCount={alertCount}
                                    updateMenuState={isOpen => this.props.updateMenuState(isOpen)} />;
    let rightTopButton = null;
    let count = React.Children.count(children);

    switch (count) {
      case 1:
        if (isPublishFromHomePage) {
          rightTopButton = React.cloneElement(children, { style: [styles.right, children.props.style] });
        } else {
          leftTopButton = React.cloneElement(children, { style: [styles.left, children.props.style] });
        }
        break;
      case 2:
        leftTopButton = React.cloneElement(children[0], { style: [styles.left, children[0].props.style] });

        const isActivityIndicator = children[1].type.displayName === 'ActivityIndicator';
        rightTopButton = React.cloneElement(children[1], {
          style: [
            isActivityIndicator ? styles.rightIndicator : styles.right,
            children[1].props.style
          ]
        });
        break;
    }

    return (
      <View style={[styles.container, style]}>
        {leftTopButton}
        <Text
          style={styles.title}
          numberOfLines={1}>
          {title}
        </Text>
        {rightTopButton || <Text style={styles.right}></Text>}
      </View>
    );
  }
}
