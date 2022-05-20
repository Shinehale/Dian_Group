function back (){
  location.href="index.html";
}
function give(){
  var user=document.querySelector('.userinput').value;
  var pass=document.querySelectorAll('.passinput')[0].value;
  var pss=document.querySelectorAll('.passinput')[1].value;
  if (user==''||pass==''||pss=='') {
    alert('请输入完整信息以完成注册');
  }
  else{
    if (pss!=pass) {
      alert('两次密码不一样,请校验');
    }
    else {
      let nw={
        user:user,
        pass:pass
      };
      alert('注册成功');
    }
  }
  
  
}