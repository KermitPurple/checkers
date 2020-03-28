class Peice{
	constructor(x, y, team){
		this.pos = createVector(x,y)
		this.team = team
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
};
