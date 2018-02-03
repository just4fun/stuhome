import React, { Component } from 'react';
import {
  View,
  AlertIOS,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import mainStyles from '../styles/components/_Main';
import indicatorStyles from '../styles/common/_Indicator';
import TopicList from '../components/TopicList';
import SearchBar from 'react-native-search-bar';
import menus from '../constants/menus';
import { fetchSearch, resetSearch } from '../actions/topic/searchAction';

class Search extends Component {
  static navigationOptions = {
    title: menus.search.title
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
      search
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
          <View style={indicatorStyles.fullScreenIndicator}>
            <ActivityIndicator />
          </View>
        ) || (
          <TopicList
            ref={component => this.searchList = component}
            navigation={navigation}
            isSearch={true}
            topicList={search}
            refreshTopicList={this.refreshTopicList.bind(this)} />
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
