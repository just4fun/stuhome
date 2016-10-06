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
  _isCurrentRoute(routeId) {
    let { router } = this.props;
    return router && router.isCurrentRoute(routeId);
  }

  render() {
    let { menu, router } = this.props;
    let { title, icon, actionName } = menus[menu];

    return (
      <TouchableHighlight
        underlayColor={colors.underlay}
        onPress={() => {
          this.props.updateMenuState(false);
          router[actionName]();
        }}>
        <View style={[styles.row, this._isCurrentRoute(menu) && styles.selectedRow]}>
          <Icon style={[styles.icon, this._isCurrentRoute(menu) && styles.selectedItem]} name={icon} size={20} />
          <Text style={[styles.item, this._isCurrentRoute(menu) && styles.selectedItem]}>{title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

module.exports = MenuItem;
