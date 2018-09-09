import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SettingItem from '~/components/SettingItem/SettingItem';
import FONT_SIZES from '~/constants/fontSize';
import { storeSettingsToStorage } from '~/modules/settings/settings.ducks';

import mainStyles from '~/common/styles/Main.style';
import settingsStyles from '~/containers/Settings/Settings.style';
import settingsItemStyles from '~/components/SettingItem/SettingItem.style';
import styles from '~/containers/SettingsFontSize/SettingsFontSize.style';

class SettingsFontSize extends Component {
  static navigationOptions = {
    title: '字号大小'
  }

  storeFontSize(fontSize) {
    this.props.storeSettingsToStorage({ fontSize });
  }

  render() {
    let { settings } = this.props;

    return (
      <View style={[mainStyles.container, styles.container]}>
        <View style={settingsStyles.group}>
          {FONT_SIZES.map((item, index) => (
            <SettingItem
              key={index}
              text={item.text}
              onPress={() => this.storeFontSize(item.value)}>
              <Text style={settingsItemStyles.indicator}>
                {settings.fontSize === item.value && <Icon style={styles.check} name='check' />}
              </Text>
            </SettingItem>
          ))}
        </View>
      </View>
    );
  }
}

function mapStateToProps({ settings }) {
  return {
    settings
  };
}

export default connect(mapStateToProps, {
  storeSettingsToStorage
})(SettingsFontSize);
