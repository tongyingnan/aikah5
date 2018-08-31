import Vue from 'vue'
import helper from './helper'

export const isLogin = function () {
  return !!helper.get('token')
}

/* 弹出错误信息
    @param msg `String` 要显示的错误信息
    @param handler `Function` 显示完错误信息之后要执行的函数 - 可选
    @param duration `Number` 错误信息停留的时间（毫秒） - 可选
   Usage:
    toast(res.status.msg, function () {
      // do something...
    }, 1000)
*/

export const toast = function (msg) {
  mui.toast(msg, {
    type: 'div'
  });
  return {
    done: function (callback) {
      setTimeout(() => {
        callback();
      }, 2000)
    }
  }
};

export const confirm = function (msg) {
  mui.confirm("", msg, ["确定"], e => {
  });
}

//loading加载
var loading = 0;
export const showLoading = function (msg) {
  $('#appLoading').find('.abs').html(msg || '加载中...');
  loading += 1; //loading=loading + 1 触发一次loading加一
  setTimeout(function () {
    if (loading > 0) {
      $('#appLoading').show();
    } 
  }, 100);
}

export const hideLoading = function () {
  loading -= 1; //loading=loading - 1
  setTimeout(function () {
    if (loading < 1) {
      $('#appLoading').hide();
    } 
  }, 100);
  // 30秒无响应则强制隐藏加载中效果。
  setTimeout(function () {
    if (loading > 0) {
      loading = 0;
      $('#appLoading').hide();
    }
  }, 30000);
}

//节日弹窗的
// export const alertDom = function (text, img, link) {
//   var $dom = $('#fesTiv');
//   if(link){
//     $dom.find('a').attr('href', link);
//   }
//   if(text){
//     $dom.find('p').html(text);
//     $dom.find('.text').show();
//   }
//   if(img){
//     $dom.find('img').attr('src', img);
//   }
//
// }

// export const festivNone = function(){
//     setTimeout(() => {
//       $('#fesTiv').hide();
//       $(".contact-pop-bg").hide()
//     }, 3000)
// }

export const alert = function (msg, title, btns, callback) {
  mui.alert(msg, title, btns, callback);
}

/*获取本周、本月、本年起止日期
 * return {}
 */
export const getNowDate = function () {

  var now = new Date(); //当前日期
  var nowDayOfWeek = now.getDay(); //今天本周的第几天
  var nowDay = now.getDate(); //当前日
  var nowMonth = now.getMonth(); //当前月
  var nowYear = now.getYear(); //当前年
  nowYear += (nowYear < 2000) ? 1900 : 0; //

  //格式化日期：yyyy-MM-dd
  function formatDate(date) {
    var myyear = date.getFullYear();
    var mymonth = date.getMonth() + 1;
    var myweekday = date.getDate();

    if (mymonth < 10) {
      mymonth = "0" + mymonth;
    }
    if (myweekday < 10) {
      myweekday = "0" + myweekday;
    }
    return (myyear + "-" + mymonth + "-" + myweekday);
  }

  //获得某月的天数
  function getMonthDays(myMonth) {
    var monthStartDate = new Date(nowYear, myMonth, 1);
    var monthEndDate = new Date(nowYear, myMonth + 1, 1);
    var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
    return days;
  }



  return {
    nowYearStart: formatDate(new Date(nowYear, 0, 1)),
    nowYearEnd: formatDate(new Date(nowYear, 11, 31)),
    nowMonthStart: formatDate(new Date(nowYear, nowMonth, 1)),
    nowMonthEnd: formatDate(new Date(nowYear, nowMonth, getMonthDays(nowMonth))),
    nowWeekStart: formatDate(new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1)),
    nowWeekEnd: formatDate(new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek + 1)))
  }
}


export const browser = {
  v: function () {
    var u = navigator.userAgent,
      app = navigator.appVersion,
      androidLower = function () {
        if (/Android ([\d\.]*)/.test(u)) {
          return Number(RegExp.$1) < 4.4;
        }
        return undefined;
      }();
    return { //移动终端浏览器版本信息
      trident: u.indexOf('Trident') > -1, //IE内核
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器,
      iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQ HD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad
      webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
      androidLower: androidLower === true,
      androidHigher: androidLower === false
    };
  }(),
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

/**
 * 压缩图片
 * @param path
 * @param obj
 * @param callback
 */
export const dealImage = function (path, obj, callback) {
  var img = new Image();
  img.src = path;
  img.onload = function () {
    var that = this;
    // 默认按比例压缩
    var w = that.width,
      h = that.height,
      scale = w / h;
    w = obj.width || w;
    h = obj.height || (w / scale);
    var quality = 0.7;  // 默认图片质量为0.7
    //生成canvas
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    // 创建属性节点
    var anw = document.createAttribute("width");
    anw.nodeValue = w;
    var anh = document.createAttribute("height");
    anh.nodeValue = h;
    canvas.setAttributeNode(anw);
    canvas.setAttributeNode(anh);
    ctx.drawImage(that, 0, 0, w, h);
    // 图像质量
    if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
      quality = obj.quality;
    }
    // quality值越小，所绘制出的图像越模糊
    var base64 = canvas.toDataURL('image/jpeg', quality);
    // 回调函数返回base64的值
    callback(base64);
  }
}
