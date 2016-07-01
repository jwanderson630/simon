var game = {};
var hardMode = 1;
var buttons = {
  "colors": ["blue", "red", "yellow", "green"],
  "sounds": {
    "blue": $("#blue-sound")[0],
    "red": $("#red-sound")[0],
    "yellow": $("#yellow-sound")[0],
    "green": $("#green-sound")[0]
  },
  "priColors": {
    "blue": "#87A2B2",
    "red": "#FFC0C0",
    "yellow": "#FFFFC1",
    "green": "#A2BFA8"
  },
  "secColors": {
    "blue": "#5396B2",
    "red": "#FF6E69",
    "yellow": "#FFFC76",
    "green": "#62BF77"
  }
};

var setGame = function() {
  game = {
    "sequence": [],
    "userTurn": true,
    "gameStarted": false,
    "seqCount": 0
  };
};

$("path").click(function() {
  var btnId = $(this).attr("id");
  if (game.userTurn === true && game.gameStarted === true) {
    btnAnimate(btnId, 750);
    if (btnId === game.sequence[game.seqCount] && game.seqCount < game.sequence.length - 1) {
      game.seqCount += 1;
    }else if (btnId === game.sequence[game.seqCount] && game.seqCount === game.sequence.length - 1 && game.sequence.length === 20) {
      $("#winModal").modal("show");
    } else if (btnId === game.sequence[game.seqCount] && game.seqCount === game.sequence.length - 1) {
      game.userTurn = false;
      game.seqCount = 0;
      setTimeout(function() {
        newColor();
        playSequence();
      }, 250);
    } else if (btnId !== game.sequence[game.seqCount] && hardMode === 1) {
      game.userTurn = false;
      scoreAnimate();
      setTimeout(function(){playSequence();}, 2000);
    } else if (btnId !== game.sequence[game.seqCount] && hardMode === -1) {
      scoreAnimate();
      setTimeout(function(){
        setGame();
        game.gameStarted = true;
        game.userTurn = false;
        setScore();
        newColor();},3000);
      setTimeout(function(){playSequence();}, 4000);
    } else if (game.userTurn === true && game.gameStarted === false) {
      btnAnimate($(this).attr("id"), 750);
    }
  }
});

var setScore = function() {
  var score = 0;
  if (game.sequence.length < 10) {
    score = "0" + game.sequence.length;
  } else {
    score = game.sequence.length;
  }
  $("#score").html(score);
};

var scoreAnimate = function() {
  $("#score").css("color", "#FF6E69");
  setTimeout(function() {
    $("#score").css("color", "#3B403D");
  }, 500);
  setTimeout(function() {
    $("#score").css("color", "#FF6E69");
  }, 1000);
  setTimeout(function() {
    $("#score").css("color", "#3B403D");
  }, 1500);
};

var btnAnimate = function(col, time) {
  var colId = "#" + col;
  buttons.sounds[col].play();
  $(colId).attr("fill", buttons.secColors[col]);
  setTimeout(function() {
    $(colId).attr("fill", buttons.priColors[col]);
  }, time);
};

var newColor = function() {
  var colorPick = Math.floor((Math.random() * 4) + 1);
  switch (colorPick) {
    case 1:
      game.sequence.push("blue");
      break;
    case 2:
      game.sequence.push("red");
      break;
    case 3:
      game.sequence.push("green");
      break;
    case 4:
      game.sequence.push("yellow");
      break;
  }
};
var playSequence = function() {
  var index = 0;
  var runSequence = setInterval(function() {
    btnAnimate(game.sequence[index], 1000);
    index += 1;
    if (index === game.sequence.length) {
      clearInterval(runSequence);
      game.userTurn = true;
    }
  }, 1300);
  setScore();
};
setGame();

$("#start").click(function() {
  if (game.gameStarted === false){
    game.gameStarted = true;
    game.userTurn = false;
    newColor();
    playSequence();
  };
});

$("#reset").click(function() {
  setGame();
  setScore();
});

$("#hard").click(function() {
    $("#hard").toggleClass("hard");
    hardMode = hardMode * (-1);
});

$("#continue").click(function(){
  game.seqCount = 0;
      setTimeout(function() {
        newColor();
        playSequence();
      }, 250);
});

$("#restart").click(function(){
  setTimeout(function(){
        setGame();
        game.gameStarted = true;
        game.userTurn = false;
        setScore();
        newColor();},500);
      setTimeout(function(){playSequence();}, 2000);
});