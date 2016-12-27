import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  AlertIOS,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';
import mainStyles from '../../styles/components/_Main';
import modalStyles from '../../styles/common/_Modal';
import styles from '../../styles/components/modal/_ReplyModal';
import Header from '../Header';
import MessageBar from '../../services/MessageBar';

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
    const reply = nextProps.reply;
    if (reply.response) {
      if (reply.response.rs) {
        this._cancel();
        // if we reply in `Message` page, there is
        // no need to fetch topic.
        if (this.props.isReplyInTopic) {
          this.props.fetchTopic();
        }
        MessageBar.show({
          message: '发布成功',
          type: 'success'
        });
      // I really hate the fields which mobcent API return
      } else if (reply.response.errcode) {
        AlertIOS.alert('提示', reply.response.errcode);
      }
      this.props.resetReply();
    }
  }

  openReplyModal(content) {
    let replyId = null;
    let boardId = null;
    let topicId = null;

    if (content) {
      let { reply_posts_id, board_id, topic_id } = content;
      replyId = reply_posts_id;
      boardId = board_id,
      topicId = topic_id;
    }

    this.setState({
      isModalOpen: true,
      title: this._getTitle(content),
      replyId,
      boardId,
      topicId
    });
  }

  _getTitle(content) {
    if (content) {
      return `回复 ${content.user_nick_name || content.reply_name}`;
    } 

    return '评论';
  }

  _cancel() {
    this.setState({
      isModalOpen: false,
      replyContent: ''
    });
  }

  handleCancel() {
    if (this.state.replyContent.length) {
      AlertIOS.alert(
        '提示',
        '信息尚未发送，放弃会丢失信息。',
        [
          { text: '继续', style: 'cancel' },
          { text: '放弃', onPress: () => this._cancel() },
        ],
      );
      return;
    }

    this._cancel();
  }

  _handlePublish(comment) {
    this.contentInput.blur();
    this.props.handlePublish(comment);
  }

  render() {
    let { reply } = this.props;
    let {
      isModalOpen,
      title,
      replyContent,
      replyId,
      boardId,
      topicId
    } = this.state;

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
            {replyContent.length &&
              (reply.isPublishing &&
                <ActivityIndicator color='white' />
                ||
                <Text
                  style={modalStyles.button}
                  onPress={() => this._handlePublish({
                    content: replyContent,
                    replyId,
                    boardId,
                    topicId
                  })}>
                  发布
                </Text>
              )
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
            style={[styles.replyBox, reply.isPublishing && { backgroundColor: '#ddd' }]}
            onChangeText={(text) => this.setState({ replyContent: text })}
            autoFocus={true}
            multiline={true}
            editable={!reply.isPublishing} />
          </View>
      </Modal>
    );
  }
}
