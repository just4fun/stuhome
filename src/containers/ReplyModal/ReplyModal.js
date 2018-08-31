import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  AlertIOS,
  Keyboard,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import KeyboardAccessory from 'react-native-sticky-keyboard-accessory';
import EmojiPicker from 'react-native-smart-emoji-picker';
import LoadingSpinnerOverlay from '~/common/vendor/components/LoadingSpinnerOverlay';
import Header from '~/components/Header/Header';
import ImageUploader from '~/components/ImageUploader/ImageUploader';
import MessageBar from '~/services/MessageBar';
import api from '~/services/api';
import { CUSTOM_EMOJIS } from '~/constants/emojis';
import { fetchTopic } from '~/modules/topic/topic/topic.ducks';

import mainStyles from '~/common/styles/Main.style';
import modalStyles from '~/common/styles/Modal.style';
import keyboardAccessoryStyles from '~/common/styles/KeyboardAccessory.style';
import styles from './ReplyModal.style';

class ReplyModal extends Component {
  constructor(props) {
    super(props);
    this.initNecessaryData();
    this.state = {
      isPublishing: false,
      replyContent: '',
      images: [],
      selectedPanel: 'keyboard'
    };
    this.contentCursorLocation = 0;
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

    // `reply_posts_id` is not necessary when reply topic author.
    this.replyId = reply_posts_id;
    this.boardId = board_id,
    this.topicId = topic_id;
    this.isReplyInTopic = isReplyInTopic;
    this.title = this.getTitle(comment);
  }

  componentDidMount() {
    this.showKeyboard();
  }

