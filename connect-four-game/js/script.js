const players = {
    player1: {
        color: "hsl(347°, 97%, 70%)",
        class: "red",
        value: "player1",
        scoreh1: $("aside.player-1 h1"),
        name: "Player 1",
        turntext: "PLAYER 1’S TURN"
    },
    player2: {
        color: "hsl(41°, 100%, 70%)",
        class: "yellow",
        value: "player2",
        scoreh1: $("aside.player-2 h1"),
        name: "Player 2",
        turntext: "PLAYER 2’S TURN"
    }
}

let activeState = "player1";
let columns = [];
let timer;
let pauseTime = 0;

$(document).ready(function(){

    function addEvents() {
        $("ul").on({

            mouseenter: function() {
                $(this).addClass("marker");
                updateUI(activeState)
            },
    
            mouseleave: function() {
                $(this).removeClass("marker");
                updateUI(activeState)
            },
    
            click: function() {
                if($(this).children().length + 1 > 6) return;
                addCounterTo(this)
                checkIfWin();
                changeTurn();
                updateUI(activeState);
            },

            mousedown: function() {
                setTimer();
            }
        })
    }

    function addCounterTo(ul) {
        let newCounter = $("<li></li>").addClass("counter");
        newCounter.addClass(players[activeState].class);

        let shiftY = 100 * (6 - $(ul).children().length);
        newCounter.css("transform", `translateY(-${shiftY}%)`);
        setTimeout(() => {
            newCounter.css("transform", `translateY(0%)`)
        }, 1);

        $(ul).append(newCounter);

        let indexUl = $(ul).prevAll().length;
        columns[indexUl] = columns[indexUl] ? [...columns[indexUl], players[activeState].value] : columns[indexUl] = [players[activeState].value];
    }
    
    function checkIfWin() {
            for(let i = 0; i < columns.length; i++) {
                if(!columns[i]) continue
                for(let j = 0; j < columns[i].length; j++) {

                    if(columns[i][j] == columns[i][j + 1]
                      && columns[i][j + 1] == columns[i][j + 2]
                      && columns[i][j + 2] == columns[i][j + 3]
                      ) {
                        showWinner(columns[i][j], [
                            { ul: i, li: j },
                            { ul: i, li: j + 1 },
                            { ul: i, li: j + 2 },
                            { ul: i, li: j + 3 },
                        ] )
                        return console.log("someone win in column", columns[i][j]);
                    }
                    
                    if(i == columns.length - 1) {
                        continue
                    }
    
                    if(!(columns[i + 1] && columns[i + 2] && columns[i + 3])) {
                        continue
                    }

                    if(columns[i][j] == columns[i + 1][j]
                        && columns[i + 1][j] == columns[i + 2][j]
                        && columns[i + 2][j] == columns[i + 3][j]
                        ) {
                            showWinner(columns[i][j], [
                                { ul: i, li: j },
                                { ul: i + 1, li: j },
                                { ul: i + 2, li: j },
                                { ul: i + 3, li: j },
                            ])
                            return console.log("someone win in row", columns[i][j]);
                    }
                    
                    if(columns[i][j] == columns[i + 1][j + 1]
                        && columns[i + 1][j + 1] == columns[i + 2][j + 2]
                        && columns[i + 2][j + 2] == columns[i + 3][j + 3]
                        ) {
                            showWinner(columns[i][j], [
                                { ul: i, li: j },
                                { ul: i + 1, li: j + 1 },
                                { ul: i + 2, li: j + 2 },
                                { ul: i + 3, li: j + 3 },
                            ] )
                            return console.log("someone win ascending", columns[i][j]);
                    }

                    if(columns[i][j] == columns[i + 1][j - 1]
                        && columns[i + 1][j - 1] == columns[i + 2][j - 2]
                        && columns[i + 2][j - 2] == columns[i + 3][j - 3]
                        ) {
                            showWinner(columns[i][j], [
                                { ul: i, li: j },
                                { ul: i + 1, li: j - 1 },
                                { ul: i + 2, li: j - 2 },
                                { ul: i + 3, li: j - 3 },
                            ] )
                            return console.log("someone win descending", columns[i][j]);
                    }
                }
            }
        return console.log("nobody win yet")
    }

    function showWinner(player, countersIndexes) {
        if(countersIndexes) {
            for(let counterIndexes of countersIndexes) {
                let ul = $(".game-box").children()[counterIndexes.ul];
                let li = $(ul).children()[counterIndexes.li];
                $(li).addClass("win");
            }
        }
        updateScore(player);
        removeEvents();
        $(".turn").hide("fast");
        $(".wins h4").text(players[player].name)
        $(".wins").show("fast");
    }

    function changeTurn() {
        activeState =  activeState == "player1" ? "player2" : "player1";
    }

    function updateUI(player) {
        if(player == "player1") {
            $(".turn").css("background", "url(../assets/images/turn-background-red.svg)");
            $(".turn h4").text(players[player].turntext)
            $(".marker").removeClass('yellow');
            $(".marker").addClass('red');

        } else if(player == "player2") {
            $(".turn").css("background", "url(../assets/images/turn-background-yellow.svg)");
            $(".turn h4").text(players[player].turntext)
            $(".marker").removeClass('red');
            $(".marker").addClass('yellow');
        }
    }

    function updateScore(value) {
        for(let player in players) {
            switch(value) {

                case "restart": 
                    players[player].scoreh1.text(0);
                    break;

                case "playAgain":
                    break;

                default: 
                    if(players[player].value == value) {
                        let score = Number(players[player].scoreh1.text());
                        score++;
                        players[player].scoreh1.text(score);
                    }
                    break;
            }
        }
    }

    $(".restartBtn").click(function() {
        $(".game-box").find("li").remove();
        columns = [];
        updateScore("restart");
        $(".wins").hide("fast");
        $(".turn").show("fast");
        addEvents();
        pauseTime = 0;
        setTimer();
        $("#menu").addClass("hidden")
    })

    $("#playAgain").click(function() {
        $(".game-box").find("li").remove();
        columns = [];
        updateScore("playAgain");
        $(".wins").hide("fast");
        $(".turn").show("fast");
        addEvents();
        setTimer();
    })

    function removeEvents() {
        $(".game-box ul").off().removeClass("marker");
    }

    function setTimer() {
        if(timer) {
            clearInterval(timer);
        }
        let time = 30;
        if(pauseTime) {
            time = pauseTime
        }
        $(".turn h1").text(`${time}s`);
        timer = setInterval(() =>{
            time--
            if(!time) {
                changeTurn();
                showWinner(activeState);
            }
            $(".turn h1").text(`${time}s`);
        }, 1000);
    };

    $("#menuBtn").click(function() {
        pauseGame();
        $("#menu").removeClass("hidden");
    })

    function pauseGame() {
        pauseTime = parseInt($(".turn h1").text());
        clearInterval(timer);
    }

    $(".continueBtn").click(function() {
            setTimer();
            $("#menu").addClass("hidden");
        }
    )

    setTimer()
    updateUI(activeState)
    $(".wins").hide();
    addEvents();
});