import {
  toast,
  showLoading,
  hideLoading,
  alert,
  confirm,
} from './util'

var storage = (function() {
  var isSupport = function(storageType) {
    var testKey = 'test',
      storage = window[storageType];
    try {
      storage.setItem(testKey, '1');
      storage.removeItem(testKey);
      return storageType in window && window[storageType];
    } catch (e) {
      return false;
    }
  }
  var storages = ['localStorage', 'sessionStorage'];
  for (var i = 0, len = storages.length; i < len; i++) {
    if (isSupport(storages[i])) return window[storages[i]];
  }
  return null;
})();

const helper = {
  storage: storage,
  /* 判断 obj 是否为 null
     Usage:
       var obj = null;
       helper.isNull(obj); // 输出 true
  */
  isNull: function(obj) {
    return obj === null || obj !== obj;
  },

  /* 判断 obj 是否为 function
     Usage:
       var obj = 'abc';
       helper.isFunction(obj); // 输出 false
  */
  isFunction: isType('Function'),

  /* 判断 obj 是否为 object
     Usage:
       var obj = {};
       helper.isObject(obj); // 输出 true
  */
  isObject: isType('Object'),

  /* 判断 obj 是否为 array
     Usage:
       var obj = ['abc'];
       helper.isArray(obj); // 输出 true
  */
  isArray: window.isArray || isType('Array'),

  /* 判断 obj 是否为 string
     Usage:
       var obj = 'abc';
       helper.isString(obj); // 输出 true
  */
  isString: isType('String'),

  /* 判断 obj 是否为 undefined
     Usage:
       var obj = 'abc';
       helper.isUndefined(obj); // 输出 false
  */
  isUndefined: isType('Undefined'),

  // 判断是否为空
  // 接受Array或普通类型
  isEmpty: function(value) {
    if(value && value.constructor === Array){
      for(let i = 0; i < value.length; i++){
        if(isEmpty(value[i])){
          return true;
        }
      }
    }
    else{
      return isEmpty(value);
    }
  },

  // 获取 Cookie
  getCookie: getCookie,
  // 设置 Cookie
  setCookie: setCookie,
  // 移除 Cookie
  removeCookie: removeCookie,

  /* 判断请求是否成功
      @param res `Object` 后台返回的response对象
     Usage:
      helper.isSuccess(res)
  */
  isSuccess: function(res) {
    if (Number(res.status) == 0) {
      return true;
    } else {
      if(typeof res.msg === 'string'){
        toast(typeof res.msg === 'string' ? res.msg : JSON.stringify(res.msg));
        if(res.msg === '授权信息已失效，请重新登录！'){
        location.hash = '/user/login?exit=1';
      }
      }else{
        if(res.msg.isConfirm && res.msg.isConfirm == true){
          confirm(res.msg.detail ?res.msg.detail:'');
        }else{
          toast(res.msg.detail ?res.msg.detail:'');
        }
      }
      return false;
    }
  },

  /* 获取浏览器存储里key为item的值
      @param item 要获取的数据的索引值
     Usage:
       helper.get('token');
  */
  get: function(item) {
    var value;
    if (this.storage) {
      value = this.storage.getItem(item);
    } else {
      value = getCookie(item);
    }
    return (value ? this.decrypt(value) : '');
  },


  /* 将数据存储在浏览器存储里
      @param obj 要存储的数据对象
     Usage:
       j.set({ token: 'as23q1sdf212swsxx', uname: 'jacket' });
  */
  set: function(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        this.storage ? this.storage.setItem(key, this.encrypt(String(obj[key]))) :
          setCookie(key, this.encrypt(String(obj[key])), 1);
      }
    }
    return this;
  },

  /* 获取浏览器存储里key为item的JSON
      @param item 要获取的数据的索引值
     Usage:
       helper.getJson('token');
  */
  getJson: function(item) {
    var data = this.get(item);
    if(data){
      return JSON.parse(data);
    }
    else{
      return {};
    }
  },

  /* 获取浏览器存储里key为item的JSON
      @param item 要获取的数据的索引值
     Usage:
       helper.setJson('token');
  */
  setJson: function(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        obj[key] = JSON.stringify(obj[key]);
      }
    }
    return this.set(obj);
  },


  /* 删除浏览器存储的数据
      @param itemArr 要删除的数据的key组成的数组
     Usage:
      j.remove(['token', 'uname']); // 将删除浏览器存储中，索引为token和uname的数据
  */
  remove: function(itemArr) {
    for (var i = 0, len = itemArr.length; i < len; i++) {
      if (this.storage) {
        this.storage.removeItem(itemArr[i]);
      } else {
        removeCookie(itemArr[i]);
      }
    }
    return this;
  },

  /* 获取search的某个值
     Usage:
       页面url为http://a.com?i=1&j=2&k=3, j.getSearchItem('k') 将输出'3'
  */
  getSearchItem: function(key) {
    var o = this.getSearch();
    return o[key] ? decodeURIComponent(o[key]) : null;
  },

  /* 获取当前年月日
      @param seperator `String` 分隔符
     Usage:
       helper.getCurrentDate('/')
       输出
       2016/01/02
  */
  getCurrentDate: function(seperator) {
    seperator = seperator && typeof seperator == 'string' ? seperator : '-';
    var o = new Date;
    var y = o.getFullYear(),
      m = o.getMonth() + 1,
      d = o.getDate();
    if (m < 10) m = '0' + m;
    if (d < 10) d = '0' + d;
    return y + seperator + m + seperator + d;
  },

  // 加密
  encrypt: function(value) {
    var encryptValue = new String,
      mask, maskValue;
    for (var i = 0, len = value.length; i < len; i++) {
      mask = Math.round(Math.random() * 111) + 77;
      maskValue = value.charCodeAt(i) + mask;
      mask += i;
      encryptValue += String.fromCharCode(maskValue, mask);
    }
    return encryptValue;
  },

  // 解密
  decrypt: function(value) {
    var decryptValue = new String,
      k = 0,
      v, m;
    var decrypt = function(v, m, i) {
      v = v.charCodeAt(0);
      m = m.charCodeAt(0);
      m -= i;
      v -= m;
      return String.fromCharCode(v);
    }
    for (var i = 0, len = value.length; i < len; i++) {
      if (!(i % 2)) {
        v = value[i];
      } else {
        m = value[i];
        decryptValue += decrypt(v, m, k);
        k++;
      }
    }
    return decryptValue;
  },

  /* 获取对象组成的数组中，key=value的对象在数组中的索引值
      @param arr 'Array' 数组
      @param key 'String|Number' 对象的key
      @param value 'String|Number|Boolean' 对象的value
     Usage:
      var arr = [ {a: 0}, {a: 1}, {b: 3}, {d: '8'} ]
      helper.getIndex(arr, 'a', 1);
      输出
      1
  */
  getIndex: function(arr, key, value) {
    for (var i = 0, len = arr.length; i < len; i++) {
      if (!this.isObject(arr[i])) return -1;
      for (var k in arr[i]) {
        if (k == key && arr[i][k] == value) return i;
      }
    }
    return -1;
  },

  // 时间格式化
  format(value,format){
    if(!value){
      return '';
    }

    var date = '';
    try {
      date = new Date(value);
    } catch (e) {
      console.log(e);
      return '';
    }

    if(!format){
      format = 'MM-dd hh:mm';
      if(date.getFullYear() != new Date().getFullYear()){
        format = 'yyyy-MM-dd hh:mm';
      }
    }

    var o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        "S": date.getMilliseconds()
    };

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
  },

  // number格式化
  // number 123,456,789.00
  // format ',3.2'
  formatNumber(value, format) {
    value = String(value);
    if (!value) {
      return '';
    }
    format = format || '';
    /(\d*)\.?(\d*)/.test(value);
    var partA = RegExp.$1,
      partB = RegExp.$2;
    if (/,(\d)/.test(format)) {
      var step = RegExp.$1,
        len = partA.length,
        times = Math.ceil(len / step) - 1,
        cursor = len;
      partA = partA.split('');
      for (let i = 0; i < times; i++) {
        cursor = cursor - step;
        partA.splice(cursor, 0, ',');
      }
      partA = partA.join('');
    }
    if (/\.(\d)/.test(format)) {
      var dot = Number(RegExp.$1),
        partB = (partB + '0000').slice(0, dot);
    }
    partA || (partA = '0');
    partB && (partB = '.' + partB);
    return partA + partB;
  },
  showLoading,
  hideLoading,
  toast,
  alert
}

function isType(type) {
  return function(obj) {
    return {}.toString.call(obj) == '[object ' + type + ']';
  }
};

function isEmpty(value) {
  if(typeof value == 'string'){
    value = value.trim();
  }
  return !value && value !== 0;
}

/* 获取 Cookie 值
 */
function getCookie(name) {
  var c = document.cookie;
  if (c.length > 0) {
    var s = c.indexOf(name + '=');
    if (s != -1) {
      s = s + name.length + 1;
      var e = c.indexOf(';', s);
      return unescape(c.substring(s, e));
    }
  }
  return '';
};

/* 保存 Cookie 值
 */
function setCookie(name, value, expiredays) {
  var exdate = new Date();
  if (value != null && value != '' && value != 'null') {
    exdate.setDate(exdate.getDate() + expiredays);
  } else {
    exdate.setDate(exdate.getDate() - 1);
  }
  document.cookie = name + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString());
};

/* 删除 Cookie
 */
function removeCookie(name) {
  setCookie(name, '', -1);
};

export default helper;



