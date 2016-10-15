import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  TouchableHighlight
} from 'react-native';
import mainStyles from '../../styles/components/_Main';
import modalStyles from '../../styles/common/_Modal';
import styles from '../../styles/components/modal/_ReplyModal';
import Header from '../Header';

export default class ReplyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: !!this.props.visible,
      replyContent: '',
      title: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    const comment = nextProps.comment;
    if (comment.response && comment.response.rs) {
      this.handleCancel();
      this.props.resetPublish();
      this.props.fetchTopic();
    }
  }

  openReplyModal(comment) {
    this.setState({
      isModalOpen: true,
      title: this._getTitle(comment),
      replyId: comment && comment.reply_posts_id || null
    });
  }

  _getTitle(comment) {
    if (comment) {
      // the topic author has no `position` field
      if (!comment.position) {
        return `回复 ${comment.user_nick_name}`;
      }

      return `回复 ${comment.reply_name}`;
    } 

    return '评论';
  }

  handleCancel() {
    this.setState({
      isModalOpen: false,
      replyContent: ''
    });
  }

  _handlePublish(content, replyId) {
    this.contentInput.blur();
    this.props.handlePublish(content, replyId);
  }

  render() {
    let { comment } = this.props;
    let { isModalOpen, title, replyContent, replyId } = this.state;

    return (
      <Modal
        animationType='slide'
        transparent={false}
        style={modalStyles.container}
        visible={isModalOpen}>
        <View style={mainStyles.container}>
          <Header title={title}>
            <Text
              style={modalStyles.button}
              onPress={() => this.handleCancel()}>
              取消
            </Text>
            {(replyContent.length && !comment.isPublishing ) &&
              <Text
                style={modalStyles.button}
                onPress={() => this._handlePublish(replyContent, replyId)}>
                发布
              </Text>
              ||
              <Text
                style={[modalStyles.button, modalStyles.disabled]}>
                发布
              </Text>
            }
          </Header>
          <TextInput
            ref={component => this.contentInput = component}
            placeholder='同学，请文明用语噢～'
            style={styles.replyBox}
            onChangeText={(text) => this.setState({ replyContent: text })}
            autoFocus={true}
            multiline={true} />
          </View>
      </Modal>
    );
  }
}
