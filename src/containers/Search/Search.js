import React, { Component } from 'react';
import {
  View,
  AlertIOS
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import SearchBar from 'react-native-search-bar';
import TopicList from '~/components/TopicList/TopicList';
import LoadingSpinner from '~/components/LoadingSpinner/LoadingSpinner';
import MENUS from '~/constants/menus';
import { fetchSearch, resetSearch } from '~/actions/topic/searchAction';

import mainStyles from '~/common/styles/Main.style';
import indicatorStyles from '~/common/styles/Indicator.style';

class Search extends Component {
  static navigationOptions = {
    title: MENUS.search.title
  }

  constructor(props) {
    super(props);

    this.state = {
      keyword: '',
      focus: false
    };
  }

  componentDidMount() {
    this.getSearchBarFocus();
  }

  componentWillUnmount() {
    this.props.resetSearch();
  }

  componentWillReceiveProps(nextProps) {
    let { search } = nextProps;
    if (search.errCode) {
      AlertIOS.alert('提示', search.errCode);
      // Clean error message.
      this.props.resetSearch();
    }
  }

  getSearchBarFocus() {
    this.refs.searchBar.focus();
  }

  getSearchBarBlur() {
    this.refs.searchBar.unFocus();
  }

  refreshTopicList({ page, isEndReached }) {
    // Search topic list can not be pulled to refresh,
    // so there is no need to invalidate topic list here,
    // this method is only used for end reach refreshing.
    this.props.fetchSearch({
      keyword: this.state.keyword,
      isEndReached,
      sortType: 'all',
      page
    });
  }

  handleChange(keyword) {
    this.setState({ keyword });
  }

  handleSearch() {
    this.getSearchBarBlur();
    this.refreshTopicList({});
  }

  render() {
    let {
      navigation,
      search,
      userId
    } = this.props;

    return (
      <View style={mainStyles.container}>
        <SearchBar
          ref='searchBar'
          placeholder='请输入关键字'
          editable={!search.isRefreshing}
          showsCancelButton={this.state.focus}
          onFocus={() => this.setState({ focus: true })}
          onChangeText={keyword => this.handleChange(keyword)}
          onSearchButtonPress={() => this.handleSearch()}
          onCancelButtonPress={() => this.getSearchBarBlur()} />
        {search.isRefreshing && (
          <LoadingSpinner text='正在搜索' />
        ) || (
          <TopicList
            ref={component => this.searchList = component}
            currentUserId={userId}
            navigation={navigation}
            isSearch={true}
            topicList={search}
            refreshTopicList={this.refreshTopicList.bind(this)} />
        )}
      </View>
    );
  }
}

function mapStateToProps({ search, user }) {
  return {
    userId: _.get(user, ['authrization', 'uid']),
    search
  };
}

export default connect(mapStateToProps, {
  fetchSearch,
  resetSearch
})(Search);
