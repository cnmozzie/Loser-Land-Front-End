const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component {

	onKeyDown (event) {
        // set a flag when key pressed
        switch(event.keyCode) {
            case cc.macro.KEY.a:
			case cc.macro.KEY.left:
			    this.node.x -=64;
                cc.log("left");
                break;
            case cc.macro.KEY.d:
			case cc.macro.KEY.right:
                this.node.x +=64;
				cc.log("right");
                break;
		    case cc.macro.KEY.s:
			case cc.macro.KEY.down:
                this.node.y -=64;
				cc.log("down");
                break;
            case cc.macro.KEY.w:
			case cc.macro.KEY.up:
                this.node.y +=64;
				cc.log("up");
                break;
        }
    },
	
	onLoad () {
        this.node.zIndex = 1;
	    // 初始化键盘输入监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },

    start () {
        
    }
}
