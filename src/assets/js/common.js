/**
 * 格式化日期
 * new Date().format("yyyy-MM-dd")
 */
Date.prototype.format = function(format) {
  var o = {
    "M+" : this.getMonth() + 1, // month
    "d+" : this.getDate(), // day
    "h+" : this.getHours(), // hour
    "m+" : this.getMinutes(), // minute
    "s+" : this.getSeconds(), // second
    "q+" : Math.floor((this.getMonth() + 3) / 3), // quarter
    "S+" : this.getMilliseconds()
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for ( var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      var formatStr = "";
      for ( var i = 1; i <= RegExp.$1.length; i++) {
        formatStr += "0";
      }
      var replaceStr = "";
      if (RegExp.$1.length == 1) {
        replaceStr = o[k];
      } else {
        formatStr = formatStr + o[k];
        var index = ("" + o[k]).length;
        formatStr = formatStr.substr(index);
        replaceStr = formatStr;
      }
      format = format.replace(RegExp.$1, replaceStr);
    }
  }
  return format.replace(/NaN-aN-aN/g,"");
};
/**
 * @desc url格式校验
 * @return {boolean}
 */
String.prototype.isUrl = function(){
  var strRegex = "^[A-Za-z]+://[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+$";
  var re = new RegExp(strRegex);
  return re.test(this);
};

/**
 * @desc email格式校验
 * @param {string} strValue
 * @return {boolean}
 */
String.prototype.isEmail = function(){
  var emailExp  = /(^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$)/;
  return emailExp.test(this);
};

/**
 * @desc 域名格式校验
 * @param {string} domain
 * @return {boolean}
 */
String.prototype.isDomain = function(){
  var domain = this;
  var reg = new RegExp(/^((([A-Za-z0-9_-\u4E00-\u9FA5])|(\*))+\.)?([A-Za-z0-9_-\u4E00-\u9FA5]{1,200})$/);
  var domainPostfix = new Array(".gov.mo",".com.tw",".com.mo",".co.cc",".ce.ms",".osa.pl",".c.la",".com.hk",".net.in",".edu.tw",".org.tw",".bij.pl",".ac.cn",".ah.cn",".bj.cn",".com.cn",".cq.cn",".fj.cn",".gd.cn",".gov.cn",".gs.cn",".gx.cn",".gz.cn",".ha.cn",".hb.cn",".he.cn",".hi.cn",".hk.cn",".hl.cn",".hn.cn",".jl.cn",".js.cn",".jx.cn",".ln.cn",".mo.cn",".net.cn",".nm.cn",".nx.cn",".org.cn",".qh.cn",".sc.cn",".sd.cn",".sh.cn",".sn.cn",".sx.cn",".tj.cn",".tw.cn",".xj.cn",".xz.cn",".yn.cn",".zj.cn",".nl.ae",".org.uk",".org.nz",".org.bz",".org.au",".com.nu",".com.my",".com.au",".co.uk",".co.kr",".co.jp",".nu.ae",".nl.ae",".com.au",".cf.gs",".com.cn",".net.cn",".org.cn",".edu.cn",".com",".cn",".mobi",".tel",".asia",".net",".org",".name",".me",".info",".cc",".hk",".biz",".tv",".la",".fm",".cm",".am",".sh",".us",".in",".ro",".ru",".hu",".tk",".co",".cx",".at",".tw",".ws",".vg",".vc",".uz",".to",".tl",".th",".tf",".tc",".st",".so",".sk",".sg",".sc",".pl",".pe",".nu",".nf",".ne",".my",".mu",".ms",".mo",".lv",".lt",".lc",".jp",".it",".io",".im",".ie",".gs",".gp",".gl",".gg",".gd",".fr",".fi",".eu",".edu",".dk",".de",".cz",".ch",".ca",".bi",".be",".au",".ae",".pw",".ly",".wang",".ren",".top",".club");
  var isReplaced = false;
  for(var idx=0; idx < domainPostfix.length; idx++){
    var postFix = domainPostfix[idx];
    var regStr = "(\\"+postFix+")$";
    var endReg = new RegExp(regStr);
    if(endReg.test(domain.toLowerCase())){
      isReplaced = true;
    }
    domain = domain.replace(postFix,"");
  }
  if(!isReplaced){
    return false;
  }
  return reg.test(domain);
};

/**
 * @desc 邮编格式校验
 * @param String zipcode
 * @return boolean
 */
String.prototype.isZipCode = function (){
  var reg = /^[0-9]{6}$/;
  return reg.test(this);
};

/**
 * @desc 固定电话格式校验
 * @param String phone
 * @return boolean
 */
String.prototype.isPhone = function (){
  var reg = /((^(\+86)|(86))?(((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$))/;
  return reg.test(this);
};

/**
 * @desc 手机号码格式校验
 * @param String mobile
 * @return boolean
 */
String.prototype.isMobile = function(){
  var reg = /^((\+86)|(86))*(\d{11})$/;
  return reg.test(this);
};

/**
 * @desc 纯数字校验
 * @param String mobile
 * @return boolean
 */
String.prototype.isNumber = function(){
  var reg = /^[0-9\.]+$/;
  return reg.test(this);
};
/**
 * @desc 身份证校验
 * @param String id
 * @return boolean
 */
String.prototype.isId = function(){
  var reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
  return reg.test(this);
};

/**
 * 格式化输入字符串
 * 示例："hello {0}".format('world')；返回'hello world'
 */
String.prototype.format = function(){
  var a = arguments;
  return this.replace(/\{(\d+)\}/g, function(s, i) {
    return a[i] || '';
  });
};