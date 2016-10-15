import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  ScrollView,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import mainStyles from '../../styles/components/_Main';
import modalStyles from '../../styles/common/_Modal';
import styles from '../../styles/components/modal/_PublishModal';
import colors from '../../styles/common/_colors';
import Header from '../Header';
import TopicTypeModal from './TopicTypeModal';

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
      this.props.resetPublish();
      this.props.invalidateTopicList();
      this.props.router.toHome();
      this.handleCancel();
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
    let { comment, types } = this.props;

    let hasNoTopicTypes = types.length === 0;
    let hasTypeId = hasNoTopicTypes && true || (typeId !== null);

    return hasTypeId
        && title.length
        && content.length
        && !comment.isPublishing;
  }

  _handlePublish(topic) {
    this.titleInput.blur();
    this.contentInput.blur();
    this.props.handlePublish(topic);
  }

  render() {
    let { typeId, title, content } = this.state;
    let { types } = this.props;

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
              <Text
                style={modalStyles.button}
                onPress={() => this._handlePublish({
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
          <ScrollView style={styles.form}>
            {types.length > 0 &&
              <TouchableHighlight
                underlayColor={colors.underlay}
                onPress={() => this._topicTypeModal.openTopicTypeModal()}>
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
                placeholder='请输入标题' />
            </View>
            <View style={styles.formItem}>
              <TextInput
                ref={component => this.contentInput = component}
                style={styles.topicContent}
                onChangeText={text => this.setState({ content: text })}
                multiline={true}
                placeholder='请输入正文' />
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  }
}
