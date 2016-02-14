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

export default class TopicTypeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: !!this.props.visible,
      type: {
        typeId: null,
        typeName: null
      },
    };
  }

  openTopicTypeModal() {
    this.setState({
      isModalOpen: true
    });

    // set first type as default
    if (!this.state.type.typeId) {
      this.setState({
        type: {
          typeId: this.props.types[0].classificationType_id,
          typeName: this.props.types[0].classificationType_name
        },
      });
    }
  }

  handleCancel() {
    this.setState({
      isModalOpen: false
    });
    this.props.setTopicType(this.state.type);
  }

  render() {
    let types = this.props.types;

    return (
      <Modal
        animated={false}
        transparent={true}
        visible={this.state.isModalOpen}>
        <View
          style={[modalStyles.container, styles.backdrop]}>
          <PickerIOS
            style={styles.typePicker}
            selectedValue={this.state.type.typeId}
            onValueChange={typeId => {
              this.setState({type: {
                typeId,
                typeName: types[typeId].classificationType_name
              }}),
              this.handleCancel();
            }}>
            {Object.keys(types).map(typeId => {
              return (
                <PickerIOS.Item
                  key={typeId}
                  value={typeId}
                  label={types[typeId].classificationType_name} />
              );
            })}
          </PickerIOS>
        </View>
      </Modal>
    );
  }
}