  fetchTopic() {
    this.props.fetchTopic({
      topicId: this.topicId
    });
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
          // Without `onPress` for Cancel button, Keyboard will still display even
          // we toggle to emoji panel.
          { text: '继续', style: 'cancel', onPress: () => this.showKeyboard() },
          { text: '放弃', onPress: () => this.cancel() },
        ],
      );
      return;
    }

    this.cancel();
  }

  showPublishDialog() {
    if (!this.props.settings.enablePublishDialog) {
      this.handlePublish();
      return;
    }

    AlertIOS.alert(
      '提示',
      '确认发布？',
      [
        // Without `onPress` for Cancel button, Keyboard will still display even
        // we toggle to emoji panel.
        { text: '取消', onPress: () => this.showKeyboard() },
        { text: '确认', onPress: () => this.handlePublish() }
      ],
    );
  }

  handlePublish() {
    // Hide keyboard.
    this.hideKeyboard();

    // this.setState({ isPublishing: true });
    this.modalLoadingSpinnerOverLay.show();
    api.uploadImages(this.state.images).then(data => {
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
    }).then(response => {
      if (response.data) {
        if (response.data.rs) {
          this.cancel();
          // If we reply in `Message` page, there is
          // no need to fetch topic.
          if (this.isReplyInTopic) {
            this.fetchTopic();
          }
          MessageBar.show({
            message: '发布成功',
            type: 'success'
          });
        // I really hate the fields which mobcent API return
        } else if (response.data.errcode) {
          AlertIOS.alert('提示', response.data.errcode);
        }
      }
    }).finally(() => {
      // this.setState({ isPublishing: false });
      this.modalLoadingSpinnerOverLay.hide();
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

  handlePanelSelect(item) {
    if (this.state.isPublishing) { return; }

    if (item !== 'keyboard') {
      // hide keyboard
      Keyboard.dismiss();
    } else {
      this.showKeyboard();
    }

    this.setState({ selectedPanel: item });
  }

  handleExtraContentPress = (extraContent) => {
    if (this.state.isPublishing) { return; }

    this.setState((prevState) => {
      let newContent = prevState.replyContent.substr(0, this.contentCursorLocation)
                     + extraContent
                     + prevState.replyContent.substr(this.contentCursorLocation);
      return { replyContent: newContent };
    });
  }

  handleContentSelectionChange(event) {
    this.contentCursorLocation = event.nativeEvent.selection.start;
  }

  showKeyboard() {
    this.contentInput.focus();
    // https://github.com/facebook/react-native/issues/18003
    //
    // This is workaround to bypass the keyboard bug above on iOS 11.2,
    // which will fire `keyboardWillShow` while keyboard dismiss.
    this.setState({
      selectedPanel: 'keyboard'
    });
  }

  hideKeyboard() {
    let { selectedPanel } = this.state;

    if (selectedPanel === 'keyboard') {
      Keyboard.dismiss();
    }

    if (selectedPanel === 'emoji') {
      this.setState({
        selectedPanel: 'keyboard'
      });
    }
  }

  showFriendList() {
    if (this.state.isPublishing) { return; }

    this.props.navigation.navigate('FriendListModal', {
      callback: (friend) => {
        friend && this.handleExtraContentPress(`@${friend.name} `);
        this.showKeyboard();
      }
    });
  }

  render() {
    let {
      replyContent,
      isPublishing,
      selectedPanel,
      images
    } = this.state;

    return (
      <View style={mainStyles.container}>
        <Header title={this.title}>
          {isPublishing &&
            <Text
              style={[modalStyles.button, modalStyles.disabled]}>
              取消
            </Text>
            ||
            <Text
              style={modalStyles.button}
              onPress={() => this.handleCancel()}>
              取消
            </Text>
          }
          {replyContent.length &&
            (isPublishing &&
              <ActivityIndicator color='white' />
              ||
              <Text
                style={modalStyles.button}
                onPress={() => this.showPublishDialog()}>
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
        <ScrollView
          style={isPublishing && styles.disabledForm}
          keyboardShouldPersistTaps={'handled'}>
          <View style={styles.formItem}>
            <TextInput
              ref={component => this.contentInput = component}
              value={replyContent}
              placeholder='同学，请文明用语噢～'
              style={styles.replyBox}
              onFocus={() => this.setState({
                // https://github.com/facebook/react-native/issues/18003
                //
                // See more details in `showKeyboard()` method.
                selectedPanel: 'keyboard'
              })}
              onSelectionChange={(event) => this.handleContentSelectionChange(event)}
              onChangeText={(text) => this.setState({ replyContent: text })}
              multiline={true}
              editable={!isPublishing} />
          </View>
          <View style={styles.upload}>
            <ImageUploader
              disabled={isPublishing}
              images={images}
              addImages={images => this.addImages(images)}
              removeImage={imageIndex => this.removeImage(imageIndex)}
              cancelUpload={() => this.showKeyboard()} />
          </View>
        </ScrollView>
        <KeyboardAccessory>
          <View style={keyboardAccessoryStyles.keyboardAccessoryContainer}>
            {selectedPanel === 'emoji' &&
              <Icon
                style={keyboardAccessoryStyles.keyboardAccessoryItem}
                name='keyboard-o'
                size={30}
                onPress={() => this.handlePanelSelect('keyboard')} />
              ||
              <Icon
                style={keyboardAccessoryStyles.keyboardAccessoryItem}
                name='smile-o'
                size={30}
                onPress={() => this.handlePanelSelect('emoji')} />
            }
            <Icon
              style={keyboardAccessoryStyles.keyboardAccessoryItem}
              name='at'
              size={30}
              onPress={() => this.showFriendList()} />
            <Icon
              style={keyboardAccessoryStyles.keyboardAccessoryItem}
              name='angle-down'
              size={30}
              onPress={() => this.hideKeyboard()} />
          </View>
          <EmojiPicker
            emojis={CUSTOM_EMOJIS}
            show={selectedPanel === 'emoji'}
            onEmojiPress={(emoji) => this.handleExtraContentPress(emoji.code)} />
        </KeyboardAccessory>
        <LoadingSpinnerOverlay
          ref={ component => this.modalLoadingSpinnerOverLay = component }/>
      </View>
    );
  }
}

function mapStateToProps({ settings }) {
  return {
    settings
  };
}

export default connect(mapStateToProps, {
  fetchTopic
})(ReplyModal);
