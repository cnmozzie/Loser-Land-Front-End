const {ccclass, property} = cc._decorator;

@ccclass
export default class Withdraw extends cc.Component {
	
	lowb: number = 0;
	UMG: number = 0;
	
	@property(cc.Label)
    walletLabel: cc.Label = null;
	
	@property(cc.Label)
    lowbLabel: cc.Label = null;
	
	@property(cc.Label)
    UMGLabel: cc.Label = null;
	
	@property(cc.Button)
    lowbButton: cc.Button = null;
	
	@property(cc.Button)
    UMGButton: cc.Button = null;
	
	withdraw (e, msg) {
		if (msg == 'UMG') {
			this.UMGButton.interactable = false
			this.welcome.withdraw(1, 0)
		}
		else if (msg == 'lowb') {
			this.lowbButton.interactable = false
			this.welcome.withdraw(0, 0)
		}
    },
	
	skip (e, msg) {
        cc.log('skip')
		this.node.destroy()
    },
	
	setLabel (address, lowb, UMG) {
		this.walletLabel.string = address
		if (UMG <= 300) {
			UMG = 300;
		}
		else {
			this.UMGButton.interactable = true
		}
		if (lowb > 0) {
			this.lowbButton.interactable = true
		}
		const lang = cc.sys.localStorage.getItem('lang')
		if (lang === 'zh') {
			this.lowbLabel.string = `可提现数量：${lowb}`
			this.UMGLabel.string = `可提现数量：${UMG-300}`
		}
		else {
			this.lowbLabel.string = `Available: ${lowb}`
			this.UMGLabel.string = `Available: ${UMG-300}`
		}
	}
	

	onLoad () {
		this.lowbButton.interactable = false
		this.UMGButton.interactable = false
    },

    start () {

    }
}
