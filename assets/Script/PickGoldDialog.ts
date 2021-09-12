const {ccclass, property} = cc._decorator;

@ccclass
export default class PickGoldDialog extends cc.Component {
	
	confirm() {
	    this.game.pick()
		this.node.destroy()
	}
	
	close() {
	    cc.log('cancle')
		this.node.destroy()
	}
	
	onLoad () {
        
    },

    start () {
        
    }
}
