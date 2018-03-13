import TouchID from 'react-native-touch-id'

export default class MyTouchId {
  static _isSupport() {
    if (TouchID.isSupported()) {
      return true;
    }
    return false
  }

  static _supportType() {
    TouchID.isSupported().then(biometryType => {
      // success code
      if (biometryType === 'FaceID') {
        console.log('FaceID is supported');
        return 'FaceID';
      } else {
        console.log('TouchID is supported');
        return 'TouchID';
      }
    }).catch(error => {
      // faile code
      console.log(error);
    });
  }

  static _authenticate() {
    TouchID.authenticate('to demo this react-native component').then(success => {
      // 验证成功
      // TODO
      return true;
    }).catch(err => {
      // TODO
      return err.message;
    });
  }
}
