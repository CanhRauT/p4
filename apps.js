$(function () {
    var squares = [],
        SIZE = 3,
        EMPTY = "&nbsp;",
        score,
        moves,
        turn = "X",
        xWins = 0,
        oWins = 0,
        wins = [7, 56, 448, 73, 146, 292, 273, 84];

    function updateWinCountDisplay() {
        $("#xWins").text(xWins);
        $("#oWins").text(oWins);
    }

    /*
     * Clears the score and move count, erases the board, and makes it
     * X's turn.
     */
    function startNewGame() {
        turn = "X";
        score = { "X": 0, "O": 0 };
        moves = 0;
        squares.forEach(function (square) { square.html(EMPTY); });
        updateWinCountDisplay();
    }

    /*
     * Returns whether the given score is a winning score.
     */
    function win(score) {
        for (var i = 0; i < wins.length; i += 1) {
            if ((wins[i] & score) === wins[i]) {
                return true;
            }
        }
        return false;
    }

    /*
     * Sets the clicked-on square to the current player's mark,
     * then checks for a win or cats game.  Also changes the
     * current player.
     */
    function set() {
        if ($(this).html() !== EMPTY) {
            return;
        }

        var markSize = Math.min($(this).width(), $(this).height()) * 0.8; // Adjust the multiplier as needed
        if (turn === "X") {
            $(this).html('<span class="x-mark" style="font-size:' + markSize + 'px;">X</span>');
        } else {
            $(this).html('<span class="o-mark" style="font-size:' + markSize + 'px;">O</span>');
        }

        moves += 1;
        score[turn] += $(this)[0].indicator;

        if (win(score[turn])) {
            if (turn === "X") {
                xWins++;
            } else {
                oWins++;
            }
            alert(turn + " wins!\nX Wins: " + xWins + "\nO Wins: " + oWins);
            startNewGame();
        } else if (moves === SIZE * SIZE) {
            alert("Cat's game!\nX Wins: " + xWins + "\nO Wins: " + oWins);
            startNewGame();
        } else {
            turn = turn === "X" ? "O" : "X";
        }

        updateWinCountDisplay();
    }

    /*
     * Creates and attaches the DOM elements for the board as an
     * HTML table, assigns the indicators for each cell, and starts
     * a new game.
     */
    function play() {
        var board = $("<table border=1 cellspacing=0>"), indicator = 1;
        for (var i = 0; i < SIZE; i += 1) {
            var row = $("<tr>");
            board.append(row);
            for (var j = 0; j < SIZE; j += 1) {
                var cell = $("<td height=50 width=50 align=center valign=center></td>");
                cell[0].indicator = indicator;
                cell.click(set);
                row.append(cell);
                squares.push(cell);
                indicator += indicator;
            }
        }

        // Attach under tictactoe if present, otherwise to body.
        $(document.getElementById("tictactoe") || document.body).append(board);
        startNewGame();
    }

    play();
});
