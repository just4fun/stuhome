import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import Content from '../../src/components/Content';
import { shallow } from 'enzyme';
import { expect } from 'chai';

describe('<Content />', () => {
  it('should render child components as many as `content` length', () => {
    let content = [
      {
        infor: '书念得少，不会说什么有文化的祝福。',
        type: 0
      },
      {
        infor: '在这里先祝大家鸡年大吉吧。',
        type: 0
      }
    ];
    let wrapper = shallow(<Content content={content} />);
    expect(wrapper.find(Text)).to.have.length(2);
  });
});
