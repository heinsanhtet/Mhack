var numLonely = { countLonely: -1 }; //# times click "lonely"

var numLonelyCompleted = { pointsLonely: -1 }; // # times click "completed" in lonely-challenge
var numHappy = { countHappy: -1 }; //# times click "happy"

var numHappyCompleted = { pointsHappy: -1 }; // # times click "completed" in happy-challenge

var gratitude = [ ];
$("#happyChallenges").click(function(e) {
  gratitude.push(
    $("#firstGratitude").val());
  gratitude.push(
    $("#secondGratitude").val());
  gratitude.push(
    $("#thirdGratitude").val());
  $("#firstGratitude").val("");
  $("#secondGratitude").val("");
  $("#thirdGratitude").val("");
});
var lonelyChallenges = [

  "Sit with someone new today when you eat",
  "Reach out to a new friend and plan a time to eat or hang out",
  "Go to MHacks!",
  "Check in with highschool friends",
  "Find a club you like and keep going!"

  ];
 var i = 0;
 var rightLChallenge = null;
 $("a.btn").click(function(e) {
   for (i = 0; i < gratitude.length; i++) {
    if (gratitude.length != 0) {
      var switchToEncourage = gratitude.pop();
      if (switchToEncourage != "") {
      lonelyChallenges.push(switchToEncourage);
      }
    }
   }
   console.log (lonelyChallenges);
 rightLChallenge = lonelyChallenges[Math.floor(Math.random() * lonelyChallenges.length)];
 });
// current messing with
// var randomLonely =
//    lonelyChallenges= [Math.floor(Math.random()*lonelyChallenges.length)];


// count numLonely and toggle to lonely-challenge
$(function() {
  incrementLonelyCount();
});

$("#lonely").click(function(e) {
  incrementLonelyCount();

  $("#lonely-challenge").toggle();
});

function incrementLonelyCount() {
  numLonely.countLonely++;
  $("#target-lonely-challege").html(rightLChallenge);
  $("#numLonely").text(numLonely.countLonely);
}

  // count numLonelyCompleted and toggle back to home
  $(function() {
  incrementLonelyPoints();
});

$("#lonelyChallenges").click(function(e) {
  incrementLonelyPoints();

  $("#lonely").click();
});

function incrementLonelyPoints() {
  numLonelyCompleted.pointsLonely++;
  $("#numLonelyCompleted").text(numLonelyCompleted.pointsLonely);
}

  // count numHappy and toggle to happy-challenge
  $(function() {
  incrementHappyCount();
});

$("#happy").click(function(e) {
  incrementHappyCount();

  $("#happy-challenge").toggle();
});

function incrementHappyCount() {
  numHappy.countHappy++;
  $("#numHappy").text(numHappy.countHappy);
}


  // count numHappyCompleted and go home
  $(function() {
  incrementHappyPoints();
});

$("#happyChallenges").click(function(e) {
  incrementHappyPoints();

  $("#happy").click();
});

function incrementHappyPoints() {
  numHappyCompleted.pointsHappy++;
  $("#numHappyCompleted").text(numHappyCompleted.pointsHappy);
}
