var userClickedPattern = [];

var gamePattern = [];

var buttonColors = ["red","blue","green","yellow"];

var level = 0;

$(document).keydown(function(){
    if(level===0){
      $("h1").text("Level "+level);
      nextSequence();
    }

})


$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
      if(userClickedPattern.length===gamePattern.length){
        setTimeout(function(){
          nextSequence();
        },1000);
      }
    }
    else{
      var wrongAnswer = new Audio("sounds/wrong.mp3");
      wrongAnswer.play();
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();
    }

}

function nextSequence(){
  level++;
    $("h1").text("Level "+level);
  userClickedPattern=[];
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  var selectedButton = $("#"+randomChosenColor);
  $(selectedButton).fadeOut(100).fadeIn(50);

  var randomAudio = new Audio("sounds/"+randomChosenColor+".mp3");
  randomAudio.play();
}

function startOver(){
  level=0;
  gamePattern=[];
}

function playSound(name){
  var randomAudio = new Audio("sounds/"+name+".mp3");
  randomAudio.play();
}

function animatePress(currentColor){
  $("."+currentColor).addClass("pressed");
  setTimeout(function(){
    $("."+currentColor).removeClass("pressed");
  },100);
}
