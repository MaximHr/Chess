// 8 hours and 30mins
// 1:05

// todo:
// малко рокадо
// голяма рокадо
// pawn becomes queen
// responsive design
// шах detection
// checkmate detection
// шах detection преди да си мръднал
// gameover  (time or checkmate)

const grid = [];
let turn = 1; // ако turn e 1, белите са наред, ако turn e -1, черните са наред
let num = 0;

let clock1, clock2;

function  checkSqaureValue(i, j) {
    // проверява каква е стойността на квадрата и слага фигурата
    //0 = empty
    //1 = white pawn        -1 = black pawn
    //2 = white bishop      -2 = black bishop
    //3 = white knight      -3 = black knight
    //4 = white rook        -4 = black rook
    //5 = white queen       -5 = black queen
    //6 = white king        -6 = black king
    
    
    if(grid[i][j] === 1) { //white pawn
        $(`[x=${i}][y=${j}]`)[0].innerHTML = 
        '<img src="./images/pawnWhite.png"></img>';
    }
    if(grid[i][j] === 2) { //white bishop
        $(`[x=${i}][y=${j}]`)[0].innerHTML = 
        '<img src="./images/bishopWhite.png"></img>';
    }
    if(grid[i][j] === 3) { //white knight
        $(`[x=${i}][y=${j}]`)[0].innerHTML = 
        '<img src="./images/knightWhite.png"></img>';
    }
    if(grid[i][j] === 4) { //white rook
        $(`[x=${i}][y=${j}]`)[0].innerHTML = 
        '<img src="./images/rookWhite.png"></img>';
    }
    if(grid[i][j] === 5) { //white queen
        $(`[x=${i}][y=${j}]`)[0].innerHTML = 
        '<img src="./images/queenWhite.png"></img>';
    }
    if(grid[i][j] === 6) { //white king
        $(`[x=${i}][y=${j}]`)[0].innerHTML = 
        '<img src="./images/kingWhite.png"></img>';
    }

    if(grid[i][j] === -1) { //black pawn
        $(`[x=${i}][y=${j}]`)[0].innerHTML = 
        '<img src="./images/pawnBlack.png"></img>';
    }
    if(grid[i][j] === -2) { //black bishop
        $(`[x=${i}][y=${j}]`)[0].innerHTML = 
        '<img src="./images/bishopBlack.png"></img>';
    }
    if(grid[i][j] === -3) { //black knight
        $(`[x=${i}][y=${j}]`)[0].innerHTML = 
        '<img src="./images/knightBlack2.png"></img>';
    }
    if(grid[i][j] === -4) { //black rook
        $(`[x=${i}][y=${j}]`)[0].innerHTML = 
        '<img src="./images/rookBlack.png"></img>';
    }
    if(grid[i][j] === -5) { //black queen
        $(`[x=${i}][y=${j}]`)[0].innerHTML = 
        '<img src="./images/queenBlack.png"></img>';
    }
    if(grid[i][j] === -6) { //black king
        $(`[x=${i}][y=${j}]`)[0].innerHTML = 
        '<img src="./images/kingBlack.png"></img>';
    }
    
    if(grid[i][j] === 0) { //white pawn
        $(`[x=${i}][y=${j}]`)[0].innerHTML = '';
    }
}


//правя поле с 64 квадрата
for(let i = 0;i < 8;i++) {
    grid[i] = [];
    for(let j = 0;j < 8;j++){ 
        grid[i][j] = 0;
        
        // слагам 64-те квадрата на полете и ги рисувам черно бели
        const square = document.createElement('div');
        square.setAttribute('class', 'square black'); 
        if(j % 2 === 0 && i % 2 === 0) {
            square.setAttribute('class', 'square white');
        }
        if(j % 2 === 1 && i % 2 === 1) {
            square.setAttribute('class', 'square white');
        }
        square.setAttribute('x', j); 
        square.setAttribute('y', i); 
        document.querySelector('.grid').appendChild(square);

    }
}

