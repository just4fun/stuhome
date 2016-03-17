import React, {
  Component,
  View,
  Text,
  TextInput,
  Modal,
  PickerIOS,
} from 'react-native';
import modalStyles from '../../styles/common/_Modal';
import styles from '../../styles/components/modal/_TopicTypeModal';
import Header from '../Header';

class TopicTypeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: !!this.props.visible,
      typeId: null
    };
  }

  openTopicTypeModal() {
    this.setState({
      isModalOpen: true
    });

    // set first type as default
    if (!this.state.typeId && this.props.types.length) {
      this.setState({ typeId: this.props.types[0].typeId });
    }
  }

  handleCancel() {
    this.setState({
      isModalOpen: false
    });
  }

  _setTopicType() {
    this.props.setTopicType(this.state.typeId);
    this.handleCancel();
  }

  render() {
    let { types } = this.props;

    return (
      <Modal
        animated={false}
        transparent={true}
        visible={this.state.isModalOpen}>
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

module.exports = TopicTypeModal;
