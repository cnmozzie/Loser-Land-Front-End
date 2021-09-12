const {ccclass, property} = cc._decorator;

@ccclass
export default class PutGoldDialog extends cc.Component {
	
	confirm() {
	    this.game.put()
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
