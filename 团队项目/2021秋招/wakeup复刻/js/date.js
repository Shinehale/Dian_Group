function calculation(p){
  let jday=6;
  let jmon=9;
  jday=jday+7*(p-1);
  if (jday>30) {jmon=jmon+1;jday=jday-30;}
  if (jday>31) {jmon=jmon+1;jday=jday-31;}
  if (jday>30) {jmon=jmon+1;jday=jday-30;}
  if (jday>31) {jmon=1;jday=jday-31;}
  if (jday>31) {jmon=jmon+1;jday=jday-31;}
  let a=[];
  for (let i=0;i<7;i++){
    let ns=jday+i;
    if ((ns>30&&(jmon==9||jmon==11))) {
      ns=ns-30;
    }
    if ((ns>31&&(jmon==10||jmon==12||jmon==1))){
      ns=ns-31;
    }
    a.push(ns);
  }
  a.push(jmon);
  return a;
}
function cal(p){
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
  return binggo;
}
function check(p){
  let lis=document.querySelectorAll('.sched');
  let sum=0; 
  let lists=JSON.parse(localStorage.getItem('namelists'))||[];
  for (let i=0;i<42;i++){
    let ps=cal(i+1);
    if (ps==100) continue;
    if (lists[ps].stw<=p&&lists[ps].edw>=p){
      lis[i].style.opacity='0.9';
      lis[i].innerText=lists[ps].class+' '+lists[ps].location+lists[ps].teacher;
    }
    if (lists[ps].stw>p) {
      lis[i].style.opacity='0.5';
      lis[i].innerText='[非本周]'+lists[ps].class+' '+lists[ps].location+lists[ps].teacher;
    }
    if (lists[ps].edw<p) {
      lis[i].style.opacity='0.0';
    }
  }
}
const jzwek=5;
let nw=JSON.parse(localStorage.getItem('week'));
document.querySelector('.mo').innerText=nw;
if (nw==jzwek) {
  document.querySelector('.tag').innerText='周三';
}
else{
  document.querySelector('.tag').innerText='非本周';
}
let nw_=calculation(nw);
document.querySelector('.Month').innerText=nw_[7];
for (let i=0;i<7;i++){
  document.querySelectorAll('.day')[i].innerText=nw_[i];
  if (nw_[7]=='10'&&nw_[i]=='7') {
    document.querySelectorAll('.date_')[i].style.color='black';
  }
  else {
    document.querySelectorAll('.date_')[i].style.color='gray';
  }
}
check(nw);
function add(){
  let nw=JSON.parse(localStorage.getItem('week'));
  nw=nw+1;
  document.querySelector('.mo').innerText=nw;
  if (nw==jzwek) {
    document.querySelector('.tag').innerText='周三';
  }
  else{
    document.querySelector('.tag').innerText='非本周';
  }
  let nw_=calculation(nw);
  document.querySelector('.Month').innerText=nw_[7];
  for (let i=0;i<7;i++){
    document.querySelectorAll('.day')[i].innerText=nw_[i];
    if (nw_[7]=='10'&&nw_[i]=='7') {
      document.querySelectorAll('.date_')[i].style.color='black';
    }
    else {
      document.querySelectorAll('.date_')[i].style.color='gray';
    }
  }
  check(nw);
  localStorage.setItem('week',JSON.stringify(nw));
  // location.reload();
}
function bonus(){
  let nw=JSON.parse(localStorage.getItem('week'));
  nw=nw-1;
  document.querySelector('.mo').innerText=nw;
  if (nw==jzwek) {
    document.querySelector('.tag').innerText='周三';
  }
  else{
    document.querySelector('.tag').innerText='非本周';
  }
  let nw_=calculation(nw);
  document.querySelector('.Month').innerText=nw_[7];
  for (let i=0;i<7;i++){
    document.querySelectorAll('.day')[i].innerText=nw_[i];
    if (nw_[7]=='10'&&nw_[i]=='7') {
      document.querySelectorAll('.date_')[i].style.color='black';
    }
    else {
      document.querySelectorAll('.date_')[i].style.color='gray';
    }
  }
  check(nw);
  localStorage.setItem('week',JSON.stringify(nw));
}
