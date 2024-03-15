const board = document.createElement('div');
board.className = 'grid display-none';
document.body.appendChild(board);
const grid = [];
setBoard();

//променя екраните
const player1 = document.createElement('h2');
const player2 = document.createElement('h2');
document.querySelector('#start').addEventListener('click', () => {
	player1.innerText = document.querySelector('#player1').value || 'Player 1';
	player2.innerText = document.querySelector('#player2').value || 'Player 2';
	player1.className='textplayerbottom';
	player2.className='textplayertop';

	document.querySelector('body').removeChild(document.querySelector('.card'));
	document.body.appendChild(player1);
	document.body.appendChild(player2);
  document.body.style.alignItems = 'center';
	document.querySelector('.grid').className = 'grid';
})

function setBoard(){
	//правя двумерен масив с 64 квадрата
  for(let i = 0;i < 8;i++) {
    grid[i] = [];
    for(let j = 0;j < 8;j++){ 
        grid[i][j] = 0;
        //рисувам ги черни или бели
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

  // добавям фигурите на началните им позиции
  for(let i = 0;i < grid.length;i++) {
      grid[i][6] = 1;
      grid[i][1] = -1;
  }
  grid[0][7] = 4;
  grid[7][7] = 4;

  grid[1][7] = 3;
  grid[6][7] = 3;

  grid[2][7] = 2;
  grid[5][7] = 2;

  grid[3][7] = 5;
  grid[4][7] = 6;
  
  grid[0][0] = -4;
  grid[7][0] = -4;

  grid[1][0] = -3;
  grid[6][0] = -3;

  grid[2][0] = -2;
  grid[5][0] = -2;

  grid[3][0] = -5;
  grid[4][0] = -6;

	//update-вам дъската
  for(let i = 0;i < grid.length;i++) {
      for(let j = 0;j < grid.length;j++) {
          checkSqaureValue(i, j);
      }
  }
}

function  checkSqaureValue(i, j) {
  // проверява каква е стойността на квадрата и слага фигурата
  //0 = empty
  //1 = white pawn        -1 = black pawn
  //2 = white bishop      -2 = black bishop
  //3 = white knight      -3 = black knight
  //4 = white rook        -4 = black rook
  //5 = white queen       -5 = black queen
  //6 = white king        -6 = black king

	const figureImages = {
		1: "./assets/whitePawn.svg",
		2: "./assets/whiteBishop.svg",
		3: "./assets/whiteKnight.svg",
		4: "./assets/whiteRook.svg",
		5: "./assets/whiteQueen.svg",
		6: "./assets/whiteKing.svg",
		"-1": "./assets/blackPawn.svg",
		"-2": "./assets/blackBishop.svg",
		"-3": "./assets/blackKnight.svg",
		"-4": "./assets/blackRook.svg",
		"-5": "./assets/blackQueen.svg",
		"-6": "./assets/blackKing.svg",
	};
  if(grid[i][j] === 0) { //empty
		document.querySelector(`[x="${i}"][y="${j}"]`).innerHTML = '';
  } else {
		let source = figureImages[grid[i][j]];
		document.querySelector(`[x="${i}"][y="${j}"]`).innerHTML = `<img class="figure" src=${source}></img>`;
	}
}

// слуша за кликане на дъската
let turn = 1, trackPosition = 0;
const squares = document.querySelectorAll('.square');
squares.forEach(square => {
    square.addEventListener('click', function() {
        let x = JSON.parse(this.getAttribute('x'));
        let y = JSON.parse(this.getAttribute('y'));
        //активира квадрата на който играчът е кликнал
        if (grid[x][y] > 0 && turn === 1 || grid[x][y] < 0 && turn === -1) {
            squares.forEach(square => square.classList.remove('clicked'));
            this.classList.add('clicked');
            trackPosition = [x, y, grid[x][y]];
        }
				// разбира къде иска да мести играчът 
        if (trackPosition !== 0 && turn === 1 && grid[x][y] < 1 || trackPosition !== 0 && turn === -1 && grid[x][y] >= 0) {
            move(trackPosition[0], trackPosition[1], x, y, trackPosition[2]);
        }
    });
});

function move(oldX, oldY, newX, newY, piece) {
	
	let canWhiteCastle = true, canBlackCastle = true;
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
			//рокада
			if(canWhiteCastle && newX === 2 && newY === 7 && grid[0][7] === 4 && grid[1][7] === 0 && grid[2][7] === 0 && grid[3][7] === 0) {
					grid[oldX][oldY] = 0;
					grid[newX][newY] = 6;
					grid[newX + 1][newY] = 4;
					grid[0][7] = 0;
					checkSqaureValue(oldX, oldY);
					checkSqaureValue(newX, newY);
					checkSqaureValue(newX + 1, newY);
					checkSqaureValue(0, 7);
					canWhiteCastle = false;
					newTurn(oldX, oldY);
			}
			if(canWhiteCastle && newX === 6 && newY === 7 && grid[5][7] === 0 && grid[6][7] === 0 && grid[7][7] === 4) {
					grid[oldX][oldY] = 0;
					grid[newX][newY] = 6;
					grid[newX - 1][newY] = 4;
					grid[7][7] = 0;
					checkSqaureValue(oldX, oldY);
					checkSqaureValue(newX, newY);
					checkSqaureValue(newX - 1, newY);
					checkSqaureValue(7, 7);
					canWhiteCastle = false;
					newTurn(oldX, oldY);
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
			//рокада
			if(canBlackCastle && newX === 2 && newY === 0 && grid[0][0] === -4 && grid[1][0] === 0 && grid[2][0] === 0 && grid[3][0] === 0) {
					grid[oldX][oldY] = 0;
					grid[newX][newY] = -6;
					grid[newX + 1][newY] = -4;
					grid[0][0] = 0;
					checkSqaureValue(oldX, oldY);
					checkSqaureValue(newX, newY);
					checkSqaureValue(newX + 1, newY);
					checkSqaureValue(0, 0);
					canBlackCastle = false;
					newTurn(oldX, oldY);
			}
			if(canBlackCastle && newX === 6 && newY === 0 && grid[5][0] === 0 && grid[6][0] === 0 && grid[7][0] === -4) {
					grid[oldX][oldY] = 0;
					grid[newX][newY] = -6;
					grid[newX - 1][newY] = -4;
					grid[7][0] = 0;

					checkSqaureValue(oldX, oldY);
					checkSqaureValue(newX, newY);
					checkSqaureValue(newX - 1, newY);
					checkSqaureValue(7, 0);
					canBlackCastle = false;
					newTurn(oldX, oldY);
			}

	}else if(piece === 2) {
		// available moves for the white bishop
		const directions = [[1, -1], [-1, 1], [-1, -1], [1, 1]]; // [dx, dy]
		for (const direction of directions) {
			const dx = direction[0]; 
			const dy = direction[1]; 
			let canMove = true;
			let moves = 1;
			while (canMove) {
				const newX = oldX + dx * moves;
				const newY = oldY + dy * moves;
				if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
					if (grid[newX][newY] === 0) {
						available.push({ x: newX, y: newY });
						moves++;
					} else if (grid[newX][newY] < 0) {
						available.push({ x: newX, y: newY });
						canMove = false;
					} else {
						canMove = false;
					}
				} else {
					canMove = false;
				}
			}
		}
	} else if(piece === -2) {
		//available moves for the black bishop
		const directions = [[1, -1], [-1, 1], [-1, -1], [1, 1]]; 
		for (const direction of directions) {
			const dx = direction[0]; 
			const dy = direction[1]; 
			let canMove = true;
			let moves = 1;
			while (canMove) {
				const newX = oldX + moves * dx;
				const newY = oldY + moves * dy;
				if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
					if (grid[newX][newY] === 0) {
						available.push({ x: newX, y: newY });
						moves++;
					} else if (grid[newX][newY] > 0) {
						available.push({ x: newX, y: newY });
						canMove = false;
					} else {
						canMove = false;
					}
				} else {
					canMove = false;
				}
			}
		}
	}else if(piece === 4){
		//available moves for the white rook
		const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
		for(const direction of directions) {
			const dx = direction[0]; 
			const dy = direction[1]; 
			let canMove = true;
			let moves = 1;
			while (canMove) {
				const newX = oldX + moves * dx;
				const newY = oldY + moves * dy;
				if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
					if (grid[newX][newY] === 0) {
						available.push({ x: newX, y: newY });
						moves++;
					} else if (grid[newX][newY] < 0) {
						available.push({ x: newX, y: newY });
						canMove = false;
					} else {
						canMove = false;
					}
				} else {
					canMove = false;
				}
			}
		}
	} else if(piece === -4) {
		//available moves for the black rook
		const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]; // Right, Left, Up, Down
		for (const direction of directions) {
			const dx = direction[0]; 
			const dy = direction[1]; 
			let canMove = true;
			let moves = 1;
			while (canMove) {
				const newX = oldX + moves * dx;
				const newY = oldY + moves * dy;
				if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
					if (grid[newX][newY] === 0) {
						available.push({ x: newX, y: newY });
						moves++;
					} else if (grid[newX][newY] > 0) {
						available.push({ x: newX, y: newY });
						canMove = false;
					} else {
						canMove = false;
					}
				} else {
						canMove = false;
				}
			}
		}

	}else if(piece === 5) {
		// Available moves for the queen
		const directions = [
			[1, -1], [-1, 1], [-1, -1], [1, 1], // Diagonals
			[1, 0], [-1, 0], [0, -1], [0, 1] // Horizontal and vertical
		];
		for (const direction of directions) {
			const dx = direction[0]; 
			const dy = direction[1]; 
			let canMove = true;
			let moves = 1;
			while (canMove) {
				const newX = oldX + moves * dx;
				const newY = oldY + moves * dy;
				if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
						if (grid[newX][newY] === 0) {
								available.push({ x: newX, y: newY });
								moves++;
						} else if (grid[newX][newY] !== undefined && grid[newX][newY] < 0) {
								available.push({ x: newX, y: newY });
								canMove = false;
						} else {
								canMove = false;
						}
				} else {
						canMove = false;
				}
			}
		}
	}  else if(piece === -5) {
		// Available moves for the black queen
		const directions = [
			[1, -1], [-1, 1], [-1, -1], [1, 1], // Diagonals
			[1, 0], [-1, 0], [0, -1], [0, 1] // Horizontal and vertical
		];
		for (const direction of directions) {
			const dx = direction[0]; 
			const dy = direction[1]; 
			let canMove = true;
			let moves = 1;
			while (canMove) {
				const newX = oldX + moves * dx;
				const newY = oldY + moves * dy;
				if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
					if (grid[newX][newY] === 0) {
						available.push({ x: newX, y: newY });
						moves++;
					} else if (grid[newX][newY] !== undefined && grid[newX][newY] > 0) {
						available.push({ x: newX, y: newY });
						canMove = false;
					} else {
						canMove = false;
					}
				} else {
					canMove = false;
				}
			}
		}
	}
	for(let i = 0;i < available.length;i ++) {
			if(available[i].x === newX && available[i].y === newY) {
					newTurn(oldX, oldY);
					grid[oldX][oldY] = 0;
					grid[newX][newY] = piece;
					checkSqaureValue(oldX, oldY);
					checkSqaureValue(newX, newY);
					
					if(piece === 1 && newY === 0) {
							//white pawn becomes queen
							grid[newX][newY] = 5;
							checkSqaureValue(newX, newY)
					}
					if(piece === -1 && newY === 7) {
							//black pawn becomes queen
							grid[newX][newY] = -5;
							checkSqaureValue(newX, newY)
					}
					if(piece === 6) {
							canWhiteCastle = false;
					}
					if(piece === -6) {
							canBlackCastle = false;
					}
			}
	}
}

function newTurn(oldX, oldY) {
	trackPosition = 0;
	turn = -turn;
	let figures = document.querySelectorAll('.square');
	//премахва активираният квадрат
	document.querySelector(`[x="${oldX}"][y="${oldY}"]`).classList.remove('clicked')
	//завъртва дъската
	if(board.style.transform === 'rotate(180deg)') {
		board.style.transform = 'rotate(0deg)';
		player1.className='textplayerbottom';
		player2.className='textplayertop';
	
		for(let i = 0;i < figures.length;i++ ){ 
			figures[i].style.transform = 'rotate(0deg)';
		}
	} else {
		for(let i = 0;i < figures.length;i++ ){ 
			player1.className='textplayertop';
			player2.className='textplayerbottom';
			board.style.transform = 'rotate(180deg)'
			figures[i].style.transform = 'rotate(180deg)';
		}
	}
}