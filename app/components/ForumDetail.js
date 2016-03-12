import React, {
  Component,
  View
} from 'react-native';
import mainStyles from '../styles/components/_Main';
import Header from './Header';
import TopicList from './TopicList';
import PublishModal from './modal/PublishModal';
import { PopButton, PublishButton } from './button';
import { publish } from '../actions/topic/topicAction';

export default class ForumDetail extends Component {
  constructor(props) {
    super(props);
    this.boardName = props.passProps.board_name;
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
    const { topicList } = this.props.list;
    const { comment, user } = this.props.entity;
    const { token } = user.authrization;

    return (
      <View style={mainStyles.container}>
        <PublishModal
          ref={component => this._publishModal = component}
          {...this.props}
          visible={false}
          comment={comment}
          types={topicList.typeList}
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
