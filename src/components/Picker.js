import React, { Component } from 'react';
import {
  View,
  Text,
  Modal,
  PickerIOS
} from 'react-native';
import modalStyles from '../styles/common/_Modal';
import styles from '../styles/components/_Picker';
import Header from './Header';

export default class Picker extends Component {
  constructor(props) {
    super(props);

    this.initId();
  }

  initId() {
    let { list, selectedId } = this.props;
    let id = selectedId;

    if (!id && (list && list.length)) {
      id = list[0].id;
    }

    this.state = {
      id
    };
  }

  setSelection() {
    this.props.setSelection(this.state.id);
    this.props.closePicker();
  }

  render() {
    let { list } = this.props;

    return (
      <Modal
        animationType='none'
        transparent={true}
        visible={this.props.visible}>
        <View
          style={[modalStyles.container, styles.backdrop]}>
          <View
            style={styles.main}>
            <Text
              style={[modalStyles.button, styles.button]}
              onPress={() => this.setSelection()}>
              确定
            </Text>
            <PickerIOS
              selectedValue={this.state.id}
              onValueChange={id => {
                this.setState({ id });
              }}>
              {list.map(item => {
                return (
                  <PickerIOS.Item
                    key={item.id}
                    value={item.id}
                    label={item.name} />
                );
              })}
            </PickerIOS>
          </View>
        </View>
      </Modal>
    );
  }
}
