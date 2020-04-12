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
			return (this.tryJump(potential) || this.tryMove(potential))
	}

	tryJump(potential){
		if(!exists(potential)){
			let y;
			if(turn == 1){
				y = 1
			} else {
				y = -1
			}
			for(let i = -1; i <= 1; i += 2){ 
				if(this.pos.x + i * 2 == potential.x && this.pos.y + y * 2 == potential.y){
					let pos = createVector(this.pos.x + i, this.pos.y + y)
					index = getPeiceIndex(pos)
					if(exists(pos) && peices[index].team != this.team){
						peices.splice(index, 1)
						return true
					}
				}
			}
		}
		return false
	}

	tryMove(potential){
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
		return false
	}
};
