import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';

const window = Dimensions.get('window');

export default class EmojiTabBar extends Component {
  render() {
    return (
      <View style={styles.container}>
        {this.props.tabs.map((image, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={[styles.imageWrapper, this.props.activeTab === index && styles.activeImage]}
              onPress={() => this.props.goToPage(index)}>
              <Image
                style={styles.image}
                source={{ uri: image }} />
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
    alignItems: 'center',
    backgroundColor: 'white'
  },
  imageWrapper: {
    height: 50,
    // 9 is the number of emoji groups
    width: window.width / 9,
    justifyContent: 'center',
  },
  activeImage: {
    backgroundColor: '#f6f6f6',
  },
  image: {
    height: 40,
    width: 40
  }
});
