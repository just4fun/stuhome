import React, {
  Component,
  View,
  Text,
  TextInput,
  Modal,
  TouchableHighlight
} from 'react-native';
import Header from './Header';
import styles from '../styles/components/_ReplyModal';

export default class ReplayModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: this.props.visible || false,
      replyContent: ''
    };
    this.title = this.props.title || '评论';
  }

  openReplyModal() {
    this.setState({
      isModalOpen: true
    });
  }

  handleCancel() {
    this.setState({
      isModalOpen: false,
      replyContent: ''
    });
  }

  render() {
    return (
      <Modal
        animated={true}
        transparent={false}
        style={styles.container}
        visible={this.state.isModalOpen}>
        <Header title={this.title}>
          <Text style={styles.button} onPress={this.handleCancel.bind(this)}>取消</Text>
          <Text style={styles.button} onPress={this.props.handlePublish}>发布</Text>
        </Header>
        <TextInput
          placeholder='同学，请文明用语噢～'
          style={styles.replyBox}
          autoFocus={true}
          multiline={true} />
      </Modal>
    );
  }
}
