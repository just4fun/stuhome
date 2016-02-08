import React, {
  Component,
  View,
  Text,
  TextInput,
  Modal,
} from 'react-native';
import modalStyles from '../../styles/common/_Modal';
import styles from '../../styles/components/modal/_PublishModal';
import Header from '../Header';
import { resetPublish } from '../../actions/topic/topicAction';

export default class PublishModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: !!this.props.visible,
      typeId: null,
      title: '',
      content: ''
    };
    this.title = this.props.title || '发表新主题';
  }

  componentWillReceiveProps(nextProps) {
    const comment = nextProps.comment;
    if (comment.response && comment.response.rs) {
      this.handleCancel();
      this.props.dispatch(resetPublish());
      // this.props.fetchTopic();
    }
  }

  openPublishModal() {
    this.setState({
      isModalOpen: true
    });
  }

  handleCancel() {
    this.setState({
      isModalOpen: false,
      typeId: null,
      title: '',
      content: ''
    });
  }

  _isFormValid() {
    let { typeId, title, content } = this.state;

    return typeId !== null
        && title.length
        && content.length
        && !this.props.comment.isPublishing;
  }

  render() {
    let { typeId, title, content } = this.state;

    return (
      <Modal
        animated={true}
        transparent={false}
        style={modalStyles.container}
        visible={this.state.isModalOpen}>
        <Header title={this.title}>
          <Text
            style={modalStyles.button}
            onPress={() => this.handleCancel()}>
            取消
          </Text>
          {this._isFormValid() &&
            <Text
              style={modalStyles.button}
              onPress={() => this.props.handlePublish({
                typeId,
                title,
                content
              })}>
              发布
            </Text>
            ||
            <Text
              style={[modalStyles.button, modalStyles.disabled]}>
              发布
            </Text>
          }
        </Header>
      </Modal>
    );
  }
}