function setBoard(){ 
    for(let i = 0;i < grid.length;i++) {
        grid[i][6] = 1;
    }
    grid[0][7] = 4;
    grid[7][7] = 4;

    grid[1][7] = 3;
    grid[6][7] = 3;

    grid[2][7] = 2;
    grid[5][7] = 2;

    grid[3][7] = 5;
    grid[4][7] = 6;
    
    for(let i = 0;i < grid.length;i++) {
        grid[i][1] = -1;
    }
    grid[0][0] = -4;
    grid[7][0] = -4;

    grid[1][0] = -3;
    grid[6][0] = -3;

    grid[2][0] = -2;
    grid[5][0] = -2;

    grid[3][0] = -5;
    grid[4][0] = -6;

    for(let i = 0;i < grid.length;i++) {
        for(let j = 0;j < grid.length;j++) {
            checkSqaureValue(i, j);
        }
    }
}

setBoard();

function move(oldX, oldY, newX, newY, piece) {
    const available = [];
    if(piece === 1){ 
        // available moves for the white pawn
        if(oldY > 0 && grid[oldX][oldY - 1] === 0) {
            available.push({x: oldX, y: oldY - 1});
        }
        if(oldY > 0 && oldX < 7 && grid[oldX + 1][oldY - 1] < 0) {
            available.push({x: oldX + 1, y: oldY - 1});
        }
        if(oldX > 0 && oldY > 0 && grid[oldX - 1][oldY - 1] < 0) {
            available.push({x: oldX - 1, y: oldY - 1});
        }
        if(oldY === 6 && grid[oldX][oldY - 1] === 0 && grid[oldX][oldY - 2] === 0) {
            available.push({x: oldX, y: oldY - 2});
        }

    } else if(piece === -1) {
        //available moves for the black pawn
        if(oldY < 7 && grid[oldX][oldY + 1] === 0) {
            available.push({x: oldX, y: oldY + 1});
        }
        if(oldY < 7 && oldX < 7 && grid[oldX + 1][oldY + 1] > 0) {
            available.push({x: oldX + 1, y: oldY + 1});
        }
        if(oldX > 0 && oldY < 7 && grid[oldX - 1][oldY + 1] > 0) {
            available.push({x: oldX - 1, y: oldY + 1});
        }
        if(oldY === 1 && grid[oldX][oldY + 1] === 0 && grid[oldX][oldY + 2] === 0) {
            available.push({x: oldX, y: oldY + 2});
        }
    }else if(piece === 3){
        // available moves for the white knight
        if(oldX > 0 && oldY > 1 && grid[oldX - 1][oldY - 2] <= 0) {
            available.push({x: oldX - 1, y: oldY - 2});
        }
        if(oldX < 7 && oldY > 1 && grid[oldX + 1][oldY - 2] <= 0) {
            available.push({x: oldX + 1, y: oldY - 2});
        }
        if(oldX < 7 && oldY < 6 && grid[oldX + 1][oldY + 2] <= 0) {
            available.push({x: oldX + 1, y: oldY + 2});
        }
        if(oldX > 0 && oldY < 6 && grid[oldX - 1][oldY + 2] <= 0) {
            available.push({x: oldX - 1, y: oldY + 2});
        }
        if(oldX > 1 && oldY > 0 && grid[oldX - 2][oldY - 1] <= 0) {
            available.push({x: oldX - 2, y: oldY - 1});
        }
        if(oldX < 6 && oldY > 0 && grid[oldX + 2][oldY - 1] <= 0) {
            available.push({x: oldX + 2, y: oldY - 1});
        }
        if(oldX > 1 && oldY < 7 && grid[oldX - 2][oldY + 1] <= 0) {
            available.push({x: oldX - 2, y: oldY + 1});
        }
        if(oldX < 6 && oldY < 7 && grid[oldX + 2][oldY + 1] <= 0) {
            available.push({x: oldX + 2, y: oldY + 1});
        }

    } else if(piece === -3) {
        // available moves for black knight
        if(oldX > 0 && oldY > 1 && grid[oldX - 1][oldY - 2] >= 0) {
            available.push({x: oldX - 1, y: oldY - 2});
        }
        if(oldX < 7 && oldY > 1 && grid[oldX + 1][oldY - 2] >= 0) {
            available.push({x: oldX + 1, y: oldY - 2});
        }
        if(oldX < 7 && oldY < 6 && grid[oldX + 1][oldY + 2] >= 0) {
            available.push({x: oldX + 1, y: oldY + 2});
        }
        if(oldX > 0 && oldY < 6 && grid[oldX - 1][oldY + 2] >= 0) {
            available.push({x: oldX - 1, y: oldY + 2});
        }
        if(oldX > 1 && oldY > 0 && grid[oldX - 2][oldY - 1] >= 0) {
            available.push({x: oldX - 2, y: oldY - 1});
        }
        if(oldX < 6 && oldY > 0 && grid[oldX + 2][oldY - 1] >= 0) {
            available.push({x: oldX + 2, y: oldY - 1});
        }
        if(oldX > 1 && oldY < 7 && grid[oldX - 2][oldY + 1] >= 0) {
            available.push({x: oldX - 2, y: oldY + 1});
        }
        if(oldX < 6 && oldY < 7 && grid[oldX + 2][oldY + 1] >= 0) {
            available.push({x: oldX + 2, y: oldY + 1});
        }

    } else if(piece === 6) {
        // available moves for the white king
        if(oldX < 7 && grid[oldX + 1][oldY] <= 0) {
            available.push({x: oldX + 1, y: oldY});
        }
        if(oldX > 0 && grid[oldX - 1][oldY] <= 0) {
            available.push({x: oldX - 1, y: oldY});
        }
        if(oldY < 7 && grid[oldX][oldY + 1] <= 0) {
            available.push({x: oldX, y: oldY + 1});
        }
        if(oldY > 0 && grid[oldX][oldY - 1] <= 0) {
            available.push({x: oldX, y: oldY - 1});
        }
        if(oldX < 7 && oldY < 7 && grid[oldX + 1][oldY + 1] <= 0) {
            available.push({x: oldX + 1, y: oldY + 1});
        }
        if(oldX < 7 && oldY > 0 && grid[oldX + 1][oldY - 1] <= 0) {
            available.push({x: oldX + 1, y: oldY - 1});
        }
        if(oldX > 0 && oldY > 0 && grid[oldX - 1][oldY - 1] <= 0) {
            available.push({x: oldX - 1, y: oldY - 1});
        }
        if(oldX > 0 && oldY < 7 && grid[oldX - 1][oldY + 1] <= 0) {
            available.push({x: oldX - 1, y: oldY + 1});
        }
    } else if(piece === -6) {
        // available moves for the black king
        if(oldX < 7 && grid[oldX + 1][oldY] >= 0) {
            available.push({x: oldX + 1, y: oldY});
        }
        if(oldX > 0 && grid[oldX - 1][oldY] >= 0) {
            available.push({x: oldX - 1, y: oldY});
        }
        if(oldY < 7 && grid[oldX][oldY + 1] >= 0) {
            available.push({x: oldX, y: oldY + 1});
        }
        if(oldY > 0 && grid[oldX][oldY - 1] >= 0) {
            available.push({x: oldX, y: oldY - 1});
        }
        if(oldX < 7 && oldY < 7 && grid[oldX + 1][oldY + 1] >= 0) {
            available.push({x: oldX + 1, y: oldY + 1});
        }
        if(oldX < 7 && oldY > 0 && grid[oldX + 1][oldY - 1] >= 0) {
            available.push({x: oldX + 1, y: oldY - 1});
        }
        if(oldX > 0 && oldY > 0 && grid[oldX - 1][oldY - 1] >= 0) {
            available.push({x: oldX - 1, y: oldY - 1});
        }
        if(oldX > 0 && oldY < 7 && grid[oldX - 1][oldY + 1] >= 0) {
            available.push({x: oldX - 1, y: oldY + 1});
        }

    }else if(piece === 2) {
        // available moves for the white bishop
        let canRU = true; // right up
        let movesRU = 1;
        while(canRU == true) {
            if(oldX < (8 - movesRU) && oldY >= 0 + movesRU && grid[oldX + movesRU][oldY - movesRU] === 0) {
                available.push({x: oldX + movesRU, y: oldY - movesRU});
                movesRU++;
            } else if(oldX < (8 - movesRU) && oldY >= 0 + movesRU && grid[oldX + movesRU][oldY - movesRU] < 0){
                available.push({x: oldX + movesRU, y: oldY - movesRU});
                canRU = false;
            } else {
                canRU = false;
            }
        }

        let canLD = true; // left down
        let movesLD = 1;
        while(canLD == true) {
            if(oldX >= (0 + movesLD) && oldY <= 7 - movesLD && grid[oldX - movesLD][oldY + movesLD] === 0) {
                available.push({x: oldX - movesLD, y: oldY + movesLD});
                movesLD++;
            } else if(oldX >= (0 + movesLD) && oldY <= 7 - movesLD && grid[oldX - movesLD][oldY + movesLD] < 0){
                available.push({x: oldX - movesLD, y: oldY + movesLD});
                canLD = false;
            } else {
                canLD = false;
            }
        }
        
        let canLU = true; // left up
        let movesLU = 1;
        while(canLU == true) {
            if(oldX >= (0 + movesLU) && oldY >= 0 + movesLU && grid[oldX - movesLU][oldY - movesLU] === 0) {
                available.push({x: oldX - movesLU, y: oldY - movesLU});
                movesLU++;
            } else if(oldX >= (0 + movesLU) && oldY >= 0 + movesLU && grid[oldX - movesLU][oldY - movesLU] < 0){
                available.push({x: oldX - movesLU, y: oldY - movesLU});
                canLU = false;
            } else {
                canLU = false;
            }
        }

        let canRD = true; // right down
        let movesRD = 1;
        while(canRD == true) {
            if(oldX < (8 - movesRD) && oldY <= 7 - movesRD && grid[oldX + movesRD][oldY + movesRD] === 0) {
                available.push({x: oldX + movesRD, y: oldY + movesRD});
                movesRD++;
            } else if(oldX < (8 - movesRD) && oldY <= 7 - movesRD && grid[oldX + movesRD][oldY + movesRD] < 0){
                available.push({x: oldX + movesRD, y: oldY + movesRD});
                canRD = false;
            } else {
                canRD = false;
            }
        }

    } else if(piece === -2) {
        //available moves for the black bishop
        let canRU = true; // right up
        let movesRU = 1;
        while(canRU == true) {
            if(oldX < (8 - movesRU) && oldY >= 0 + movesRU && grid[oldX + movesRU][oldY - movesRU] === 0) {
                available.push({x: oldX + movesRU, y: oldY - movesRU});
                movesRU++;
            } else if(oldX < (8 - movesRU) && oldY >= 0 + movesRU && grid[oldX + movesRU][oldY - movesRU] > 0){
                available.push({x: oldX + movesRU, y: oldY - movesRU});
                canRU = false;
            } else {
                canRU = false;
            }
        }

        let canLD = true; // left down
        let movesLD = 1;
        while(canLD == true) {
            if(oldX >= (0 + movesLD) && oldY <= 7 - movesLD && grid[oldX - movesLD][oldY + movesLD] === 0) {
                available.push({x: oldX - movesLD, y: oldY + movesLD});
                movesLD++;
            } else if(oldX >= (0 + movesLD) && oldY <= 7 - movesLD && grid[oldX - movesLD][oldY + movesLD] > 0){
                available.push({x: oldX - movesLD, y: oldY + movesLD});
                canLD = false;
            } else {
                canLD = false;
            }
        }
        
        let canLU = true; // left up
        let movesLU = 1;
        while(canLU == true) {
            if(oldX >= (0 + movesLU) && oldY >= 0 + movesLU && grid[oldX - movesLU][oldY - movesLU] === 0) {
                available.push({x: oldX - movesLU, y: oldY - movesLU});
                movesLU++;
            } else if(oldX >= (0 + movesLU) && oldY >= 0 + movesLU && grid[oldX - movesLU][oldY - movesLU] > 0){
                available.push({x: oldX - movesLU, y: oldY - movesLU});
                canLU = false;
            } else {
                canLU = false;
            }
        }

        let canRD = true; // right down
        let movesRD = 1;
        while(canRD == true) {
            if(oldX < (8 - movesRD) && oldY <= 7 - movesRD && grid[oldX + movesRD][oldY + movesRD] === 0) {
                available.push({x: oldX + movesRD, y: oldY + movesRD});
                movesRD++;
            } else if(oldX < (8 - movesRD) && oldY <= 7 - movesRD && grid[oldX + movesRD][oldY + movesRD] > 0){
                available.push({x: oldX + movesRD, y: oldY + movesRD});
                canRD = false;
            } else {
                canRD = false;
            }
        }
    }else if(piece === 4){
        //available moves for the white rook
        let canRU = true; // right 
        let movesRU = 1;
        while(canRU == true) {
            if(oldX < (8 - movesRU) && grid[oldX + movesRU][oldY] === 0) {
                available.push({x: oldX + movesRU, y: oldY});
                movesRU++;
            } else if(oldX < (8 - movesRU) && grid[oldX + movesRU][oldY] < 0){
                available.push({x: oldX + movesRU, y: oldY});
                canRU = false;
            } else {
                canRU = false;
            }
        }

        let canLD = true; // left 
        let movesLD = 1;
        while(canLD == true) {
            if(oldX >= (0 + movesLD) && grid[oldX - movesLD][oldY] === 0) {
                available.push({x: oldX - movesLD, y: oldY});
                movesLD++;
            } else if(oldX >= (0 + movesLD) && grid[oldX - movesLD][oldY] < 0){
                available.push({x: oldX - movesLD, y: oldY});
                canLD = false;
            } else {
                canLD = false;
            }
        }
        
        let canLU = true; // up
        let movesLU = 1;
        while(canLU == true) {
            if(oldY >= 0 + movesLU && grid[oldX][oldY - movesLU] === 0) {
                available.push({x: oldX, y: oldY - movesLU});
                movesLU++;
            } else if(oldY >= 0 + movesLU && grid[oldX][oldY - movesLU] < 0){
                available.push({x: oldX, y: oldY - movesLU});
                canLU = false;
            } else {
                canLU = false;
            }
        }

        let canRD = true; // down
        let movesRD = 1;
        while(canRD == true) {
            if(oldY <= 7 - movesRD && grid[oldX][oldY + movesRD] === 0) {
                available.push({x: oldX, y: oldY + movesRD});
                movesRD++;
            } else if(oldY <= 7 - movesRD && grid[oldX][oldY + movesRD] < 0){
                available.push({x: oldX, y: oldY + movesRD});
                canRD = false;
            } else {
                canRD = false;
            }
        }

    } else if(piece === -4) {
        //available moves for the black rook
        let canRU = true; // right 
        let movesRU = 1;
        while(canRU == true) {
            if(oldX < (8 - movesRU) && grid[oldX + movesRU][oldY] === 0) {
                available.push({x: oldX + movesRU, y: oldY});
                movesRU++;
            } else if(oldX < (8 - movesRU) && grid[oldX + movesRU][oldY] > 0){
                available.push({x: oldX + movesRU, y: oldY});
                canRU = false;
            } else {
                canRU = false;
            }
        }

        let canLD = true; // left 
        let movesLD = 1;
        while(canLD == true) {
            if(oldX >= (0 + movesLD) && grid[oldX - movesLD][oldY] === 0) {
                available.push({x: oldX - movesLD, y: oldY});
                movesLD++;
            } else if(oldX >= (0 + movesLD) && grid[oldX - movesLD][oldY] > 0){
                available.push({x: oldX - movesLD, y: oldY});
                canLD = false;
            } else {
                canLD = false;
            }
        }
        
        let canLU = true; // up
        let movesLU = 1;
        while(canLU == true) {
            if(oldY >= 0 + movesLU && grid[oldX][oldY - movesLU] === 0) {
                available.push({x: oldX, y: oldY - movesLU});
                movesLU++;
            } else if(oldY >= 0 + movesLU && grid[oldX][oldY - movesLU] > 0){
                available.push({x: oldX, y: oldY - movesLU});
                canLU = false;
            } else {
                canLU = false;
            }
        }

        let canRD = true; // down
        let movesRD = 1;
        while(canRD == true) {
            if(oldY <= 7 - movesRD && grid[oldX][oldY + movesRD] === 0) {
                available.push({x: oldX, y: oldY + movesRD});
                movesRD++;
            } else if(oldY <= 7 - movesRD && grid[oldX][oldY + movesRD] > 0){
                available.push({x: oldX, y: oldY + movesRD});
                canRD = false;
            } else {
                canRD = false;
            }
        }

    }else if(piece === 5) {
        //available moves for queen
        let canRU = true; // right up
        let movesRU = 1;
        while(canRU == true) {
            if(oldX < (8 - movesRU) && oldY >= 0 + movesRU && grid[oldX + movesRU][oldY - movesRU] === 0) {
                available.push({x: oldX + movesRU, y: oldY - movesRU});
                movesRU++;
            } else if(oldX < (8 - movesRU) && oldY >= 0 + movesRU && grid[oldX + movesRU][oldY - movesRU] < 0){
                available.push({x: oldX + movesRU, y: oldY - movesRU});
                canRU = false;
            } else {
                canRU = false;
            }
        }

        let canLD = true; // left down
        let movesLD = 1;
        while(canLD == true) {
            if(oldX >= (0 + movesLD) && oldY <= 7 - movesLD && grid[oldX - movesLD][oldY + movesLD] === 0) {
                available.push({x: oldX - movesLD, y: oldY + movesLD});
                movesLD++;
            } else if(oldX >= (0 + movesLD) && oldY <= 7 - movesLD && grid[oldX - movesLD][oldY + movesLD] < 0){
                available.push({x: oldX - movesLD, y: oldY + movesLD});
                canLD = false;
            } else {
                canLD = false;
            }
        }
        
        let canLU = true; // left up
        let movesLU = 1;
        while(canLU == true) {
            if(oldX >= (0 + movesLU) && oldY >= 0 + movesLU && grid[oldX - movesLU][oldY - movesLU] === 0) {
                available.push({x: oldX - movesLU, y: oldY - movesLU});
                movesLU++;
            } else if(oldX >= (0 + movesLU) && oldY >= 0 + movesLU && grid[oldX - movesLU][oldY - movesLU] < 0){
                available.push({x: oldX - movesLU, y: oldY - movesLU});
                canLU = false;
            } else {
                canLU = false;
            }
        }

        let canRD = true; // right down
        let movesRD = 1;
        while(canRD == true) {
            if(oldX < (8 - movesRD) && oldY <= 7 - movesRD && grid[oldX + movesRD][oldY + movesRD] === 0) {
                available.push({x: oldX + movesRD, y: oldY + movesRD});
                movesRD++;
            } else if(oldX < (8 - movesRD) && oldY <= 7 - movesRD && grid[oldX + movesRD][oldY + movesRD] < 0){
                available.push({x: oldX + movesRD, y: oldY + movesRD});
                canRD = false;
            } else {
                canRD = false;
            }
        }
        let canR = true; // right 
        let movesR = 1;
        while(canR == true) {
            if(oldX < (8 - movesR) && grid[oldX + movesR][oldY] === 0) {
                available.push({x: oldX + movesR, y: oldY});
                movesR++;
            } else if(oldX < (8 - movesR) && grid[oldX + movesR][oldY] < 0){
                available.push({x: oldX + movesR, y: oldY});
                canR = false;
            } else {
                canR = false;
            }
        }

        let canL = true; // left 
        let movesL = 1;
        while(canL == true) {
            if(oldX >= (0 + movesL) && grid[oldX - movesL][oldY] === 0) {
                available.push({x: oldX - movesL, y: oldY});
                movesL++;
            } else if(oldX >= (0 + movesL) && grid[oldX - movesL][oldY] < 0){
                available.push({x: oldX - movesL, y: oldY});
                canL = false;
            } else {
                canL = false;
            }
        }
        
        let canU = true; // up
        let movesU = 1;
        while(canU == true) {
            if(oldY >= 0 + movesU && grid[oldX][oldY - movesU] === 0) {
                available.push({x: oldX, y: oldY - movesU});
                movesU++;
            } else if(oldY >= 0 + movesU && grid[oldX][oldY - movesU] < 0){
                available.push({x: oldX, y: oldY - movesU});
                canU = false;
            } else {
                canU = false;
            }
        }

        let canD = true; // down
        let movesD = 1;
        while(canD == true) {
            if(oldY <= 7 - movesD && grid[oldX][oldY + movesD] === 0) {
                available.push({x: oldX, y: oldY + movesD});
                movesD++;
            } else if(oldY <= 7 - movesD && grid[oldX][oldY + movesD] < 0){
                available.push({x: oldX, y: oldY + movesD});
                canD = false;
            } else {
                canD = false;
            }
        } 
    }  else if(piece === -5) {
        //available moves for the black queen
        let canRU = true; // right up
        let movesRU = 1;
        while(canRU == true) {
            if(oldX < (8 - movesRU) && oldY >= 0 + movesRU && grid[oldX + movesRU][oldY - movesRU] === 0) {
                available.push({x: oldX + movesRU, y: oldY - movesRU});
                movesRU++;
            } else if(oldX < (8 - movesRU) && oldY >= 0 + movesRU && grid[oldX + movesRU][oldY - movesRU] > 0){
                available.push({x: oldX + movesRU, y: oldY - movesRU});
                canRU = false;
            } else {
                canRU = false;
            }
        }

        let canLD = true; // left down
        let movesLD = 1;
        while(canLD == true) {
            if(oldX >= (0 + movesLD) && oldY <= 7 - movesLD && grid[oldX - movesLD][oldY + movesLD] === 0) {
                available.push({x: oldX - movesLD, y: oldY + movesLD});
                movesLD++;
            } else if(oldX >= (0 + movesLD) && oldY <= 7 - movesLD && grid[oldX - movesLD][oldY + movesLD] > 0){
                available.push({x: oldX - movesLD, y: oldY + movesLD});
                canLD = false;
            } else {
                canLD = false;
            }
        }
        
        let canLU = true; // left up
        let movesLU = 1;
        while(canLU == true) {
            if(oldX >= (0 + movesLU) && oldY >= 0 + movesLU && grid[oldX - movesLU][oldY - movesLU] === 0) {
                available.push({x: oldX - movesLU, y: oldY - movesLU});
                movesLU++;
            } else if(oldX >= (0 + movesLU) && oldY >= 0 + movesLU && grid[oldX - movesLU][oldY - movesLU] > 0){
                available.push({x: oldX - movesLU, y: oldY - movesLU});
                canLU = false;
            } else {
                canLU = false;
            }
        }

        let canRD = true; // right down
        let movesRD = 1;
        while(canRD == true) {
            if(oldX < (8 - movesRD) && oldY <= 7 - movesRD && grid[oldX + movesRD][oldY + movesRD] === 0) {
                available.push({x: oldX + movesRD, y: oldY + movesRD});
                movesRD++;
            } else if(oldX < (8 - movesRD) && oldY <= 7 - movesRD && grid[oldX + movesRD][oldY + movesRD] > 0){
                available.push({x: oldX + movesRD, y: oldY + movesRD});
                canRD = false;
            } else {
                canRD = false;
            }
        }
        let canR = true; // right 
        let movesR = 1;
        while(canR == true) {
            if(oldX < (8 - movesR) && grid[oldX + movesR][oldY] === 0) {
                available.push({x: oldX + movesR, y: oldY});
                movesR++;
            } else if(oldX < (8 - movesR) && grid[oldX + movesR][oldY] > 0){
                available.push({x: oldX + movesR, y: oldY});
                canR = false;
            } else {
                canR = false;
            }
        }

        let canL = true; // left 
        let movesL = 1;
        while(canL == true) {
            if(oldX >= (0 + movesL) && grid[oldX - movesL][oldY] === 0) {
                available.push({x: oldX - movesL, y: oldY});
                movesL++;
            } else if(oldX >= (0 + movesL) && grid[oldX - movesL][oldY] > 0){
                available.push({x: oldX - movesL, y: oldY});
                canL = false;
            } else {
                canL = false;
            }
        }
        
        let canU = true; // up
        let movesU = 1;
        while(canU == true) {
            if(oldY >= 0 + movesU && grid[oldX][oldY - movesU] === 0) {
                available.push({x: oldX, y: oldY - movesU});
                movesU++;
            } else if(oldY >= 0 + movesU && grid[oldX][oldY - movesU] > 0){
                available.push({x: oldX, y: oldY - movesU});
                canU = false;
            } else {
                canU = false;
            }
        }

        let canD = true; // down
        let movesD = 1;
        while(canD == true) {
            if(oldY <= 7 - movesD && grid[oldX][oldY + movesD] === 0) {
                available.push({x: oldX, y: oldY + movesD});
                movesD++;
            } else if(oldY <= 7 - movesD && grid[oldX][oldY + movesD] > 0){
                available.push({x: oldX, y: oldY + movesD});
                canD = false;
            } else {
                canD = false;
            }
        } 
    }

    for(let i = 0;i < available.length;i ++) {
        if(available[i].x === newX && available[i].y === newY) {
            num = 0;
            turn = -turn;
            rotateBoard();
            if(turn === 1) {
                $('.n1').addClass('underline');
                $('.n2').removeClass('underline');
            } else {
                $('.n1').removeClass('underline');
                $('.n2').addClass('underline');
            }
            $('.square').removeClass('clicked');
            grid[oldX][oldY] = 0;
            grid[newX][newY] = piece;
            checkSqaureValue(oldX, oldY);
            checkSqaureValue(newX, newY);

        }
    }
}


