const {ccclass, property} = cc._decorator;

@ccclass
export default class Grass extends cc.Component {
	
	update (dt) {
        if (this.camera.x - this.node.x > 10*64) {
			this.node.x = this.node.x + 19*64
		}
		else if (this.camera.x - this.node.x < -10*64) {
			this.node.x = this.node.x - 19*64
		}
		else if (this.camera.y - this.node.y > 7*64) {
			this.node.y = this.node.y + 13*64
		}
		else if (this.camera.y - this.node.y < -7*64) {
			this.node.y = this.node.y - 13*64
		}
    },
	
	onLoad () {
        this.node.zIndex = 1;
    },

    start () {
        
    }
}
