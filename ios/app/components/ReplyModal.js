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
import { resetPublish } from '../actions/topic/topicAction';

export default class ReplayModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: !!this.props.visible,
      replyContent: ''
    };
    this.title = this.props.title || '评论';
  }

  componentWillReceiveProps(nextProps) {
    const comment = nextProps.comment;
    if (comment.response && comment.response.rs) {
      this.handleCancel();
      this.props.dispatch(resetPublish());
      this.props.fetchTopic();
    }
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
          <Text
            style={styles.button}
            onPress={this.handleCancel.bind(this)}>
            取消
          </Text>
          {(this.state.replyContent.length && !this.props.comment.isPublishing ) &&
            <Text
              style={styles.button}
              onPress={() => this.props.handlePublish(this.state.replyContent)}>
              发布
            </Text>
            ||
            <Text
              style={[styles.button, styles.disabled]}>
              发布
            </Text>
          }
        </Header>
        <TextInput
          placeholder='同学，请文明用语噢～'
          style={styles.replyBox}
          value={this.state.replyContent}
          onChangeText={(text) => this.setState({ replyContent: text })}
          autoFocus={true}
          multiline={true} />
      </Modal>
    );
  }
}
