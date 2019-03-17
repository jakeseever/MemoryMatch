window.onload = initPage;

var memoryArray = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L'];
var memoryValues = [];
var memoryTiles = [];
var tilesFlipped = 0;
var startingTime = 60;
var memoryBoard = document.getElementById("memoryBoard");
var time = document.getElementById("time");
var startButton = document.getElementById("newGame");
message = document.getElementById("message");
startButton.onclick = newGame;
var timer;

function initPage() {
    // Shuffle the tile values
    Array.prototype.memoryTileShuffle = function () {
        var i = this.length,
            j, temp;
        while (--i > 0) {
            j = Math.floor(Math.random() * (i + 1));
            temp = this[j];
            this[j] = this[i];
            this[i] = temp;
        }
    }
    newBoard();
    // Make the board unclickable until the new game button is clicked.
    memoryBoard.classList.add("unclickable");
}

function newBoard() {
    tilesFlipped = 0;
    var output = '';
    memoryArray.memoryTileShuffle();
    for (var i = 0; i < memoryArray.length; i++) {
        output += '<div id="tile_' + i + '" onclick="FlipTile(this,\'' + memoryArray[i] + '\')"></div>';
    }
    time.innerHTML = "Click new game to start";
    memoryBoard.innerHTML = output;
}

function FlipTile(tile, val) {
    if (tile.innerHTML == "" && memoryValues.length < 2) {
        tile.style.background = '#FFFFFF';
        tile.innerHTML = val;
        if (memoryValues.length == 0) {
            memoryValues.push(val);
            memoryTiles.push(tile.id);
        } else if (memoryValues.length == 1) {
            memoryValues.push(val);
            memoryTiles.push(tile.id);
            if (memoryValues[0] == memoryValues[1]) {
                tilesFlipped += 2;
                // Clear both arrays
                memoryValues = [];
                memoryTiles = [];
                //Check to see if the board is cleared
                if (tilesFlipped == memoryArray.length) {
                    getWinMessage();
                    clearInterval(timer);
                }
            } else {
                function flipBack() {
                    // Flip the 2 tiles back over
                    var tile_1 = document.getElementById(memoryTiles[0]);
                    var tile_2 = document.getElementById(memoryTiles[1]);
                    tile_1.style = 'url(../images/memoryCard.jpg) no repeat';
                    tile_1.innerHTML = "";
                    tile_2.style = 'url(../images/memoryCard.jpg) no repeat';
                    tile_2.innerHTML = "";
                    // Clear both arrays
                    memoryValues = [];
                    memoryTiles = [];
                }
                setTimeout(flipBack, 500);
            }
        }
    }
}

function countDown(i) {
    call = function () {};
    time.innerHTML = "";
    timer = setInterval(function () {
        if (i != 0) {
            time.innerHTML = "Time Remaining:  " + i;
            i-- /*|| (clearInterval(int), call())*/ ;
        } else {
            time.innerHTML = "&nbsp &nbsp Game Over";
            clearInterval(timer);
            getLossMessage();
            memoryBoard.classList.add("unclickable");
        }
    }, 1000);
}

function newGame(i) {
    memoryBoard.classList.remove("unclickable");
    clearInterval(timer);
    time.innerHTML = "";
    newBoard();
    countDown(startingTime);
    message.innerHTML = "";
}

function createRequest() {
    try {
        request = new XMLHttpRequest();
    } catch (tryMS) {
        try {
            request = new ActiceXObject("Msxml2.XMLHTTP");
        } catch (otherMS) {
            try {
                request = new ActiveXObject("Microsoft.XMLHTTP")
            } catch (failed) {
                request = null;
            }
        }
    }
    return request;
}

function getWinMessage() {
    request = createRequest();
    if (request === null) {
        alert("unable to create request");
        return;
    }
    var url = "win.php?";
    request.open("GET", url, true);
    //request.onreadystatechange = displayMessage;
    request.send(null);
}

function getLossMessage() {
    request = createRequest();
    if (request === null) {
        alert("unable to create request");
        return;
    }
    var url = "lose.php?";
    request.open("GET", url, true);
    //request.onreadystatechange = displayMessage;
    request.send(null);
}

function displayMessage() {
    if (request.readyState === 4) {
        if (request.status === 200) {
            message.innerHTML = request.responseText;
            message.classList.add("message");
        }
    }
}
