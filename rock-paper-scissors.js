let score=JSON.parse(localStorage.getItem('score'))||{
  wins:0,
  losses:0,
  ties:0
};
updateScore();
const playAutomatically=document.querySelector('.js-autoplay-button');
const move=document.querySelector('.js-success');
const suc=document.querySelector('.js-our-para');
document.querySelector('.js-r-button').addEventListener('click',()=>{
  playGame('rock');
});
document.querySelector('.js-p-button').addEventListener('click',()=>{
  playGame('paper');
});
document.querySelector('.js-s-button').addEventListener('click',()=>{
  playGame('scissors');
});
document.querySelector('.js-reset-button').addEventListener('click',()=>{
  resetScore();
})
document.querySelector('.js-autoplay-button').addEventListener('click',()=>{
  autoplay();
})
let isautoplay=false;
let intervalId;
function autoplay(){
  if(!isautoplay){
    intervalId=setInterval(() => {
      const playerMove=compMove();
      playGame(playerMove);
    },1000);
    playAutomatically.innerHTML='stop playing';
    isautoplay=true;
  } else{
    clearInterval(intervalId);
    isautoplay=false;
  }
}
function compMove(){
  const guessNum=Math.random();
  if(guessNum<=1/3&&guessNum>0)
  return 'rock';
  else if(guessNum<=2/3&&guessNum>1/3)
  return 'paper';
  else
  return 'scissors';
}
function playGame(playerMove){
  let computerMove=compMove();
  if(computerMove===playerMove){
    score.ties++;
    suc.innerHTML='tie';
  }
  else if((computerMove==='paper'&&playerMove==='scissors')
  ||(computerMove==='rock'&&playerMove==='paper')
  ||(computerMove==='scissors'&&playerMove==='rock')){
    score.wins++;
    suc.innerHTML='you win.'
  }
  else{
    score.losses++;
    suc.innerHTML='you lose.'
  }
  localStorage.setItem('score',JSON.stringify(score));
  updateScore();
  move.innerHTML=`you
  <img class="rps-image" src="images/${playerMove}-emoji.png">
  computer
  <img class="rps-image" src="images/${computerMove}-emoji.png">`;
}
function updateScore(){
  document.querySelector('.js-score-para').innerHTML=`wins:${score.wins}, losses:${score.losses}, ties:${score.ties}`;
}
function resetScore(){
  score.wins=0;
  score.losses=0;
  score.ties=0;
  suc.innerHTML='';
  move.innerHTML='';
  updateScore();
}
