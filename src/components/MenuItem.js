import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/components/_MenuItem';
import colors from '../styles/common/_colors';

const menus = {
  home: {
    title: '最新',
    icon: 'commenting',
    actionName: 'toHome'
  },

  forumList: {
    title: '版块',
    icon: 'comments',
    actionName: 'toForumList'
  }
};

class MenuItem extends Component {
  render() {
    let { menu, router, isCurrentRoute } = this.props;
    let currentMenu = menus[menu];
    let { title, icon, actionName } = currentMenu;

    return (
      <TouchableHighlight
        underlayColor={colors.underlay}
        onPress={() => this.props.selectMenuItem(currentMenu)}>
        <View style={[styles.row, isCurrentRoute(menu) && styles.selectedRow]}>
          <Icon style={[styles.icon, isCurrentRoute(menu) && styles.selectedItem]} name={icon} size={20} />
          <Text style={[styles.item, isCurrentRoute(menu) && styles.selectedItem]}>{title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

module.exports = MenuItem;
