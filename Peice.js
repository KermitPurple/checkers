class Peice{
	constructor(x, y, team){
		this.pos = createVector(x,y);
		this.team = team;
		this.king = false;
	}

	draw(){
		if(this.team == 0){
			fill(0);
			stroke(255);
		} else {
			fill(255);
			stroke(0);
		}
		strokeWeight(3);
		ellipseMode(CORNER)
		ellipse(this.pos.x * scl + scl/16, this.pos.y * scl + scl/16 , scl - scl/8)
	}

	validMove(potential){
		if(!exists(potential)){
			for(let i = -1; i <= 1; i += 2){ 
				for(let j = -1; j <= 1; j += 2){ 
					if(this.pos.x + j == potential.x && this.pos.y + i == potential.y){
						if(this.king || (i > 0 && turn == 1) || (i < 0 && turn == 0)){
							return true;
						}
					}
				}
			}
		}
		return false;
	}
};
