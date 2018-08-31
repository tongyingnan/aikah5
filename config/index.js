const path = require('path')
const appInfo = require('./appInfo')('app');  // TODO 打包时 修改
const config = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '',
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 3000,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    cssSourceMap: false
//    proxyTable: { 
//  	  '/fastpay': {  //使用"/fastpay"来代替"http://debug.hgesy.com:8080" 
//  	    target: 'http://debug.hgesy.com:8080/FastPay/attachments/ymf/116e672f5c8a0040b7e3036c85e7e7a2.html', //源地址 
//  	    changeOrigin: true, //改变源 
//  	    pathRewrite: { 
//  	      '^/fastpay': 'http://debug.hgesy.com:8080/FastPay/attachments/ymf/116e672f5c8a0040b7e3036c85e7e7a2.html' //路径重写 
//  	      } 
//  	  } 
//  	}
  },
  appInfo: appInfo,
}
if(process.env.APK === 'apk'){
  config.build.index = path.resolve(__dirname, '../../cordova/www/index.html');
  config.build.assetsRoot = path.resolve(__dirname, '../../cordova/www');
}

//config.appInfo.domain = 'http://localhost:3001';  // TODO 打包时 注释掉

module.exports = config
