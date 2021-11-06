const {ccclass, property} = cc._decorator;

@ccclass
export default class DieDialog extends cc.Component {
	
	@property(cc.Label)
    label: cc.Label = null;
	
	
	setText(name) {
	    this.label.string = name + this.label.string
	}
	
	close() {
	    cc.log('cancle')
		cc.director.loadScene("game");
	}
	
	onLoad () {
        
    },

    start () {
        
    }
}
