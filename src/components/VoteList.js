import React, { Component } from 'react';
import {
  View,
  Text,
  ProgressViewIOS
} from 'react-native';
import CheckBox from 'react-native-checkbox';
import Button from 'apsl-react-native-button';
import styles from '../styles/components/_VoteList';

const progressTintColors = [
  '#e92725',
  '#f27b21',
  '#f2a61f',
  '#5aaf4a',
  '#42c4f5',
  '#0099cc',
  '#3365ae',
  '#2a3591',
  '#592d8e',
  '#db3191'
];

export default class VoteList extends Component {
  constructor(props) {
    super(props);
    this._initState();
  }

  componentWillReceiveProps(nextProps) {
    const { vote } = nextProps;
    if (vote.response && vote.response.rs) {
      this.props.resetVote();
      // to fetch vote status, we have only to fetch topic again,
      // since the vote info is included in topic model.
      this.props.fetchTopic();
    }
  }

  _initState() {
    let pollListStatus = {};
    let { poll_item_list } = this.props.pollInfo;
    poll_item_list.forEach(item => {
      pollListStatus[item.poll_item_id] = false;
    });

    this.state = { pollListStatus };
  }

  _setPollItemStatus(pollItemId, checked) {
    let newPollListStatusState = Object.assign({}, this.state.pollListStatus, {
      [pollItemId]: checked
    });

    this.setState({
      pollListStatus: newPollListStatusState
    });
  }

  _isSubmitDisabled() {
    // type: max selected items count (WTF???)
    let { type } = this.props.pollInfo;
    let { pollListStatus } = this.state;
    let selectedItemsCount = Object.keys(pollListStatus).filter(key => pollListStatus[key]).length;

    return selectedItemsCount === 0 || (selectedItemsCount > type);
  }

  _handleVote() {
    let { pollListStatus } = this.state;
    let voteIds = Object.keys(pollListStatus)
                        .filter(key => pollListStatus[key])
                        .join(',');

    this.props.publishVote(voteIds);
  }

  render() {
    let { pollInfo, vote } = this.props;
    let {
      poll_item_list,
      type,
      poll_status,
      voters
    } = pollInfo;

    let pollTitle = (type === 1 && '单选投票' || `多选投票（最多可选${type}项）`)
                  + (poll_status === 2 && '，投票后结果可见' || '')
                  + `，共有${voters}人参与投票`;

    return (
      <View style={styles.pollList}>
        <Text style={styles.pollTitle}>{pollTitle}</Text>
        <View style={styles.pollItemList}>
          {poll_item_list.map((item, index) => {
            let percent = parseFloat(item.percent.substring(0, item.percent.length - 1)) / 100;
            let colorIndex = 0;

            if (index > 9) {
              colorIndex = +index.toString().substring(1);
            } else {
              colorIndex = index;
            }

            let labelText = `${index + 1}. ${item.name}`;
            let progressTintColor = progressTintColors[colorIndex];

            return (
              <View key={item.poll_item_id} style={styles.pollItem}>
                <View style={styles.pollItemText}>
                  {poll_status == 2 &&
                    <CheckBox
                      containerStyle={styles.checkboxContainer}
                      checkboxStyle={styles.checkbox}
                      labelStyle={styles.checkboxLabel}
                      label={labelText}
                      checked={this.state.pollListStatus[item.poll_item_id]}
                      onChange={checked => this._setPollItemStatus(item.poll_item_id, checked)}
                    />
                    ||
                    <Text style={styles.checkboxLabelOnly}>
                      {labelText}
                    </Text>
                  }
                  {poll_status !== 2 &&
                    <View style={styles.text}>
                      <Text style={styles.percentText}>{item.percent}</Text>
                      <Text style={[styles.totalNumberText, { color: progressTintColor }]}>
                        ({item.total_num})
                      </Text>
                    </View>
                  }
                </View>
                {poll_status !== 2 &&
                  <ProgressViewIOS progress={percent} progressTintColor={progressTintColor} />
                }
              </View>
            );
          })}
        </View>
        <View>
          {poll_status === 2 &&
            <Button
              style={styles.submit}
              textStyle={styles.submitText}
              isDisabled={this._isSubmitDisabled()}
              isLoading={vote.isVoting}
              onPress={() => this._handleVote()}>
              投票
            </Button>
          }
          {poll_status === 1 && <Text style={styles.pollStatusText}>您已经投过票，谢谢您的参与</Text>}
          {(poll_status === 3 || poll_status === 4) && <Text style={styles.pollStatusText}>该投票已经关闭或者过期，不能投票</Text>}
        </View>
      </View>
    );
  }
}
