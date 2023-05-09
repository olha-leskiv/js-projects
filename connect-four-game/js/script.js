let mode = "player-vs-player";
let players;

if(localStorage.getItem("mode")) {
    mode = localStorage.getItem("mode");
}

function setMode(type) {
    localStorage.setItem("mode", type);
}

switch(mode) {
    case "player-vs-player":
        players = {
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
                turntext: "PLAYER 2’S TURN",
                icon: "../assets/images/player-two.svg"
            }
        };
    break;

    case "player-vs-cpu":
        players = {
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
                name: "CPU",
                turntext: "CPU’S TURN",
                icon: "../assets/images/cpu.svg"
            }
        };
    break;
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
                changeTurn();
                checkIfWin();
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
                    }
                }
            }
    }

    function showWinner(player, countersIndexes) {
        if(mode == "player-vs-cpu") {
            clearTimeout(CPUTurn);
            CPUTurn = null;
        }
        clearInterval(timer);
        timer = null;
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
        changeAvtiveState();

        if(mode == "player-vs-cpu") {
            CPUTurn = setTimeout(addCPUCounter, 1500);
            setTimer();
            removeEvents();
        }
    }

    function updateUI(player) {
        if(player == "player1") {
            $(".turn").css({
                "background": "url(../assets/images/turn-background-red.svg)",
                "color": "white"
            });
            $(".turn h4").text(players[player].turntext)
            $(".marker").removeClass('yellow');
            $(".marker").addClass('red');

        } else if(player == "player2") {
            $(".turn").css({
                "background": "url(../assets/images/turn-background-yellow.svg)",
                "color": "black"
            });
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
        $("#menu").addClass("hidden");
    })

    $("#playAgain").click(function() {
        $(".game-box").find("li").remove();
        columns = [];
        updateScore("playAgain");
        $(".wins").hide("fast");
        $(".turn").show("fast");
        if(mode == "player-vs-cpu" && activeState == "player2") {
            addCPUCounter();
        } else {
            addEvents();
        }
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

    $("#playWithCPU").click(function() {
        mode = "player-vs-cpu";
    })

    $("#playWithPlayer").click(function() {
        mode = "player-vs-cpu";
    })

    function addCPUCounter() {
        let randomUl
        do {
        randomUl = $(".game-box").children()[Math.floor(Math.random() * 7)];
        }
        while($(randomUl).children().length + 1 > 6)
        addCounterTo(randomUl)
        checkIfWin();
        changeAvtiveState();
        addEvents();
        setTimer();
        clearTimeout(CPUTurn);
        CPUTurn = null;
    }

    function changeAvtiveState() {
        activeState =  activeState == "player1" ? "player2" : "player1";
        updateUI(activeState);
    }

    $(".player-2 img").attr("src", players.player2.icon);
    $(".player-2 h3").text(players.player2.name);
    setTimer()
    updateUI(activeState)
    $(".wins").hide();
    addEvents();
});