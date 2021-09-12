const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component {
	
	moveWest () {
		this.node.x = this.node.x - 64
	}
	
	moveEast () {
		this.node.x = this.node.x + 64
	}
	
	moveNorth () {
		this.node.y = this.node.y + 64
	}
	
	moveSouth () {
		this.node.y = this.node.y - 64
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
