import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import styles from '../styles/components/_KeyboardAccessory';
import scrollableTabViewStyles from '../styles/common/_ScrollableTabView';
import colors from '../styles/common/_colors';
import MEMES from '../constants/memes'

export default class KeyboardAccessory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otherPanelheight: new Animated.Value(0),
    };
  }

  componentDidUpdate() {
    Animated.timing(this.state.otherPanelheight, {
      duration: 300,
      toValue: this.props.selectedPanel !== 'keyboard' ? 200 : 0
    }).start();
  }

  renderTabBar() {
    return (
      <Image
        style={styles.groupMeme}
        source={require('../images/meme/lu/01.gif')} />
    );
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
            <ScrollableTabView
              renderTabBar={() => this.renderTabBar()}
              tabBarBackgroundColor={colors.lightBlue}
              tabBarActiveTextColor={colors.white}
              tabBarInactiveTextColor={colors.white}
              tabBarUnderlineStyle={scrollableTabViewStyles.tabBarUnderline}
              tabBarTextStyle={scrollableTabViewStyles.tabBarText}
              tabBarPosition='bottom'>
                {Object.keys(MEMES).map((key, groupIndex) => {
                  return (
                    <ScrollView
                      key={groupIndex}
                      horizontal={true}>
                      {Object.keys(MEMES[key]).map((itemKey, index) => {
                        return (
                          <Image
                            key={index}
                            style={styles.image}
                            source={{ uri: MEMES[key][itemKey].image }} />
                        );
                      })}
                    </ScrollView>
                  );
                })}
            </ScrollableTabView>
          </Animated.View>
        }
      </View>
    );
  }
}
