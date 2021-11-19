const {ccclass, property} = cc._decorator;

@ccclass
export default class Register extends cc.Component {
	
	@property(cc.EditBox)
    nameEditbox: cc.EditBox = null;
	
	register (e, msg) {
		this.welcome.setUserName(this.nameEditbox.string)
		this.node.destroy()
    },
	
	skip (e, msg) {
        cc.log('skip');
		this.node.destroy()
    },
	
	setInfo (name) {
		this.nameEditbox.string = name;
	}
	
	set_zh () {
		cc.sys.localStorage.setItem('lang', 'zh');
		cc.director.loadScene("welcome");
    },
	
	set_en () {
		cc.sys.localStorage.setItem('lang', 'en');
		cc.director.loadScene("welcome");
    },

	onLoad () {
		
    },

    start () {

    }
}
