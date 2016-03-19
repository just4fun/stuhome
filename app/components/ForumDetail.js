import React, {
  Component,
  View,
  Text,
  AlertIOS
} from 'react-native';
import mainStyles from '../styles/components/_Main';
import Header from './Header';
import TopicList from './TopicList';
import PublishModal from './modal/PublishModal';
import { PopButton, PublishButton } from './button';
import { publish } from '../actions/topic/topicAction';
import { resetTopicList } from '../actions/topic/topicListAction';

class ForumDetail extends Component {
  constructor(props) {
    super(props);
    this.boardId = props.passProps.board_id;
    this.boardName = props.passProps.board_name;
  }

  componentWillReceiveProps(nextProps) {
    let { topicList } = nextProps.list;

    if (topicList.errCode) {
      AlertIOS.alert('提示', topicList.errCode);
      nextProps.dispatch(resetTopicList(this.boardId));
      nextProps.router.pop();
    }
  }

  _publish(topic) {
    let { typeId, title, content } = topic;

    this.props.dispatch(publish(
      this.boardId,
      null,
      null,
      typeId,
      title,
      content
    ));
  }

  render() {
    let { topicList } = this.props.list;
    let { comment, user } = this.props.entity;
    let { token } = user.authrization;

    if (!topicList.list[this.boardId]) {
      topicList.list[this.boardId] = {
        typeList: [],
        topicList: []
      }
    }

    let typeList = topicList.list[this.boardId].typeList;

    return (
      <View style={mainStyles.container}>
        <PublishModal
          ref={component => this._publishModal = component}
          {...this.props}
          visible={false}
          comment={comment}
          types={typeList}
          handlePublish={topic => this._publish(topic)} />

        <Header
          title={this.boardName}
          comment={comment}>
          <PopButton router={this.props.router} />
          {token &&
            <PublishButton
              onPress={() => this._publishModal.openPublishModal()} />
            ||
            <Text></Text>
          }
        </Header>
        <TopicList {...this.props} />
      </View>
    );
  }
}

module.exports = ForumDetail;
