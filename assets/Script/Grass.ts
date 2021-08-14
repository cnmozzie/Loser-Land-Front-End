const {ccclass, property} = cc._decorator;

@ccclass
export default class Grass extends cc.Component {
	
	update (dt) {
        if (this.player.x - this.node.x > 7*64) {
			this.node.x = this.node.x + 15*64
		}
		else if (this.player.x - this.node.x < -7*64) {
			this.node.x = this.node.x - 15*64
		}
		else if (this.player.y - this.node.y > 5*64) {
			this.node.y = this.node.y + 11*64
		}
		else if (this.player.y - this.node.y < -5*64) {
			this.node.y = this.node.y - 11*64
		}
    },
	
	onLoad () {
        
    },

    start () {
        
    }
}
