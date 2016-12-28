import React, { Component } from 'react';
import WebPage from '../components/WebPage';

export default class Browser extends Component {
  render() {
    return (
      <WebPage {...this.props} />
    );
  }
}
