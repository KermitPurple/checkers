let peices = []

function setup(){
	createCanvas(600,600);
	peices.push(new Peice(0,0,0));
	peices.push(new Peice(1,0,0));
	peices.push(new Peice(1,1,1));
	peices.push(new Peice(0,1,1));
}

function draw(){
	drawBoard()
	for(let i = 0; i < peices.length; i++){
		peices[i].draw();
	}
}

function drawBoard(){
	let scl = width/8;
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

function mousePressed(){
}
