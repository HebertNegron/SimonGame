var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keydown(function() {
    if(!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
    level++;
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    userClickedPattern = [];
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3" );
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound('wrong');
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}