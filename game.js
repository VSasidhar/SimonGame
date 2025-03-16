
const buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false
var level = 0;


$(document).keypress(function(ev){
    console.log(ev.key);
    nextSequence();
    started = true;
   updateH1Tag(level);

    })

function nextSequence(){
    userClickedPattern=[];
    level+=1;
   updateH1Tag(level);
   let randomNumebr =  Math.floor(Math.random()*4);
   var randomChosenColour = buttonColours[randomNumebr];
   gamePattern.push(randomChosenColour);
   playSound(randomChosenColour);
   animate(randomChosenColour);
}

function checkAnswer(currentLevel){

    if(gamePattern[currentLevel]=== userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(()=>{
                nextSequence();
            }, 1000)
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
  
        startOver();
    }

}

function updateH1Tag(level){

    $("h1").text(" Level "+level);

}

function animate(color){
    $("#"+color).fadeIn(100).fadeOut(100).fadeIn(100);

}

function playSound(name){
var audio = new Audio("./sounds/"+name+".mp3");
audio.play();
}


$(".btn").click(function(){
    let userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor)
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function animatePress(color){
    $("#"+color).addClass("pressed");
    setTimeout(function(){
        $("#"+color).removeClass("pressed");
    },100)
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }


