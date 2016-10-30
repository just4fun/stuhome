import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import mainStyles from '../styles/components/_Main';
import scrollableTabViewStyles from '../styles/common/_ScrollableTabView';
import colors from '../styles/common/_colors';
import Header from '../components/Header';
import { PopButton } from '../components/button';

export default class Message extends Component {
  render() {
    return (
      <View style={mainStyles.container}>
        <Header title='消息'
                updateMenuState={isOpen => this.props.updateMenuState(isOpen)} />
        <ScrollableTabView
          tabBarBackgroundColor={colors.lightBlue}
          tabBarActiveTextColor={colors.white}
          tabBarInactiveTextColor={colors.white}
          tabBarUnderlineStyle={scrollableTabViewStyles.tabBarUnderline}
          tabBarTextStyle={scrollableTabViewStyles.tabBarText}>
          <View
            tabLabel='@' />
          <View
            tabLabel='回复' />
          <View
            tabLabel='私信' />
        </ScrollableTabView>
      </View>
    );
  }
}
