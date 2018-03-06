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
import { isIphoneX } from 'react-native-iphone-x-helper';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';
import mainStyles from '../../styles/components/_Main';
import modalStyles from '../../styles/common/_Modal';
import styles from '../../styles/components/modal/_PublishModal';
import colors from '../../styles/common/_colors';
import Header from '../Header';
import Picker from '../Picker';
import ImageUploader from '../ImageUploader';
import MessageBar from '../../services/MessageBar';
import KeyboardAccessory from '../KeyboardAccessory';
import api from '../../services/api';
import { invalidateTopicList, fetchTopicList } from '../../actions/topic/topicListAction';

const resetAction = NavigationActions.reset({
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
      keyboardAccessoryToBottom: 0,
      isContentFocused: false
    };
    this.title = this.props.title || '发表新主题';
    this.boardId = this.props.navigation.state.params.boardId;
    this.contentCursorLocation = 0;
  }

  componentDidMount() {
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', (e) => this.keyboardWillShow(e));
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', (e) => this.keyboardWillHide(e));

    this.fetchTopicList();
  }

  componentWillUnmount() {
    this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener.remove();
  }

  fetchTopicList() {
    this.props.fetchTopicList({
      boardId: this.boardId,
      isEndReached: false,
      sortType: 'publish'
    });
  }

  keyboardWillShow(e) {
    LayoutAnimation.easeInEaseOut();
    this.setState({
      // https://github.com/facebook/react-native/issues/18003
      //
      // See more details in `showKeyboard()` method.

      // selectedPanel: 'keyboard',
      keyboardAccessoryToBottom: isIphoneX() ? (e.endCoordinates.height - 34) : e.endCoordinates.height
    });
  }

  keyboardWillHide(e) {
    LayoutAnimation.easeInEaseOut();
    this.setState({
      keyboardAccessoryToBottom: 0,
      isContentFocused: false
    });
  }

  cancel() {
    this.props.navigation.goBack();
  }

  handleCancel() {
    let { title, content, images } = this.state;
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
    let { typeId, title, content } = this.state;
    let { types } = this.props;

    let hasNoTopicTypes = types.length === 0;
    let hasTypeId = hasNoTopicTypes && true || (typeId !== null);

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

    this.setState({ isPublishing: true });
    api.uploadImages(this.state.images).then(data => {
      let { typeId, title, content } = this.state;
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
      this.setState({ isPublishing: false });
    });
  }

  handlePanelSelect(item) {
    if (item !== 'keyboard') {
      // Hide keyboard
      Keyboard.dismiss();
    } else {
      this.showKeyboard();
    }

    this.setState({ selectedPanel: item });
  }

  handleEmojiPress(emoji) {
    this.setState((prevState) => {
      let newContent = prevState.content.substr(0, this.contentCursorLocation)
                     + emoji.code
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
      isContentFocused: true,
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
        keyboardAccessoryToBottom: 0,
        selectedPanel: 'keyboard'
      });
    }
  }

  render() {
    let {
      typeId,
      content,
      isPickerOpen,
      images,
      isPublishing,
      isContentFocused,
      selectedPanel,
      keyboardAccessoryToBottom
    } = this.state;
    let { types } = this.props;

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
          <Text
            style={modalStyles.button}
            onPress={() => this.handleCancel()}>
            取消
          </Text>
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
                isContentFocused: false,
                // We need to set keyboard panel here, because we comment out it in
                // `keyboardWillShow` due to keyboard bug on iOS 11.2.
                selectedPanel: 'keyboard'
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
                isContentFocused: true,
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
        {(isContentFocused || selectedPanel === 'emoji') &&
          <KeyboardAccessory
            style={{ bottom: keyboardAccessoryToBottom }}
            selectedPanel={selectedPanel}
            handlePanelSelect={(item) => this.handlePanelSelect(item)}
            handleEmojiPress={(emoji) => this.handleEmojiPress(emoji)}
            hideKeyboard={() => this.hideKeyboard()} />
        }
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
