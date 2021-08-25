const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component {
	
	moveWest () {
		this.node.x = this.node.x > -15*64? this.node.x - 64: this.node.x
	}
	
	moveEast () {
		this.node.x = this.node.x < 15*64? this.node.x + 64: this.node.x
	}
	
	moveNorth () {
		this.node.y = this.node.y < 15*64? this.node.y + 64: this.node.y
	}
	
	moveSouth () {
		this.node.y = this.node.y > -15*64? this.node.y - 64: this.node.y
	}
	
	moveNorthWest () {
		this.moveNorth()
		this.moveWest()
	}
	
	moveSouthEast () {
		this.moveSouth()
		this.moveEast()
	}
	
	moveNorthEast () {
		this.moveNorth()
		this.moveEast()
	}
	
	moveSouthWest () {
		this.moveSouth()
		this.moveWest()
	}
	
	onLoad () {
        
    },

    start () {
        
    }
}
