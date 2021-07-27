
function showAlert(text) {
	$("#alert-btn").click();
	$("#alert-text").text(text);
}

// showAlert();

const b = null;

function clearIt() {
	document.getElementById("row " + String(1)).innerHTML = " ";
	var z = 1;
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			//var z1 = String(z);
			var inputF = document.getElementById(String(z));
			inputF.value = null;
			z++;
		}
	}
}

function initiate() {
	var startingBoard = [[]];
	var j = 0;
	for (var i = 1; i <= 81; i++) {
		const val = document.getElementById(String(i)).value;
		if (val == '') {
			startingBoard[j].push(null);
		} else {
			startingBoard[j].push(Number(val));
		}
		if (i % 9 == 0 && i < 81) {
			startingBoard.push([]);
			j++;
		}
	}

	const basicCheck = isInputValid(startingBoard);
	if(!basicCheck)
	{
		inputIsInvalid();
		return;
	}

	const inputValid = validBoard(startingBoard);
	if (!inputValid) {
		inputIsInvalid();
	} else {
		const answer = solve(startingBoard);
		updateBoard(answer, inputValid);
	}
}

function solve(board) {

	if (solved(board)) {
		return board;
	} else {
		const possibilities = nextBoards(board);
		const validBoards = keepOnlyValid(possibilities);
		return searchForSolution(validBoards);
	}
}

function searchForSolution(boards) {

	if (boards.length < 1) {
		return false;
	} else {

		var first = boards.shift();
		const tryPath = solve(first);
		if (tryPath != false) {
			return tryPath;
		} else {
			return searchForSolution(boards);
		}
	}
}

function solved(board) {

	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] == null) {
				return false;
			}
		}
	}
	return true;
}

function nextBoards(board) {
	var res = [];
	const firstEmpty = findEmptySquare(board);
	if (firstEmpty != undefined) {
		const y = firstEmpty[0];
		const x = firstEmpty[1];
		for (var i = 1; i <= 9; i++) {
			var newBoard = [...board];
			var row = [...newBoard[y]];
			row[x] = i;
			newBoard[y] = row;
			res.push(newBoard);
		}
	}
	return res;
}

function findEmptySquare(board) {

	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] == null) {
				return [i, j];
			}
		}
	}
}


function keepOnlyValid(boards) {
	var res = [];
	for (var i = 0; i < boards.length; i++) {
		if (validBoard(boards[i])) {
			res.push(boards[i]);
		}
	}
	return res;
}

function isInputValid(board){
	for(var i = 0 ; i<9 ; i++)
	{
		for(var j = 0 ; j<9 ; j++)
		{
			if( board[i][j] >9 || board[i][j]<0)
			{
				return(false);
			}
		}
	}
	return(true);
}


function validBoard(board) {

	return rowsGood(board) && columnsGood(board) && boxesGood(board);
}

function rowsGood(board) {

	for (var i = 0; i < 9; i++) {
		var cur = [];
		for (var j = 0; j < 9; j++) {
			if (cur.includes(board[i][j])) {
				return false;
			} else if (board[i][j] != null) {
				cur.push(board[i][j]);
			}
		}
	}
	return true;
}

function columnsGood(board) {

	for (var i = 0; i < 9; i++) {
		var cur = [];
		for (var j = 0; j < 9; j++) {
			if (cur.includes(board[j][i])) {
				return false;
			} else if (board[j][i] != null) {
				cur.push(board[j][i]);
			}
		}
	}
	return true;
}

function boxesGood(board) {
	const boxCoordinates = [
		[0, 0],
		[0, 1],
		[0, 2],
		[1, 0],
		[1, 1],
		[1, 2],
		[2, 0],
		[2, 1],
		[2, 2],
	];

	for (var y = 0; y < 9; y += 3) {
		for (var x = 0; x < 9; x += 3) {
			var cur = [];
			for (var i = 0; i < 9; i++) {
				var coordinates = [...boxCoordinates[i]];
				coordinates[0] += y;
				coordinates[1] += x;
				if (cur.includes(board[coordinates[0]][coordinates[1]])) {
					return false;
				} else if (board[coordinates[0]][coordinates[1]] != null) {
					cur.push(board[coordinates[0]][coordinates[1]]);
				}
			}
		}
	}
	return true;
}

function updateBoard(board) {
	if (board == false) {
		for (i = 1; i <= 9; i++) {
			showAlert("NO SOLUTION EXISTS TO THE GIVEN BOARD");
			// document.getElementById('row ' + String(i)).innerHTML = 'NO SOLUTION EXISTS TO THE GIVEN BOARD';
		}
	} else {
		// var inputF = document.getElementById("1");
		// inputF.value = String(board[0][0]);
		document.getElementById("row " + String(1)).innerHTML = " ";
		var z = 1;
		for(var i = 0; i<9 ; i++)
		{
			for(var j = 0 ; j<9 ; j++)
			{
				//var z1 = String(z);
				var inputF = document.getElementById(String(z));
				inputF.value = (board[i][j]);
				z++;
			}
		}

		// for (var i = 1; i <= 9; i++) {
		// 	var row = '';
		// 	for (var j = 0; j < 9; j++) {
		// 		if (row == '') {
		// 			row = row + String(board[i - 1][j]);
		// 		} else {
		// 			row = row + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + String(board[i - 1][j]);
		// 		}
		// 	}
		// 	document.getElementById('row ' + String(i)).innerHTML = row;
		// }
	}
}

function inputIsInvalid() {
	showAlert("INVALID MOVE");
    // document.getElementById('row ' + String(1)).innerHTML = 'THE GIVEN BOARD IS INVALID';
	// for (i = 2; i <= 9; i++) {
	// 	document.getElementById('row ' + String(i)).innerHTML = '';
	// }
}
