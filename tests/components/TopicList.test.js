import React from 'react';
import TopicList from '../../src/components/TopicList';
import { shallow } from 'enzyme';
import { expect } from 'chai';

describe('<TopicList />', () => {
  it('should not render bad topic data', () => {
    let topicList = {
      list: [
        {
          board_id: 46,
          board_name: '站务综合',
          essence: 0,
          hits: 65,
          hot: 0,
          last_reply_date: '1500800419000',
          pic_path: '',
          replies: 5,
          sort_id: 0,
          special: 0,
          status: 32,
          subject: '如各位所知，之前我做了个第三方的 iOS 河畔...',
          title: '[站务求助]请问"本页有 1 篇帖子因隐私问题而隐藏"是怎么处理的？',
          top: 0,
          topic_id: 1675973,
          type_id: 5,
          userAvatar: 'http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=32044&size=middle',
          user_id: 32044,
          user_nick_name: '法律之光'
        },
        {
          board_id: 0,
          board_name: '',
          essence: 0,
          hits: 0,
          hot: 0,
          last_reply_date: '000',
          pic_path: '',
          replies: 0,
          sort_id: 0,
          special: 0,
          status: 0,
          subject: '我是 mobcent API 返回的有问题的帖子',
          title: '',
          top: 0,
          topic_id: 1675973,
          type_id: 5,
          userAvatar: 'http://bbs.uestc.edu.cn/uc_server/avatar.php?uid=0&size=middle',
          user_id: 0,
          user_nick_name: ''
        }
      ]
    };

    let wrapper = shallow(<TopicList topicList={topicList} />);

    // So, the normal approach to test this component is using `mount()`
    // and then expect how many `TopicItem`s it has. However, `react-native-mock`
    // just render `null` for all react native components, that said we have to
    // use unnormal approach here.
    let instance = wrapper.instance();
    expect(topicList.list.filter(topic => !instance.isBadData(topic))).to.have.length(1);
  });
});
