let peices = []
let scl
let counter = 0;
let turn = 0;
let index;
let currentPeice = null;
let turnDisplay;

function setup(){
	createCanvas(590,590).parent('brdp');
	scl = width/8;
	peices.push(new Peice(0,0,0));
	peices.push(new Peice(0,1,0));
	peices.push(new Peice(1,1,1));
	peices.push(new Peice(1,0,1));
	turnDisplay = select('#turnDisplay')
}

function draw(){
	drawBoard()
	for(let i = 0; i < peices.length; i++){
		peices[i].draw();
	}
	draw_current_highlight()
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
				if(peices[i].team == turn){
					return i;
				}
			}
		}
	}
}

function mousePressed(){
	let pos = findSquare();
	if(currentPeice == null){
		index = getPeiceIndex(pos);
		currentPeice = peices[index];
	}else{
		if(!exists(pos)){
			if(validMove(currentPeice.pos ,pos)){
				currentPeice.pos = pos
				if(turn == 0){
					turn = 1;
					turnDisplay.html("White Move");
				}else{
					turn = 0;
					turnDisplay.html("Black Move");
				}
			}
			currentPeice = null;
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

function validMove(old, potential){
	if(!exists(potential)){
		for(let i = -1; i <= 1; i++){ 
			for(let j = -1; j <= 1; j++){ 
				if(old.x + j == potential.x && old.y + i == potential.y){
						return true
				}
			}
		}
	}
	return false
}

function draw_current_highlight(){
	if(currentPeice != null){
		noFill();
		strokeWeight(5);
		stroke(color('rgba(255, 0, 0, 0.5)'))
		rect(currentPeice.pos.x * scl, currentPeice.pos.y * scl, scl)
	}
}
