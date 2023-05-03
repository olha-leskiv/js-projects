$(document).ready(function(){
    let activePlayer = "player2";
    let columns = [
        [true, false, false, true],
        [true, false, true, true],
        [false, false, true],
        [true, true, false, true],
        [true, true, false, false, true],
        [false, false, true, false],
        [true, true, false, true],
    ];

    function checkIfWin() {
        let result = "nobody win"
        let winCounter = {
            v: 0,
            h: {
                0: 0,
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
            }
        }

            for(let i = 0; i < columns.length - 1; i++) {
                for(let j = 0; j < columns[i].length; j++) {

                    columns[i][j] == columns[i][j + 1] ? winCounter.v++ : winCounter.v = 0;
                    if(winCounter.v == 3) return console.log("someone win");

                    columns[i][j] == columns[i + 1][j] ? winCounter.h[j]++ : winCounter.h[j] = 0;
                    if(winCounter.h[j] == 3) return console.log("someone win");
                }

            }
        return console.log(result)
    }

    function getLongestColumnLength() {
        let max = columns[0].length;
        for(let i = 0; i < columns.length; i++) {
            let length = columns[i].length;
            if(length > max) {
                max = length
            }
        }
        return console.log(max)
    }

const playersData = {
    player1: {
        color: "hsl(347°, 97%, 70%)",
        class: "red",
    },
    player2: {
        color: "hsl(41°, 100%, 70%)",
        class: "yellow",
    }
}

    function updateUI(player) {
        if(player == "player1") {
            $(".turn").css("background", "url(../assets/images/turn-background-red.svg)");
            $(".marker").addClass('red');

        } else if(player == "player2") {
            $(".turn").css("background", "url(../assets/images/turn-background-yellow.svg)");
            $(".marker").addClass('yellow');
        }
    }

    $("ul").on({
        mouseenter: function() {
            $(this).addClass("marker");
            updateUI(activePlayer)
        },
        mouseleave: function() {
            $(this).removeClass("marker");
            updateUI(activePlayer)
        },
        click: function() {
            if($(this).children().length + 1 > 6) return;
            let newCounter = $("<li></li>").addClass("counter").addClass(playersData[activePlayer].class);
            let n = 7 - $(this).children.length;
            newCounter.css("transform", `translateY(-${100 * n}%)`);
            setTimeout(() => {
                newCounter.css("transform", `translateY(0%)`)
            }, 1);
            $(this).append(newCounter);
        }
    })

    updateUI(activePlayer)
    checkIfWin()
});