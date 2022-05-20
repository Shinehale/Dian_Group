var lists=JSON.parse(localStorage.getItem('namelists'))||[];
let a=document.querySelectorAll('.sched');
let len=lists.length;
for (let i=0;i<len;i++){
  var ps=lists[i].time;
  let day=ps.substring(0,1);
  let eday= 0;
  let which=ps.substring(2,3);
  let jud=ps.substring(3,4);
  if (day==='一') eday=1;
  if (day==='二') eday=2;
  if (day==='三') eday=3;
  if (day==='四') eday=4;
  if (day==='五') eday=5;
  if (day==='六') eday=6;
  if (day==='日'||day==='七') eday=7;
  let ewhich=eval(which);
  if (jud !== '-') {
    ewhich=ewhich*10+eval(jud);
  }
  let conpst= ((ewhich-1)/2)*7+eday;  
  let ts=a[conpst-1].style;
  ts.backgroundColor = lists[i].color;
  ts.opacity='0.9';
  let cls=lists[i].class;
  let lct=lists[i].location;
  let teacher=lists[i].teacher;
  a[conpst-1].innerText=cls+lct+'     '+teacher;
}
