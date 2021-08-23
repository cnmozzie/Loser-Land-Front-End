const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component {
	
	moveLeft () {
		this.node.x = this.node.x > -15*64? this.node.x - 64: this.node.x;
	}
	
	moveRight () {
		this.node.x = this.node.x < 15*64? this.node.x + 64: this.node.x;
	}
	
	moveUp () {
		this.node.y = this.node.y < 15*64? this.node.y + 64: this.node.y;
	}
	
	moveDown () {
		this.node.y = this.node.y > -15*64? this.node.y - 64: this.node.y;
	}
	
	onLoad () {
        this.node.zIndex = 2;
    },

    start () {
        
    }
}
