module.exports = {
  list: [
    {name: '中国光大银行', color: 'red', icon: 'ico1', union_num: '303100000006'},
    {name: '中国建设银行', color: 'blue', icon: 'ico2', union_num: '105100000017'},
    {name: '广发银行', color: 'red', icon: 'ico3', union_num: '306741020551'},
    {name: '华夏银行', color: 'red', icon: 'ico4', union_num: '304100040000'},
    {name: '交通银行', color: 'blue', icon: 'ico5', union_num: '301290000007'},
    {name: '中国民生银行', color: 'blue', icon: 'ico6', union_num: '305100000013'},
    {name: '中国平安银行', color: 'red', icon: 'ico7', union_num: '307584007998'},
    {name: '浦发银行', color: 'blue', icon: 'ico8', union_num: '310290000013'},
    {name: '兴业银行', color: 'blue', icon: 'ico9', union_num: '309391000011'},
    {name: '中信银行', color: 'red', icon: 'ico10', union_num: '302100011000'},
    {name: '招商银行', color: 'red', icon: 'ico11', union_num: '308584000013'},
    {name: '中国银行', color: 'red', icon: 'ico12', union_num: '104100000004'},
    {name: '工商银行', color: 'red', icon: 'ico13', union_num: '102100099996'},
    {name: '中国邮政储蓄银行', color: 'green', icon: 'ico14', union_num: '403100000004'},
    {name: '中国农业银行', color: 'green', icon: 'ico15', union_num: '103100000026'},
    {name: '深圳发展银行', color: 'blue', icon: 'ico16', union_num: '307584007998'},
    {name: '农村信用社', color: 'green', icon: 'ico17', union_num: '402241000000'},
    {name: '上海农商银行', color: 'blue', icon: 'ico18', union_num: '322290000011'},
    {name: '东亚银行', color: 'red', icon: 'ico19', union_num: '502290000006'},
  ],
  get: function (key) {
    for(var i=0; i<this.list.length; i++){
      if(key === this.list[i].name){
        return this.list[i];
      }
    }
    return {name: '', color: 'blue', icon: ''};
  }
}
