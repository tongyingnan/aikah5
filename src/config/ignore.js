module.exports = {
  ignores: [
    '(^/user/(login|regist|forgetpwd|resetpwd|checkPhone))',
    '(^/sms/code)',
    '(^/doc/\\w+)',
    '(^/share/qrcode)', //加在這里為了在另外一個瀏覽器里打開的時候不跳到登陸頁面
    '(^/appinfo)'
  ],
  test: function (path) {
    var regStr = '('+this.ignores.join('|')+')';
    var result = new RegExp(regStr, 'i').test(path);
    return result
  }
}

