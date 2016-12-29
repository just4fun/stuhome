import React, { Component } from 'react';
import {
  View,
  Text,
  Modal,
  PickerIOS
} from 'react-native';
import modalStyles from '../../styles/common/_Modal';
import styles from '../../styles/components/modal/_TopicTypeModal';
import Header from '../Header';

export default class TopicTypeModal extends Component {
  constructor(props) {
    super(props);

    this.initTypeId();
  }

  initTypeId() {
    let { types, selectedTypeId } = this.props;
    let typeId = selectedTypeId;

    if (!typeId && (types && types.length)) {
      typeId = types[0].typeId;
    }

    this.state = {
      typeId
    };
  }

  _setTopicType() {
    this.props.setTopicType(this.state.typeId);
    this.props.closeTopicTypeModal();
  }

  render() {
    let { types } = this.props;

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
              onPress={() => this._setTopicType()}>
              确定
            </Text>
            <PickerIOS
              selectedValue={this.state.typeId}
              onValueChange={typeId => {
                this.setState({ typeId });
              }}>
              {types.map(type => {
                return (
                  <PickerIOS.Item
                    key={type.typeId}
                    value={type.typeId}
                    label={type.typeName} />
                );
              })}
            </PickerIOS>
          </View>
        </View>
      </Modal>
    );
  }
}
