import {
  Linking,
  AlertIOS,
  ActionSheetIOS
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import MESSAGES from '../constants/messages'

function takePhoto({
  takePhotoOptions,
  uploadAction
}) {
  ImagePicker.openCamera(takePhotoOptions).then(image => {
    uploadAction && uploadAction(image);
  }).catch(e => {
    if (e.code === 'E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR') {
      AlertIOS.alert('提示', MESSAGES[e.code]);
    } else if (e.code === 'E_PICKER_NO_CAMERA_PERMISSION') {
      goToAppSettings(MESSAGES[e.code]);
    }
  });
}

function selectPhoto({
  selectPhotoOptions,
  uploadAction
}) {
  ImagePicker.openPicker(selectPhotoOptions).then(images => {
    // `images` will be singular when update avatar.
    uploadAction && uploadAction(images);
  }).catch(e => {
    if (e.code === 'E_PERMISSION_MISSING') {
      goToAppSettings(MESSAGES[e.code]);
    }
  });
}

function goToAppSettings(message) {
  AlertIOS.alert(
    '提示',
    message,
    [
      { text: '取消', style: 'cancel' },
      { text: '前往', onPress: () => Linking.openURL('app-settings:') },
    ],
  );
}

export default {
  showUploadDialog({
    takePhotoOptions,
    selectPhotoOptions,
    uploadAction,
    cancelAction
  }) {
    ActionSheetIOS.showActionSheetWithOptions({
      options: [
        '拍照',
        '从手机相册选择',
        '取消'
      ],
      cancelButtonIndex: 2
    },
    (buttonIndex) => {
      switch (buttonIndex) {
        case 0:
          takePhoto({
            takePhotoOptions,
            uploadAction
          });
          break;
        case 1:
          selectPhoto({
            selectPhotoOptions,
            uploadAction
          });
          break;
        case 2:
          cancelAction && cancelAction();
      }
    });
  }
};
