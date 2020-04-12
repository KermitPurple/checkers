let peices = []
let scl
let counter = 0;
let index;
let currentPeice = null;
let turnDisplay;
let nochange = false;
const Team = {
	BLACK: 0,
	WHITE: 1,
};
let turn = Team.BLACK;
const MoveType = {
	NONE: 0,
	MOVE: 1,
	JUMP: 2,
}

function setup(){
	createCanvas(590,590).parent('brdp');
	scl = width/8;
	turnDisplay = select('#turnDisplay')
	fillBoard();
}

function draw(){
	drawBoard()
	for(let i = 0; i < peices.length; i++){
		peices[i].upgrade();
		peices[i].draw();
	}
	drawCurrentHighlight()
}

function drawBoard(){
	let color
	strokeWeight(1);
	stroke(0);
	for(let i = 0; i < 8; i++){
		for(let j = 0; j < 8; j++){
			if((j + i) % 2 == 1){
				color = 20
			} else {
				color = 200
			}
			fill(color);
			beginShape();
			vertex(j * scl, i * scl);
			vertex((j + 1) * scl, i * scl);
			vertex((j + 1) * scl, (i + 1) * scl);
			vertex(j * scl, (i + 1) * scl);
			endShape(CLOSE);
		}
	}
}

function findSquare(){
	for(let i = 0; i < 9; i++){
		for(let j = 0; j < 9; j++){
			if(j * scl >= mouseX && i * scl >= mouseY){
				return createVector(j - 1 , i - 1);
			}
		}
	}
}

function getPeiceIndex(pos){
	if(exists(pos)){
		for(let i = 0; i < peices.length; i++){
			if(pos.x == peices[i].pos.x && pos.y == peices[i].pos.y){
				return i;
			}
		}
	}
}

function mousePressed(){
	print(jumpExists(turn, false))
	let pos = findSquare();
	if(currentPeice == null){
		index = getPeiceIndex(pos);
		if(peices[index].team != turn){
			return
		}
		currentPeice = peices[index];
	}else{
		if(!exists(pos)){
			let move = currentPeice.validMove(pos);
			if(move != MoveType.NONE){
				if(!jumpExists(turn) || move == MoveType.JUMP){
					nochange = false;
					currentPeice.pos = pos;
					if(move === MoveType.MOVE ||!jumpExists(turn)){
						if(turn == Team.BLACK){
							turn = Team.WHITE;
							turnDisplay.html("White Move");
						}else{
							turn = Team.BLACK;
							turnDisplay.html("Black Move");
						}
					} else if(jumpExists(turn)){
						nochange = true;
					}
				}
			}
			if(!nochange){
				currentPeice = null;
			}
		} else if(!nochange) {
			index = getPeiceIndex(pos)
			if(peices[index].team == turn){
				currentPeice = peices[index]
			}
		}
	}
}

function exists(pos){
	for(let i = 0; i < peices.length; i++){
		if(pos.x == peices[i].pos.x && pos.y == peices[i].pos.y){
			return true;
		}
	}
	return false
}

function drawCurrentHighlight(){
	if(currentPeice != null){
		noFill();
		strokeWeight(5);
		stroke(color('rgba(255, 0, 0, 0.5)'));
		rect(currentPeice.pos.x * scl, currentPeice.pos.y * scl, scl);
	}
}

function fillBoard(){
	for(let x = 1; x < 8; x += 2){
		peices.push(new Peice(x, 0, 1));
		peices.push(new Peice(x - 1, 1, 1));
		peices.push(new Peice(x, 2, 1));
		peices.push(new Peice(x - 1, 5, 0));
		peices.push(new Peice(x, 6, 0));
		peices.push(new Peice(x - 1, 7, 0));
	}
}

function jumpExists(team){
	for(let i = 0; i < peices.length; i++){
		if(peices[i].team == team){
			let pos;
			if(peices[i].king){
				for(let k = -1; k < 1; k += 2){
					for(let j = -1; j < 1; j += 2){
						pos = createVector(peices[i].pos.x + j * 2, peices[i].pos.y + k * 2)
						if(peices[i].tryJump(pos, false)){
							return true;
						}
					}
				}
			}else{
				let y;
				if(team == Team.BLACK){
					y = -1
				}else{
					y = 1
				}
				for(let j = -1; j < 1; j += 2){
					pos = createVector(peices[i].pos.x + j * 2, peices[i].pos.y + y * 2)
					if(peices[i].tryJump(pos, false)){
						return true;
					}
				}
			}
		}
	}
	return false
}
