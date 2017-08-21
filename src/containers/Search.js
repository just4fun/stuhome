import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import mainStyles from '../styles/components/_Main';
import indicatorStyles from '../styles/common/_Indicator';
import Header from '../components/Header';
import TopicList from '../components/TopicList';
import SearchBar from 'react-native-search-bar';
import { fetchSearch, resetSearch } from '../actions/topic/searchAction';

class Search extends Component {
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

  getSearchBarFocus() {
    this.refs.searchBar.focus();
  }

  getSearchBarBlur() {
    this.refs.searchBar.unFocus();
  }

  _refreshTopicList({ page, isEndReached }) {
    // search topic list can not be pulled to refresh,
    // so there is no need to invalidate topic list here,
    // this method is only used for end reach refreshing.
    this.props.fetchSearch({
      keyword: this.state.keyword,
      isEndReached,
      sortType: 'all',
      page
    });
  }

  _handleChange(keyword) {
    this.setState({ keyword });
  }

  _handleSearch() {
    this.getSearchBarBlur();
    this.searchList.scrollToTop();
    this._refreshTopicList({});
  }

  render() {
    let {
      router,
      search
    } = this.props;

    return (
      <View style={mainStyles.container}>
        <Header
          title='搜索'
          updateMenuState={isOpen => this.props.updateMenuState(isOpen)} />
        <SearchBar
          ref='searchBar'
          placeholder='请输入关键字'
          editable={!search.isRefreshing}
          showsCancelButton={this.state.focus}
          onFocus={() => this.setState({ focus: true })}
          onChangeText={keyword => this._handleChange(keyword)}
          onSearchButtonPress={() => this._handleSearch()}
          onCancelButtonPress={() => this.getSearchBarBlur()} />
        {search.isRefreshing && (
          <View style={indicatorStyles.fullScreenIndicator}>
            <ActivityIndicator />
          </View>
        ) || (
          <TopicList
            ref={component => this.searchList = component}
            router={router}
            isSearch={true}
            topicList={search}
            refreshTopicList={this._refreshTopicList.bind(this)} />
        )}
      </View>
    );
  }
}

function mapStateToProps({ search }) {
  return {
    search
  };
}

export default connect(mapStateToProps, {
  fetchSearch,
  resetSearch
})(Search);
