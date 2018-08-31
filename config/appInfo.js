const appMap = {
  'com.akzngj.app': {
    name: '爱卡智能管家',
    subname: '爱卡',
    package: 'app',
    // domain: 'http://m.akzngj.com',
    domain: 'http://192.168.0.110:3001',
  }
}

module.exports = function (appKey) {
  var appInfo = appMap['com.akzngj.' + appKey];

  appInfo.download = appInfo.download || {};
  appInfo.download.apk = 'http://m.akzngj.com/'+appInfo.name+'.apk';
  appInfo.version = appInfo.version || 1.97;

  return appInfo;
}
