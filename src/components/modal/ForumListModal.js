import React, { Component } from 'react';
import {
  View,
  Text,
  Modal,
  ActivityIndicator
} from 'react-native';
import _ from 'lodash';
import ForumItems from '../ForumItems';
import mainStyles from '../../styles/components/_Main';
import modalStyles from '../../styles/common/_Modal';
import Header from '../Header';

export default class ForumListModal extends Component {
  constructor(props) {
    super(props);
    this.title = '请选择版块';
  }

  componentDidMount() {
    this.props.fetchForumList();
  }

  render() {
    let { forumList, visible } = this.props;

    return (
      <Modal
        animationType='slide'
        transparent={false}
        style={modalStyles.container}
        visible={visible}>
        <View style={mainStyles.container}>
          <Header title={this.title}>
            <Text
              style={modalStyles.button}
              onPress={() => this.props.closeForumListModal()}>取消</Text>
          </Header>
          <ForumItems
            isForumListModal={true}
            boardId={'all'}
            forumList={_.get(forumList, 'all', {})}
            isTopForumList={true}
            handleSelectForum={(forum) => this.props.handleSelectForum(forum)}
            refreshForumList={() => this.props.refreshForumList()} />
        </View>
      </Modal>
    );
  }
}
