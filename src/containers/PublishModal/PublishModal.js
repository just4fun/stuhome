import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  AlertIOS,
  Keyboard,
  TouchableHighlight,
  ActivityIndicator,
  LayoutAnimation
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';
import { connect } from 'react-redux';
import { NavigationActions, StackActions } from 'react-navigation';
import { isIphoneX } from 'react-native-iphone-x-helper';
import KeyboardAccessory from 'react-native-sticky-keyboard-accessory';
import EmojiPicker from 'react-native-smart-emoji-picker';
import LoadingSpinnerOverlay from '~/common/vendor/components/LoadingSpinnerOverlay';
import Header from '~/components/Header/Header';
import Picker from '~/components/Picker/Picker';
import ImageUploader from '~/components/ImageUploader/ImageUploader';
import MessageBar from '~/services/MessageBar';
import api from '~/services/api';
import { CUSTOM_EMOJIS } from '~/constants/emojis';
import { invalidateTopicList, fetchTopicList } from '~/modules/topic/topicList/topicList.ducks';

import mainStyles from '~/common/styles/Main.style';
import modalStyles from '~/common/styles/Modal.style';
import keyboardAccessoryStyles from '~/common/styles/KeyboardAccessory.style';
import colors from '~/common/styles/colors.style';
import styles from './PublishModal.style';

const resetAction = StackActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Main' })
  ]
});

class PublishModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      typeId: null,
      title: '',
      content: '',
      isPickerOpen: false,
      images: [],
      isPublishing: false,
      selectedPanel: 'keyboard',
      isTitleFocused: false
    };
    this.title = this.props.title || '发表新主题';
    this.boardId = this.props.navigation.state.params.boardId;
    this.contentCursorLocation = 0;
  }

  componentDidMount() {
    this.fetchTopicList();
  }

  fetchTopicList() {
    this.props.fetchTopicList({
      boardId: this.boardId,
      isEndReached: false,
      sortType: 'publish'
    });
  }

  cancel() {
    this.props.navigation.goBack();
  }

  handleCancel() {
    const { title, content, images } = this.state;
    if (title.length || content.length || images.length) {
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

  isFormValid() {
    const { typeId, title, content } = this.state;
    const { types } = this.props;

    const hasNoTopicTypes = types.length === 0;
    const hasTypeId = hasNoTopicTypes && true || (typeId !== null);

    return hasTypeId
        && title.length
        && content.length;
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
      const { typeId, title, content } = this.state;
      return api.publishTopic({
        boardId: this.boardId,
        // topicId: null,
        // replyId: null,
        typeId,
        title,
        content,
        images: data
      });
    }).then(response => {
      if (response.data) {
        if (response.data.rs) {
          this.props.invalidateTopicList({
            boardId: 'all',
            sortType: 'all'
          });
          // Back home page.
          this.props.navigation.dispatch(resetAction);
          // Show result.
          MessageBar.show({
            message: '发布成功',
            type: 'success'
          });
        } else if (response.data.errcode) {
          AlertIOS.alert('提示', response.data.errcode);
        }
      }
    }).finally(() => {
      // this.setState({ isPublishing: false });
      this.modalLoadingSpinnerOverLay.hide();
    });
  }

  handlePanelSelect(item) {
    if (this.state.isPublishing) { return; }

    if (item !== 'keyboard') {
      // Hide keyboard
      Keyboard.dismiss();
    } else {
      this.showKeyboard();
    }

    this.setState({ selectedPanel: item });
  }

  handleExtraContentPress = (extraContent) => {
    if (this.state.isPublishing) { return; }

    this.setState((prevState) => {
      const newContent = prevState.content.substr(0, this.contentCursorLocation)
                     + extraContent
                     + prevState.content.substr(this.contentCursorLocation);
      return { content: newContent };
    });
  }

  handleContentSelectionChange(event) {
    this.contentCursorLocation = event.nativeEvent.selection.start;
  }

  togglePicker(visible) {
    this.setState({
      isPickerOpen: visible
    });
    this.hideKeyboard();
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

  getNormalizedTopicTypesForPicker(types) {
    return types.map(type => {
      return {
        id: type.typeId,
        name: type.typeName
      };
    });
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
    const { selectedPanel } = this.state;

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
    const {
      typeId,
      content,
      isPickerOpen,
      images,
      isPublishing,
      selectedPanel,
      isTitleFocused
    } = this.state;
    const { types } = this.props;

    return (
      <View style={mainStyles.container}>
        {isPickerOpen &&
          <Picker
            list={this.getNormalizedTopicTypesForPicker(types)}
            selectedId={typeId}
            visible={isPickerOpen}
            closePicker={() => this.togglePicker(false)}
            setSelection={typeId => this.setState({ typeId })} />
        }
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
          {this.isFormValid() &&
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
          style={[styles.form, isPublishing && styles.disabledForm]}
          // Without this prop, if user click title input and then click
          // content input, both keyboard and emoji panel will show if
          // user toggle emoji panel. Just workaround for now.
          keyboardShouldPersistTaps={'handled'}>
          {types.length > 0 &&
            <TouchableHighlight
              underlayColor={colors.underlay}
              onPress={() => {
                if (!isPublishing) {
                  this.togglePicker(true);
                }
              }}>
              <View style={styles.formItem}>
                <Text
                  style={styles.topicType}>
                  {typeId && types.find(type => type.typeId === typeId).typeName || '请选择分类'}
                </Text>
                <Icon
                  style={styles.topicTypeIcon}
                  name='angle-right'
                  size={18} />
              </View>
            </TouchableHighlight>
          }
          <View style={styles.formItem}>
            <TextInput
              ref={component => this.titleInput = component}
              style={styles.topicTitle}
              onFocus={() => this.setState({
                // We need to set keyboard panel here, because we comment out it in
                // `keyboardWillShow` due to keyboard bug on iOS 11.2.
                selectedPanel: 'keyboard',
                isTitleFocused: true
              })}
              onBlur={() => this.setState({
                isTitleFocused: false
              })}
              onChangeText={text => this.setState({ title: text })}
              editable={!isPublishing}
              returnKeyType='next'
              onSubmitEditing={() => this.contentInput.focus()}
              enablesReturnKeyAutomatically={true}
              placeholder='请输入标题' />
          </View>
          <View style={styles.formItem}>
            <TextInput
              ref={component => this.contentInput = component}
              value={content}
              style={styles.topicContent}
              onFocus={() => this.setState({
                // https://github.com/facebook/react-native/issues/18003
                //
                // See more details in `showKeyboard()` method.
                selectedPanel: 'keyboard'
              })}
              onSelectionChange={(event) => this.handleContentSelectionChange(event)}
              onChangeText={text => this.setState({ content: text })}
              multiline={true}
              editable={!isPublishing}
              placeholder='请输入正文' />
          </View>
          <View style={styles.upload}>
            <ImageUploader
              disabled={isPublishing}
              images={images}
              addImages={images => this.addImages(images)}
              removeImage={imageIndex => this.removeImage(imageIndex)}
              cancelUpload={() => this.showKeyboard() } />
          </View>
        </ScrollView>
        <KeyboardAccessory>
          <View style={keyboardAccessoryStyles.keyboardAccessoryContainer}>
            {!isTitleFocused &&
              (
                selectedPanel === 'emoji' &&
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
              )
            }
            {!isTitleFocused &&
              <Icon
                style={keyboardAccessoryStyles.keyboardAccessoryItem}
                name='at'
                size={30}
                onPress={() => this.showFriendList()} />
            }
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

function mapStateToProps({ topicList, settings }, ownProps) {
  return {
    types: _.get(topicList, [ownProps.navigation.state.params.boardId, 'typeList'], []),
    settings
  };
}

export default connect(mapStateToProps, {
  invalidateTopicList,
  fetchTopicList
})(PublishModal);
