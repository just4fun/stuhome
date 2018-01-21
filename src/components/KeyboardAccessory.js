import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import styles from '../styles/components/_KeyboardAccessory';
import scrollableTabViewStyles from '../styles/common/_ScrollableTabView';
import EmojiTabBar from './3rd_party/EmojiTabBar';
import EmojiDotTabBar from './3rd_party/EmojiDotTabBar';
import colors from '../styles/common/_colors';
import MEMES from '../constants/memes'

const EMOJI_PAGE_SIZE = 7 * 3;

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
      toValue: this.props.selectedPanel !== 'keyboard' ? 250 : 0
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
              onPress={() => this.props.handlePanelSelect('keyboard')} />
            ||
            <Icon
              style={styles.item}
              name='smile-o'
              size={30}
              onPress={() => this.props.handlePanelSelect('meme')} />
          }
        </View>
        {selectedPanel === 'meme' &&
          <Animated.View style={{ height: this.state.otherPanelheight }}>
            <ScrollableTabView
              renderTabBar={(props) => <EmojiTabBar {...props} />}
              tabBarPosition='bottom'>
                {Object.keys(MEMES).map((key, groupIndex) => {
                  let pageView = [];
                  let totalCount = MEMES[key].length;
                  let pageCount = Math.ceil(totalCount / EMOJI_PAGE_SIZE);

                  for (let i = 0; i < pageCount; i++) {
                    let pageMemes = MEMES[key].slice(i * EMOJI_PAGE_SIZE, (i + 1) * EMOJI_PAGE_SIZE);
                    pageView.push(
                      <View
                        key={`${key}_group_${i}`}
                        style={styles.pageView}
                        tabLabel={`${key}_group_${i}`}>
                        {pageMemes.map((meme, memeIndex) => {
                          return (
                            <TouchableOpacity
                              key={memeIndex}
                              style={styles.image}
                              onPress={() => this.props.handleEmojiPress(meme)}>
                              <Image
                                style={styles.image}
                                source={{ uri: meme.image }} />
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    );
                  }

                  return (
                    <ScrollableTabView
                      key={groupIndex}
                      renderTabBar={(props) => <EmojiDotTabBar {...props} />}
                      tabLabel={MEMES[key][0].image}
                      tabBarPosition='bottom'>
                      {pageView}
                    </ScrollableTabView>
                  );
                })}
            </ScrollableTabView>
          </Animated.View>
        }
      </View>
    );
  }
}
