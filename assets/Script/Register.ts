const {ccclass, property} = cc._decorator;

@ccclass
export default class Register extends cc.Component {
	
	@property(cc.EditBox)
    nameEditbox: cc.EditBox = null;
	
	@property(cc.EditBox)
    emailEditbox: cc.EditBox = null;
	
	@property(cc.EditBox)
    walletEditbox: cc.EditBox = null;
	
	register (e, msg) {
		this.welcome.setUserName(this.nameEditbox.string, this.emailEditbox.string, this.walletEditbox.string)
		this.node.destroy()
    },
	
	skip (e, msg) {
        cc.log('skip');
		this.node.destroy()
    },
	
	setInfo (name, email) {
		this.nameEditbox.string = name;
		this.emailEditbox.string = email;
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
