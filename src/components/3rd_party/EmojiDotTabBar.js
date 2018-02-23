import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';

const window = Dimensions.get('window');

export default class EmojiDotTabBar extends Component {
  render() {
    return (
      <View style={styles.container}>
        {this.props.tabs.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={[styles.dotWrapper, this.props.activeTab === index && styles.activeDot]}
              onPress={() => this.props.goToPage(index)}>
              <View style={[styles.dot, this.props.activeTab === index && styles.activeDot]}></View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: window.width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dotWrapper: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 3,
  },
  dot: {
    backgroundColor: '#d6d6d6',
    height: 8,
    width: 8,
    borderRadius: 4,
    marginLeft: 1,
    marginTop: 1
  },
  activeDot: {
    backgroundColor: '#8b8b8b',
  }
});
