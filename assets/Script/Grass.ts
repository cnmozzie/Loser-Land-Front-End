const {ccclass, property} = cc._decorator;

@ccclass
export default class Grass extends cc.Component {
	
	update (dt) {
        if (this.camera.x - this.node.x > 7*64) {
			this.node.x = this.node.x + 15*64
		}
		else if (this.camera.x - this.node.x < -7*64) {
			this.node.x = this.node.x - 15*64
		}
		else if (this.camera.y - this.node.y > 5*64) {
			this.node.y = this.node.y + 11*64
		}
		else if (this.camera.y - this.node.y < -5*64) {
			this.node.y = this.node.y - 11*64
		}
    },
	
	onLoad () {
        this.node.zIndex = 1;
    },

    start () {
        
    }
}
