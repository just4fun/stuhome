import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import mainStyles from '../styles/components/_Main';
import Header from '../components/Header';
import TopicList from '../components/TopicList';
import SearchInput from '../components/SearchInput';
import { invalidateSearch, fetchSearch, resetSearch } from '../actions/topic/searchAction';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: ''
    };
  }

  componentWillUnmount() {
    this.props.resetSearch();
  }

  _refreshTopicList(page, isEndReached) {
    this.props.invalidateSearch();
    this.props.fetchSearch(this.state.keyword, isEndReached, 'all', page);
  }

  _handleChange(keyword) {
    this.setState({ keyword });
  }

  _handleSearch() {
    this.props.resetSearch();
    this._refreshTopicList();
  }

  render() {
    let {
      router,
      search
    } = this.props;
    let { keyword } = this.state;

    let isDisabled = !keyword || search.isRefreshing;

    return (
      <View style={mainStyles.container}>
        <Header
          title='搜索'
          updateMenuState={isOpen => this.props.updateMenuState(isOpen)} />
        <SearchInput
          isDisabled={isDisabled}
          isLoading={search.isRefreshing}
          errCode={search.errCode}
          handleChange={keyword => this._handleChange(keyword)}
          handleSearch={() => this._handleSearch()}
          resetSearch={() => this.props.resetSearch()} />
        <TopicList
          router={router}
          isSearch={true}
          topicList={search}
          refreshTopicList={(page, isEndReached) => this._refreshTopicList(page, isEndReached)} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  let { search } = state;

  return {
    search
  };
}

export default connect(mapStateToProps, {
  invalidateSearch,
  fetchSearch,
  resetSearch
})(Search);
