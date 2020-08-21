<p align="center">
  <img width="200" alt="new_logo" src="https://user-images.githubusercontent.com/7512625/34460783-aaf95076-ee53-11e7-8699-3e94b6a0c270.png">
  <p align="center">
    <img alt="alu" src="https://user-images.githubusercontent.com/7512625/49665467-eb50ab80-fa8f-11e8-871c-5928dc2c3cb8.gif" />
    <img alt="alu" src="https://user-images.githubusercontent.com/7512625/49665467-eb50ab80-fa8f-11e8-871c-5928dc2c3cb8.gif" />
    <img alt="alu" src="https://user-images.githubusercontent.com/7512625/49665467-eb50ab80-fa8f-11e8-871c-5928dc2c3cb8.gif" />
  </p>
  <p align="center">
    <a href="https://facebook.github.io/react-native">
      <img alt="React Native" src="https://img.shields.io/badge/react--native-v0.51.0-05A5D1.svg" />
    </a>
    <a href="https://github.com/just4fun/stuhome/issues">
      <img alt="GitHub issues" src="https://img.shields.io/github/issues/just4fun/stuhome.svg" />
    </a>
    <a href="http://opensource.org/licenses/MIT">
      <img alt="MIT" src="https://img.shields.io/dub/l/vibe-d.svg" />
    </a>
  </p>
</p>

## What

An iOS client for https://bbs.uestc.edu.cn/ written in [react-native](https://facebook.github.io/react-native/), [redux](http://redux.js.org/) and [redux-observable](https://redux-observable.js.org/), which has been [recommended officially](https://bbs.uestc.edu.cn/forum.php?mod=viewthread&tid=1554255) as one of the best 3rd party iOS clients.

APIs are provided by [appbyme/mobcent-discuz](https://github.com/appbyme/mobcent-discuz) and partly documented by [UESTC-BBS/API-Docs](https://github.com/UESTC-BBS/API-Docs/wiki/Mobcent-API).

## Status (v1.7.3)

[<img width="250" alt="download_on_the_app_store" src="https://user-images.githubusercontent.com/7512625/27969868-353f554c-637f-11e7-869d-3963933461ca.png">](https://itunes.apple.com/cn/app/qing-shui-he-pan-stuhome/id1190564355)

![](https://cloud.githubusercontent.com/assets/7512625/12371330/88981098-bc6a-11e5-8511-6e02c5233006.gif)

## Screenshot

![stuhome](https://user-images.githubusercontent.com/7512625/36350789-f5a43838-14d8-11e8-8a90-801e69f665c1.gif)

## Features

- [x] Authentication
  - [x] Sign up (WebView)
  - [x] Sign in
  - [x] Sign out
- [x] Forum
  - [x] View forums
  - [x] View sub forums
  - [x] View topics in each forum
- [ ] Topic
  - [x] View latest topics
  - [x] View hot topics
  - [x] View topic detail and comments
  - [x] View specific comments (only from author, descending order, etc)
  - [x] Publish topic
  - [x] Edit published topic (WebView)
  - [x] Reply topic
  - [x] Reply comment
  - [x] Favor topic
  - [x] Upload images
  - [x] Emoji
  - [x] Show friend list to mention (@)
  - [ ] Report objectionable content
- [ ] Vote
  - [ ] Create vote
  - [x] Join in vote
  - [x] View vote results
- [x] Search
- [x] Notifications
  - [x] View list mentioned (@) me
  - [x] View list replied me
  - [x] View private messages
  - [x] View system notifications
  - [x] Notification alert
- [ ] Individual
  - [x] View my recent topics
  - [x] View my favorite topics
  - [x] Upload avatar
  - [ ] Update password

## Try it out

#### Run in simulator

```bash
git clone git@github.com:just4fun/stuhome.git
cd stuhome
yarn
```
Then use Xcode to open this project and simply click **Run**.

#### Run on your iOS device

http://facebook.github.io/react-native/docs/running-on-device.html#running-your-app-on-ios-devices

## Todo list

- ~~Update UI per new design~~
- ~~Submit to [App Store](https://itunes.apple.com/cn/app/qing-shui-he-pan-stuhome/id1190564355)~~
- ~~Replace deprecated Navigator with [React Navigation](https://github.com/react-navigation/react-navigation):~~ [#19](https://github.com/just4fun/stuhome/pull/19)
- Unit Testing Infrastructure: ~~[#8](https://github.com/just4fun/stuhome/pull/8)~~, [#40](https://github.com/just4fun/stuhome/issues/40)

## Known issues

- ~~User avatar is not displayed sometimes:~~ [RN/#5616](https://github.com/facebook/react-native/issues/5616) (Fixed by [RN/#7262](https://github.com/facebook/react-native/pull/7262), and the patch is released in `0.26.0`)
- ~~Switching between pages is not very smooth sometimes~~ (Fixed by [#19](https://github.com/just4fun/stuhome/pull/19))
- Image could not be inserted to TextInput: [RN/#17468](https://github.com/facebook/react-native/issues/17468), [RN/#18566](https://github.com/facebook/react-native/issues/18566)
- Unit tests are not working due to deprecated property in react-native-mock. [react-native-mock/#158](https://github.com/RealOrangeOne/react-native-mock/pull/158), [#40](https://github.com/just4fun/stuhome/issues/40)
- You need to patch this fix [RN/#25146](https://github.com/facebook/react-native/pull/25146/files#diff-263fc157dfce55895cdc16495b55d190) in your local if you want to run the app with XCode 11, until the app upgraded to latest RN

## FAQ

https://github.com/just4fun/stuhome/wiki/FAQ

## License

[The MIT License](http://opensource.org/licenses/MIT)
