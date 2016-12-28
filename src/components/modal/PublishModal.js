import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  ScrollView,
  AlertIOS,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import mainStyles from '../../styles/components/_Main';
import modalStyles from '../../styles/common/_Modal';
import styles from '../../styles/components/modal/_PublishModal';
import colors from '../../styles/common/_colors';
import Header from '../Header';
import TopicTypeModal from './TopicTypeModal';
import MessageBar from '../../services/MessageBar';

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
    const publish = nextProps.publish;
    if (publish.response) {
      if (publish.response.rs) {
        this._cancel();
        this.props.invalidateTopicList();
        this.props.router.toHome();
        MessageBar.show({
          message: '发布成功',
          type: 'success'
        });
      } else if (publish.response.errcode) {
        AlertIOS.alert('提示', publish.response.errcode);
      }
      this.props.resetPublish();
    }
  }

  openPublishModal() {
    this.setState({
      isModalOpen: true
    });
  }

  _cancel() {
    this.setState({
      isModalOpen: false,
      typeId: null,
      title: '',
      content: ''
    });
  }

  handleCancel() {
    let { title, content } = this.state;
    if (title.length || content.length) {
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

  _isFormValid() {
    let { typeId, title, content } = this.state;
    let { types } = this.props;

    let hasNoTopicTypes = types.length === 0;
    let hasTypeId = hasNoTopicTypes && true || (typeId !== null);

    return hasTypeId
        && title.length
        && content.length;
  }

  _handlePublish(topic) {
    this.titleInput.blur();
    this.contentInput.blur();
    this.props.handlePublish(topic);
  }

  render() {
    let { typeId, title, content } = this.state;
    let { publish, types } = this.props;

    return (
      <Modal
        animationType='slide'
        transparent={false}
        style={modalStyles.container}
        visible={this.state.isModalOpen}>
        <View style={mainStyles.container}>
          <TopicTypeModal
            types={types}
            ref={component => this._topicTypeModal = component}
            visible={false}
            setTopicType={typeId => this.setState({ typeId })} />
          <Header title={this.title}>
            <Text
              style={modalStyles.button}
              onPress={() => this.handleCancel()}>
              取消
            </Text>
            {this._isFormValid() &&
              (publish.isPublishing &&
                <ActivityIndicator color='white' />
                ||
                <Text
                  style={modalStyles.button}
                  onPress={() => this._handlePublish({
                    typeId,
                    title,
                    content
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
          <ScrollView style={[styles.form, publish.isPublishing && styles.disabledForm]}>
            {types.length > 0 &&
              <TouchableHighlight
                underlayColor={colors.underlay}
                onPress={() => {
                  if (!publish.isPublishing) {
                    this._topicTypeModal.openTopicTypeModal();
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
                onChangeText={text => this.setState({ title: text })}
                editable={!publish.isPublishing}
                returnKeyType='next'
                onSubmitEditing={() => this.contentInput.focus()}
                enablesReturnKeyAutomatically={true}
                placeholder='请输入标题' />
            </View>
            <View style={styles.formItem}>
              <TextInput
                ref={component => this.contentInput = component}
                style={styles.topicContent}
                onChangeText={text => this.setState({ content: text })}
                multiline={true}
                editable={!publish.isPublishing}
                placeholder='请输入正文' />
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  }
}