// listens when you click on the board
$('.square').click(function() {
    let x = JSON.parse(this.getAttribute('x'));
    let y = JSON.parse(this.getAttribute('y'));
    if(grid[x][y] > 0 && turn === 1) {
        $('.square').removeClass('clicked');
        this.setAttribute('class', this.classList.value + ' clicked');
        num = [x, y, grid[x][y]];
    }
    if(grid[x][y] < 0 && turn === -1) {
        $('.square').removeClass('clicked');
        this.setAttribute('class', this.classList.value + ' clicked');
        num = [x, y, grid[x][y]];
    }
    if(num != 0 && turn === 1 && grid[x][y] < 1) {
        move(num[0], num[1], x, y, num[2]);
    }
    if(num != 0 && turn === -1 && grid[x][y] >= 0) {
        move(num[0], num[1], x, y, num[2]);
    }
})


function rotateBoard() {
    if(!$('.grid')[0].classList.contains('rotate')) {
        $('.grid').addClass('rotate');
        $('.square').addClass('rotate');
    } else {
        $('.grid').removeClass('rotate');
        $('.square').removeClass('rotate');
    }
}

let time, name1, name2;

$('.btn').on('click', () => {
    time = $('#clock')[0].value;
    name1 =  $('#name1')[0].value
    name2 = $('#name2')[0].value;
    
    $('.flex').addClass('hidden');
    $('body').addClass('game');
    $('svg').addClass('hidden');
    $('.title').addClass('hidden');
    $('.grid').removeClass('hidden');
    $('.n1').addClass('underline');
    $('.n1')[0].innerText = name1;
    $('.n2')[0].innerText = name2;
    $('.clock1').removeClass('hidden')
    $('.clock2').removeClass('hidden')
    clock1 = time * 60;
    clock2 = time * 60; 
    $('.clock1')[0].innerText = `${Math.floor(clock1 / 60)}:${clock1 - Math.floor(clock1 / 60) * 60}`;
    $('.clock2')[0].innerText = `${Math.floor(clock2 / 60)}:${clock2 - Math.floor(clock1 / 60) * 60}`;
});

setInterval(() => {
    if(turn === 1) {
        clock1 -= 1;
        $('.clock1')[0].innerText = `${Math.floor(clock1 / 60)}:${clock1 - Math.floor(clock1 / 60) * 60}`;
    } else {
        clock2 -= 1;
        $('.clock2')[0].innerText = `${Math.floor(clock2 / 60)}:${clock2 - Math.floor(clock1 / 60) * 60}`;
    }
}, 1000)