import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import mainStyles from '../styles/components/_Main';
import scrollableTabViewStyles from '../styles/common/_ScrollableTabView';
import colors from '../styles/common/_colors';
import Header from '../components/Header';
import NotifyList from '../components/NotifyList';
import { invalidateNotifyList, fetchNotifyListIfNeeded } from '../actions/message/notifyListAction';

class Message extends Component {
  _fetchNotifyList(notifyType) {
    this.props.fetchNotifyListIfNeeded(notifyType);
  }

  _refreshNotifyList(notifyType, page, isEndReached) {
    this.props.invalidateNotifyList();
    this.props.fetchNotifyListIfNeeded(notifyType, isEndReached, page);
  }

  render() {
    let {
      notifyList,
      router
    } = this.props;

    return (
      <View style={mainStyles.container}>
        <Header title='消息'
                updateMenuState={isOpen => this.props.updateMenuState(isOpen)} />
        <ScrollableTabView
          tabBarBackgroundColor={colors.lightBlue}
          tabBarActiveTextColor={colors.white}
          tabBarInactiveTextColor={colors.white}
          tabBarUnderlineStyle={scrollableTabViewStyles.tabBarUnderline}
          tabBarTextStyle={scrollableTabViewStyles.tabBarText}>
          <NotifyList
            tabLabel='@'
            notifyType='at'
            notifyList={notifyList}
            router={router}
            fetchNotifyList={(notifyType) => this._fetchNotifyList(notifyType)}
            refreshNotifyList={(notifyType, page, isEndReached) => this._refreshNotifyList(notifyType, page, isEndReached)} />
          <NotifyList
            tabLabel='回复'
            notifyType='post'
            notifyList={notifyList}
            router={router}
            fetchNotifyList={(notifyType) => this._fetchNotifyList(notifyType)}
            refreshNotifyList={(notifyType, page, isEndReached) => this._refreshNotifyList(notifyType, page, isEndReached)} />
        </ScrollableTabView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  let { notifyList } = state;

  return {
    notifyList
  };
}

export default connect(mapStateToProps, {
  invalidateNotifyList,
  fetchNotifyListIfNeeded
})(Message);
