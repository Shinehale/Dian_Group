let sdel=0;
let goal=0;
function details(p) {
  let val=eval(p);
  let col=val%7;
  let row=((val-col)/7);
  var s="";
  if (col==1) s=s+'一';
  if (col==2) s=s+'二';
  if (col==3) s=s+'三';
  if (col==4) s=s+'四';
  if (col==5) s=s+'五';
  if (col==6) s=s+'六';
  if (col==7) s=s+'七';
  s=s+'-';
  s=s+(2*row+1)+'-'+(2*row+2);
  var lists=JSON.parse(localStorage.getItem('namelists'))||[];
  let binggo=100;
  for (let i=0;i<lists.length;i++)
  if (lists[i].time==s) binggo=i;
  dis_play(lists[binggo]);
  document.querySelector('.cent').style.display='block';
  document.querySelector('.mud').style.display='block';
  sdel=binggo;
  goal=val;
}

function dis_play(tar){
  document.querySelector('.clname').innerText=tar.class;
  var ss= tar.time;
  let ns=ss.substring(2,ss.length);
  document.querySelectorAll('.inner-1')[0].innerText='第'+tar.weeks+'周';
  document.querySelectorAll('.inner-1')[1].innerText='第'+ns+'节';
  document.querySelectorAll('.inner-1')[2].innerText=tar.teacher;
  document.querySelectorAll('.inner-1')[3].innerText=tar.location;
}
function back(e){
  document.querySelector('.mud').style.display='none';
  document.querySelector('.cent').style.display='none';
}
function back1(e){
  document.querySelector('.mud1').style.display='none';
  document.querySelector('.sure').style.display='none';
}
function further (){
  document.querySelector('.mud1').style.display='block';
  document.querySelector('.sure').style.display='block';
}
function Delete(){
  var lists=JSON.parse(localStorage.getItem('namelists'))||[];
  lists.splice(sdel,1);
  localStorage.setItem('namelists',JSON.stringify(lists));
  document.querySelectorAll('.sched')[goal-1].style.opacity='0.0';
}
function further_(){
  document.querySelector('.chag').style.display='block';
}
function back2(){
  document.querySelector('.chag').style.display='none';
}
function changename(){
  let new_dc=document.querySelector('.ips').value;
  var lists=JSON.parse(localStorage.getItem('namelists'))||[];
  let tar=lists[sdel];
  tar.class=new_dc;
  localStorage.setItem('namelists',JSON.stringify(lists));
  location.reload();
}