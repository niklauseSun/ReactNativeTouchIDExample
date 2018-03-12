import React, { Component } from 'react';
import Storage from 'react-native-storage';

import {
  View,AsyncStorage
} from 'react-native';

import SYNC from './sync';

var storage;
var defaultExpires = 1000*3600*24;
var size = 1000;

export default class MyStorage extends Component {
  static _getStorage() {
    if (storage==undefined) {
      storage = new Storage({
        size: size,
        storageBackend: AsyncStorage,
        defaultExpires: defaultExpires,
        enableCache: true,
        sync: SYNC
      });
    }
    return storage;
  }
  /**
   * key: 保存的key值
   * object: 保存的value
   * expires: 有效时间
   */
  static _save3(key, object, expires) {
    this.isInit();
    storage.save({
      key: key,
      data: object,
      expires: expires
    });
  }

  static _remove(key) {
    this.isInit();
    storage.remove({
      key: key,
    });
  }

  static _removeAll() {
    this.isInit();
    storage.clearMap();
  }

  static _clearDataByKey(key) {
    this.isInit();
    storage.clearMapForKey(key);
  }

  /**
   * 查询数据
   */

  static _load3(key, params, someFlag, callBack) {
    this.isInit();
    storage.load({
      key: key,
      autoSync: true,
      syncInBackground: true,
      syncParams: {
        params,
        someFlag: someFlag,
      },
    }).then(ret => {
      callBack(ret);
      return ret;
    }).catch(err => {
      console.warn(err.message);
      switch (err.name) {
        case 'NotFoundError':
          // TODO
          break;
        case 'ExpiredError':
          // TODO
          break;
        default:

      }
    });
  }

  static _load(key, callBack) {
    this._load3(key, null, null, callBack);
  }

  static isInit() {
    if (storage == undefined) {
      throw "请先调用_getStorage()进行初始化";
    }
  }
}
