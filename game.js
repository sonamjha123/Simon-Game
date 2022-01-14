//Create an array to hold the color seq
let buttonColours= ["red", "blue", "green", "yellow"] ;
let gamePattern = [];
let userclickedPattern= [];
var started = false;
var level = 0;

//step6 Start the Game!!
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//Step 7 - Check the User's Answer Against the Game Sequence8
function checkAnswer(currentLevel) {

  //check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userclickedPattern[currentLevel]) {
    console.log("success");

    //If the user got the most recent answer right in above step, then check that they have finished their sequence with another if statement.
    if (userclickedPattern.length === gamePattern.length){

      //Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } else {

    playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

//Step1: Create A New Pattern
function nextSequence(){
  //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userclickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4) ;
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}
// Step 2 - Show the Sequence to the User with Animations and Sounds using 'playSound', 'animatePress'
//Step 4 - Add Sounds to Button Clicks
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

  //Step3: Check which button is pressed
  $(".btn").click(function(){
    var userChosenColour = $(this).attr("id");//Store the id of the button that got clicked.
    userclickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userclickedPattern.length-1);
  });

  //Step 5- Add Animations to User Clicks
  function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
      $("#" + currentColour).removeClass("pressed");
    }, 100);

  }

  // step 8 Reset
  function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }
  