import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  AlertIOS,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import mainStyles from '../../styles/components/_Main';
import modalStyles from '../../styles/common/_Modal';
import styles from '../../styles/components/modal/_ReplyModal';
import Header from '../Header';
import MessageBar from '../../services/MessageBar';
import ImageUploader from '../ImageUploader';
import api from '../../services/api';
import { fetchTopic } from '../../actions/topic/topicAction';
import { resetReply } from '../../actions/topic/replyAction';

class ReplyModal extends Component {
  constructor(props) {
    super(props);
    this.initNecessaryData();
    this.state = {
      isPublishing: false,
      replyContent: '',
      images: []
    };
  }

  initNecessaryData() {
    let {
      comment,
      comment: {
        reply_posts_id,
        board_id,
        topic_id
      },
      isReplyInTopic
    } = this.props.navigation.state.params;

    this.replyId = reply_posts_id;
    this.boardId = board_id,
    this.topicId = topic_id;
    this.isReplyInTopic = isReplyInTopic;
    this.title = this.getTitle(comment);
  }

  fetchTopic() {
    this.props.fetchTopic({
      topicId: this.topicId
    });
  }

  componentWillReceiveProps(nextProps) {
    // const reply = nextProps.reply;
    // if (reply.response) {
    //   if (reply.response.rs) {
    //     this.cancel();
    //     // If we reply in `Message` page, there is
    //     // no need to fetch topic.
    //     if (this.isReplyInTopic) {
    //       this.fetchTopic();
    //     }
    //     MessageBar.show({
    //       message: '发布成功',
    //       type: 'success'
    //     });
    //   // I really hate the fields which mobcent API return
    //   } else if (reply.response.errcode) {
    //     AlertIOS.alert('提示', reply.response.errcode);
    //   }
    //   this.props.resetReply();
    // }
  }

  getTitle(comment) {
    if (comment) {
      return `回复 ${comment.user_nick_name || comment.reply_name}`;
    } 

    return '评论';
  }

  cancel() {
    this.props.navigation.goBack();
  }

  handleCancel() {
    let { replyContent, images } = this.state;
    if (replyContent.length || images.length) {
      AlertIOS.alert(
        '提示',
        '信息尚未发送，放弃会丢失信息。',
        [
          { text: '继续', style: 'cancel' },
          { text: '放弃', onPress: () => this.cancel() },
        ],
      );
      return;
    }

    this.cancel();
  }

  handlePublish() {
    this.contentInput.blur();

    this.setState({ isPublishing: true });
    api.uploadImages(this.state.images).then(data => {
      // this.setState({ isPublishing: false });

      // if (data) {
      //   comment.images = data;
      // }

      // this.props.handlePublish(comment);

      // Actually there is no need to pass `boardId` when we
      // reply a topic.
      return api.publishTopic({
        boardId: this.boardId,
        topicId: this.topicId,
        replyId: this.replyId,
        typeId: null,
        title: null,
        images: data,
        content: this.state.replyContent
      });
    });
  }

  addImages(images) {
    this.setState({
      images: this.state.images.concat(images)
    });
  }

  removeImage(imageIndex) {
    this.setState({
      images: this.state.images.filter((image, index) => index !== imageIndex)
    });
  }

  render() {
    let {
      replyContent,
      isPublishing
    } = this.state;

    return (
      <View style={mainStyles.container}>
        {
          <Header title={this.title}>
            <Text
              style={modalStyles.button}
              onPress={() => this.handleCancel()}>
              取消
            </Text>
            {replyContent.length &&
              (isPublishing &&
                <ActivityIndicator color='white' />
                ||
                <Text
                  style={modalStyles.button}
                  onPress={() => this.handlePublish()}>
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
        }
        <KeyboardAwareScrollView style={isPublishing && styles.disabledForm}>
          <View style={styles.formItem}>
            <TextInput
              ref={component => this.contentInput = component}
              placeholder='同学，请文明用语噢～'
              style={styles.replyBox}
              onChangeText={(text) => this.setState({ replyContent: text })}
              autoFocus={true}
              multiline={true}
              editable={!isPublishing} />
          </View>
          <View style={styles.upload}>
            <ImageUploader
              disabled={isPublishing}
              images={this.state.images}
              addImages={images => this.addImages(images)}
              removeImage={imageIndex => this.removeImage(imageIndex)} />
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default connect(null, {
  fetchTopic,
  resetReply
})(ReplyModal);
