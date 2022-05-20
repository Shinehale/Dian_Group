document.getElementById('tijiao').addEventListener("click", ssSubmit);

function ssSubmit(e) {
  e.preventDefault();
  var classname = document.getElementById('called').value ;
  var  color=document.getElementById('color').value ;
  var  point=document.getElementById('points').value ;
  var  more=document.querySelector('#more').value ;
  var  weeks=document.querySelector('#weeks').value ;
  var  time=document.querySelector('#time').value ;
  var  who=document.querySelector('#teacher').value ;
  var  lct=document.querySelector('#location').value;
  var new_one = {
    class:classname,
    color: color,
    points : point,
    more: more,
    weeks:weeks,
    time: time,
    teacher: who,
    location: lct,
    stw:0,
    edw:0,
    all:'',
  };
  let str=new_one.weeks;
  let op_=1;
  let stars=eval(str.substring(0,1));
  if (str.substring(1,2)!=='-') {
    stars=stars*10+eval(str.substring(1,1));
    op_=3;
  }
  else {
    op_=2;
  }
  let str_=str.substring(op_,str.length);
  new_one.stw=stars;
  new_one.edw=eval(str_);
  if (new_one.class == ""||new_one.time==""||new_one.weeks==""){
    alert('请输入完整信息');
  }
  else {
    var lists=JSON.parse(localStorage.getItem('namelists'))||[];
    lists.push(new_one);
    localStorage.setItem('namelists',JSON.stringify(lists));
    alert('保存成功，请按左侧返回键返回主页面');
  }
}