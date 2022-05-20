let jud=1;
let used=[0,0,0,0,0,0,0,0,0];
function getin(num){
  let s=document.querySelectorAll('.inner');
  num=num-1;
  // console.log(num);
  if (used[num]==1) return 0;
  if (jud==1) {
    s[num].innerText='X';
    used[num]=1;
  }
  else {
    s[num].innerText='O';
    used[num]=1;
  }
  jud=1-jud;
  let okk=check();
  let opt=document.querySelector('.header');
  if (okk==1) {
    if (jud==0) {opt.innerText='Winner:  X';}
    else {opt.innerText="Winner:  O";}
    for (let i=0;i<=8;i++) used[i]=1;
  }
  if (okk==0) {
    if (jud==0) opt.innerText='Next step:  O';
    else opt.innerHTML='Next step:  X';
  }
  if (okk==2){
    opt.innerText='No winner';
  }
}
function check (){
  let s=document.querySelectorAll('.inner');
  if (s[0].innerHTML==s[1].innerHTML&&s[1].innerHTML==s[2].innerHTML&&used[0]==1&&used[1]==1&&used[2]==1) return 1;
  if (s[3].innerText==s[4].innerText&&s[4].innerText==s[5].innerText&&used[3]==1&&used[4]==1&&used[5]==1) return 1;
  if (s[6].innerText==s[7].innerText&&s[6].innerText==s[8].innerText&&used[6]==1&&used[7]==1&&used[8]==1) return 1;
  if (s[0].innerText==s[3].innerText&&s[6].innerText==s[3].innerText&&used[0]==1&&used[3]==1&&used[6]==1) return 1;
  if (s[1].innerText==s[4].innerText&&s[4].innerText==s[7].innerText&&used[1]==1&&used[4]==1&&used[7]==1) return 1;
  if (s[2].innerText==s[5].innerText&&s[5].innerText==s[8].innerText&&used[2]==1&&used[5]==1&&used[8]==1) return 1;
  if (s[0].innerText==s[4].innerText&&s[4].innerText==s[8].innerText&&used[0]==1&&used[4]==1&&used[8]==1) return 1;
  if (s[2].innerText==s[4].innerText&&s[4].innerText==s[6].innerText&&used[2]==1&&used[4]==1&&used[6]==1) return 1;
  let p=1,i=1;
  for (i=0;i<9;i++){
    if (used[i]==0) p=0;
  }
  if (p==0) return 0;
  else return 2;
  
}

function reset(){
  let p=document.querySelectorAll('.inner');
  for (let i=0;i<9;i++){
    used[i]=0;
    p[i].innerHTML='';
  }
  jud=1;
  let pp=document.querySelector('.header');
  pp.innerText='Next step: X'
}