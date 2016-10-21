import React, { Component } from 'react';
import {
  View,
  TextInput,
  AlertIOS
} from 'react-native';
import Button from 'apsl-react-native-button';
import styles from '../styles/components/_SearchInput';

export default class MenuProfile extends Component {
  componentWillReceiveProps(nextProps) {
    let { errCode } = nextProps;

    if (errCode) {
      AlertIOS.alert('提示', errCode);
      nextProps.resetSearch();
    }
  }

  _handleSearch() {
    this.searchInput.blur();
    this.props.handleSearch();
  }

  render() {
    let {
      isDisabled,
      isLoading,

      handleChange
    } = this.props;

    return (
      <View style={styles.container}>
        <TextInput
          ref={component => this.searchInput = component}
          style={styles.input}
          onChangeText={keyword => handleChange(keyword)}
          placeholder='请输入关键字'
          autoFocus={true} />
        <Button
          style={styles.submit}
          isDisabled={isDisabled}
          isLoading={isLoading}
          onPress={() => this._handleSearch()}>
          搜索
        </Button>
      </View>
    );
  }
}
