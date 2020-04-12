class Peice{
	constructor(x, y, team){
		this.pos = createVector(x,y);
		this.team = team;
		this.king = false;
	}

	draw(){
		if(this.team == Team.BLACK){
			fill(0);
			stroke(255);
		} else {
			fill(255);
			stroke(0);
		}
		if(this.king){
			stroke(255, 0, 0);
		}
		strokeWeight(3);
		ellipseMode(CORNER)
		ellipse(this.pos.x * scl + scl/16, this.pos.y * scl + scl/16 , scl - scl/8)
	}

	validMove(potential){
		if(this.tryJump(potential)){
			return MoveType.JUMP;
		} else if(this.tryMove(potential)){
			return MoveType.MOVE;
		}
		return MoveType.NONE;
	}

	tryJump(potential, remove = true){
		if(!exists(potential)){
			for(let y = -1; y <= 1; y += 2){ 
				if(!this.king){
					if(turn == Team.WHITE){
						y = 1
					} else {
						y = -1
					}
				}
				for(let i = -1; i <= 1; i += 2){ 
					if(this.pos.x + i * 2 == potential.x && this.pos.y + y * 2 == potential.y){
						let pos = createVector(this.pos.x + i, this.pos.y + y)
						index = getPeiceIndex(pos)
						if(exists(pos) && peices[index].team != this.team){
							if(remove){
								peices.splice(index, 1)
							}
							return true
						}
					}
				}
				if(!this.king){
					return false
				}
			}
			return false
		}
	}

	tryMove(potential){
		if(jumpExists(this.team)){
			return false
		}
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

	upgrade(){
		if((this.pos.y == 0 && this.team == Team.BLACK) || (this.pos.y == 7 && this.team == Team.WHITE)){
			this.king = true;
		}
	}

};

