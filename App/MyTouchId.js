import React, { Component } from 'react'

import TouchID from 'react-native-touch-id'

import { Toast } from 'antd-mobile'

export default class MyTouchId extends Component {

  static _authenticate(msg,callBack) {
    TouchID.authenticate(msg).then(success => {
      // 验证成功
      Toast.info('验证成功')
      callBack(success,nil)
    }).catch(err => {
      switch(err.name) {
        case 'LAErrorAuthenticationFailed':
          Toast.info('验证失败');
          break;
        case 'RCTTouchIDNotSupported':
          Toast.info('多次验证失败，TouchID已经被锁定');
          break;
        case 'RCTTouchIDUnknownError':
          Toast.info('多次验证失败，请前往配置重新设置TouchID')
          break;
        default:
          break;
      }
      callBack(false,err.name);
    });
  }
}
