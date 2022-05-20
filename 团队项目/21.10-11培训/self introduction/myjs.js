// function display1(){
//   document.getElementById('display1').style.display='block';
// }
// function display2(){
//   document.getElementById('display2').style.display='block';
// }
// function display3(){
//   document.getElementById('display3').style.display='block';
// }
// function display4(){
//   document.getElementById('display4').style.display='block';
// }
// function display5(){
//   document.getElementById('display5').style.display='block';
// }
// function display6(){
//   document.getElementById('display6').style.display='block';
// }
function display(wh){
  let p=document.querySelectorAll('.none');
  for (let i=0;i<=5;i++){
    p[i].style.display='none';
    if (i==wh-1) p[i].style.display='block';
  }
  let pp=document.querySelectorAll('.point');
  for (let i=0;i<=5;i++){
    pp[i].style.display='block';
    if (i==wh-1) pp[i].style.display='none';
  }
  
}