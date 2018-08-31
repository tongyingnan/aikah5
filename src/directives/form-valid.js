import helper from '../modules/helper';

export const formType = {
  bind: function (el, binding) {
    $(el).change(function () {
      if(el.value || el.value === 0){
        var passed = true;
        switch (binding.value){
          case 'mobile': passed = el.value.toString().isMobile(); break;
          case 'email': passed = el.value.toString().isEmail(); break;
          case 'idcard': passed = el.value.toString().isId(); break;
          case 'number': passed = el.value.toString().isNumber(); break;
        }
        if(!passed){
          var msg = $(el).attr('desc') + '格式不正确';
          helper.toast(msg);
          $(el).attr('error', msg)
        }else{
          if(el.getAttributeNode('error')){
            el.removeAttributeNode(el.getAttributeNode('error'))
          }
        }
      }
    });
  }
}


export const formLength = {
  bind: function (el, binding) {
    $(el).change(function () {
      if(el.value || el.value === 0){
        var passed = true;
        var minlength, maxlength;
        if(typeof binding.value === 'string'){
          var tmpArr = binding.value.split(',');
          minlength = Number(tmpArr[0]);
          maxlength = Number(tmpArr[1]);
        }else{
          minlength = binding.value;
          maxlength = minlength;
        }
        if(el.value.toString().length < minlength || el.value.toString().length > maxlength){
          var msg = $(el).attr('desc') + '格式不正确';
          helper.toast(msg);
          $(el).attr('error', msg)
        }else{
          $(el).removeAttribute('error');
        }
      }
    });
  }
}
