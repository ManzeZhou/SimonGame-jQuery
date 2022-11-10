
const buttonColors = ['red', 'blue', 'green', 'yellow'];

let gamePattern = [];

let userClickedPattern = [];

let started = false;
let level = 0;

function checkAnswer(currentLevel) {

    console.log('userClickedPattern',userClickedPattern);
    console.log('gamePattern',gamePattern)

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if(userClickedPattern.length === gamePattern.length){

            console.log('userClickedPattern',userClickedPattern);
            console.log('gamePattern',gamePattern)

            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }

    else {
        console.log('wrong');
        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text('Game Over, Press Any Key to Restart');

        startOver();
    }
}

$(document).keypress(function () {
    if(!started) {
        $("#level-title").text("Level:" + level);
        nextSequence();
        started = true;
    }
})


// detect any of the buttons are clicked
$(".btn").click(function (){
    let userChosenColor = $(this).attr("id");

    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);

    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);

    console.log(userClickedPattern);
});




function nextSequence() {

    userClickedPattern = [];

    level++;

    $("#level-title").text("Level:" + level);


    let randomNum = Math.floor(Math.random() * 4);

    let randomChosenColor = buttonColors[randomNum];

    gamePattern.push(randomChosenColor);

    // flash animation
    $('#' + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    // add sound
    playSound(randomChosenColor);

};

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//animation fun

function animatePress(currentColor) {
    $('#'+ currentColor).addClass("pressed");

    setTimeout(function () {
        $('#' + currentColor).removeClass("pressed");
    }, 100);
}


function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}







