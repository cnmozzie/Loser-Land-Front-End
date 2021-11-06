const {ccclass, property} = cc._decorator;
import {ethers} from 'ethers/dist/ethers.umd.min.js';

@ccclass
export default class Welcome extends cc.Component {

	okt: number = 0;
	address: string = '';
	bindAddress: string = '';
	privateKey: string = '';
	newRegisterAddress: string = '0x76f099cd22E737FC38f17FA07aA95dACe8e53e4e';
	//registerAddress: string = '0x5eFa33708a7688Fa116B6Cb3eC65D7fcE3c9f599';
	rogueLandAddress: string = '0x4fB911AD82321a3639626260156b0f0ea3bd0d02';
	accountInfo: any = null;
	provider: any = null;
	wallet: any = null;
	rogueLandContract: any = null;
	registerContract: any = null;
	balance: number[] = [0, 0];
	pendingRewards: number[] = [0, 0];
	
	@property(cc.Label)
    nameLabel: cc.Label = null;
	
	@property(cc.Label)
    infoLabel: cc.Label = null;
	
	@property(cc.Label)
    balanceLabel: cc.Label = null;
	
	@property(cc.Label)
    recordLabel: cc.Label = null;
	
	@property(cc.Button)
    chargeButton: cc.Button = null;
	
	@property(cc.Button)
    tradeButton: cc.Button = null;
	
	@property(cc.Button)
    registerButton: cc.Button = null;
	
	@property(cc.Button)
    giftButton: cc.Button = null;
	
	@property(cc.EditBox)
    phoneEditbox: cc.EditBox = null;
	
	@property(cc.JsonAsset)
    newRegisterJson: cc.JsonAsset = null;
	
	@property(cc.JsonAsset)
    rogueLandJson: cc.JsonAsset = null;
	
	@property(cc.JsonAsset)
    punkJson: cc.JsonAsset = null;
	
	@property(cc.Prefab)
    accountPrefab: cc.Prefab = null;
	
	@property(cc.Prefab)
    registerPrefab: cc.Prefab = null;
	
	@property(cc.Prefab)
    rewardPrefab: cc.Prefab = null;
	
	@property(cc.Prefab)
    rankPrefab: cc.Prefab = null;
	
	@property(cc.Prefab)
    withdrawPrefab: cc.Prefab = null;
	
	
	startGame (e, msg) {
        cc.log('start game');
		cc.director.loadScene("game");
    },
	
	setWallet (wallet) {
		const walletData = {address: wallet.address, privateKey: wallet.privateKey}
		cc.sys.localStorage.setItem('wallet', JSON.stringify(walletData));
		this.address = walletData.address
		this.privateKey = walletData.privateKey
    },
	
	setInfoLabel (n) {
		const lang = cc.sys.localStorage.getItem('lang')
		if (lang === 'zh') {
			this.infoLabel.string = `当前赛季：S2a  报名人数： ${n}/666`
		}
		else {
			this.infoLabel.string = `Current Season: S2a  Enrollment: ${n}/666`
		}
	}
	
	setBalanceLabel () {
		const lang = cc.sys.localStorage.getItem('lang')
		if (lang === 'zh') {
			this.balanceLabel.string = `行动点: ${this.okt}  积分: ${Math.floor(ethers.utils.formatEther(this.balance[0]))}  UMG: ${Math.floor(ethers.utils.formatEther(this.balance[1]))}`
		}
		else {
			this.balanceLabel.string = `Action Points: ${this.okt}  Points: ${Math.floor(ethers.utils.formatEther(this.balance[0]))}  UMG: ${Math.floor(ethers.utils.formatEther(this.balance[1]))}`
		}
	}
	
	setRecordLabel (id, done) {
		const lang = cc.sys.localStorage.getItem('lang')
		if (lang === 'zh') {
			this.recordLabel.string = `最新提现ID：${id}`
			if (!done) {
				this.recordLabel.string += ' (处理中)'
			}
		}
		else {
			this.recordLabel.string = `Latest Withdraw ID：${id}`
			if (!done) {
				this.recordLabel.string += ' (Processing)'
			}
		}
	}
	
	async enrollGame () {
        this.registerButton.interactable = false
		const rogueLandSigner = this.rogueLandContract.connect(this.wallet)
		try {
			const tx = await rogueLandSigner.register({gasLimit: 300000})
		}
		catch (e) {
			cc.log(e)
		}
		this.okt -= 2
		this.setBalanceLabel()
    },
	
	getGift () {
        var newDialog = cc.instantiate(this.rewardPrefab);
        this.node.addChild(newDialog);
        newDialog.setPosition(cc.v2(0, 0));
		// 在对话框脚本组件上保存 Welcome 对象的引用
        newDialog.getComponent('Rewards').welcome = this;
		newDialog.getComponent('Rewards').setLabel(Math.floor(ethers.utils.formatEther(this.pendingRewards[0])), Math.floor(ethers.utils.formatEther(this.pendingRewards[1])));
    },
	
	async openWithdrawDialog () {
        //const registerContract = new ethers.Contract(this.newRegisterAddress, this.newRegisterJson.json.abi, this.provider)
		const account = await this.registerContract.accountInfo(this.address)
		this.bindAddress = account.wallet
		var newDialog = cc.instantiate(this.withdrawPrefab);
        this.node.addChild(newDialog);
        newDialog.setPosition(cc.v2(0, 0));
		// 在对话框脚本组件上保存 Welcome 对象的引用
        newDialog.getComponent('Withdraw').welcome = this;
		newDialog.getComponent('Withdraw').setLabel(account.wallet, Math.floor(ethers.utils.formatEther(this.balance[0])), Math.floor(ethers.utils.formatEther(this.balance[1])));
    },
	
	async setUserName (name, email, wallet) {
        cc.log(name, email, wallet)
		//const registerContract = new ethers.Contract(this.newRegisterAddress, this.newRegisterJson.json.abi, this.provider)
		const registerSigner = this.registerContract.connect(this.wallet)
		try {
			const tx = await registerSigner.register(name, email, wallet)
		}
		catch (e) {
			cc.log(e)
		}
		this.okt -= 3
		this.setBalanceLabel()
    },
	
	async claimRewards () {
        cc.log('claimLowb')
		this.balance = this.pendingRewards
		const rogueLandSigner = this.rogueLandContract.connect(this.wallet)
		try {
			const tx = await rogueLandSigner.claimRewards()
		}
		catch (e) {
			cc.log(e)
		}
		this.okt -= 2
		this.setBalanceLabel()
    },
	
	charge () {
        cc.log(this.phoneEditbox.string)
		this.chargeButton.interactable = false
		this.withdraw(0, this.phoneEditbox.string)
    },
	
	async withdraw (id, kind) {
        cc.log('withdraw', this.balance[id].toString())
		let amount = '20000000000000000000000'
		if (kind == 0) {
			amount = this.balance[id].toString()
		}
		const registerSigner = this.registerContract.connect(this.wallet)
		try {
			const tx = await registerSigner.use(this.address, id, amount, kind, this.bindAddress)
		}
		catch (e) {
			cc.log(e)
		}
		if (kind == 0) {
			this.okt -= 2
		    this.setRecordLabel(0, false)
		    this.balance[id] = 0
		    this.setBalanceLabel()
		}
		else {
			cc.director.loadScene("welcome");
		}
		
    },
	
	async getPunkInfo (id) {
        const player = await this.rogueLandContract.punkMaster(id)
		const account = await this.registerContract.accountInfo(player)
		if (account.name == "")
			return player.slice(0, 6)
		else 
			return account.name
    },
	
	async lookRank () {
        const golds = await this.rogueLandContract.getGoldsofAllPunk()
		var newDialog = cc.instantiate(this.rankPrefab);
        this.node.addChild(newDialog);
        newDialog.setPosition(cc.v2(0, 0));
		// 在对话框脚本组件上保存 Welcome 对象的引用
        newDialog.getComponent('Rank').welcome = this;
		newDialog.getComponent('Rank').setGolds(golds);
    },
	
	setAccount () {
        var newDialog = cc.instantiate(this.accountPrefab);
        this.node.addChild(newDialog);
        newDialog.setPosition(cc.v2(0, 0));
    },
	
	gameSetting () {
        var newDialog = cc.instantiate(this.registerPrefab);
        this.node.addChild(newDialog);
        newDialog.setPosition(cc.v2(0, 0));
		// 在对话框脚本组件上保存 Welcome 对象的引用
        newDialog.getComponent('Register').welcome = this;
		newDialog.getComponent('Register').setInfo(this.accountInfo.name, this.accountInfo.email)
    },
	
	async setUserInfo () {
		
		const okt = await this.wallet.getBalance()
		this.okt = Math.floor(ethers.utils.formatEther(okt)*10000)
		
		this.registerContract = new ethers.Contract(this.newRegisterAddress, this.newRegisterJson.json.abi, this.provider)
        this.accountInfo = await this.registerContract.accountInfo(this.address)
		const balance = await this.registerContract.balanceOf(this.address)
		for (let i=0; i<balance.length; i++) {
			this.balance[i] = balance[i]
		}
		if (this.balance[0] > 20000e18) {
			//this.chargeButton.interactable = true
		}
		this.setBalanceLabel()
		if (this.accountInfo.name != "") {
			this.nameLabel.string = this.accountInfo.name
			if (this.accountInfo.punkId > 0) {
				this.nameLabel.string = this.accountInfo.name + "(VIP)"
			}
		}
		
		this.rogueLandContract = new ethers.Contract(this.rogueLandAddress, this.rogueLandJson.json.abi, this.provider)
        const freePunk = await this.rogueLandContract.freePunk()
		this.setInfoLabel(freePunk-2)
		
		const punkId = await this.rogueLandContract.punkOf(this.address)
		
		if (punkId > 0) {
			cc.log(this.punkJson.json[punkId-1])
			let remoteUrl = "https://www.losernft.org/ipfs/" + this.punkJson.json[punkId-1].hash
			cc.sys.localStorage.setItem('myPunk', Number(punkId));
			let sprite = this.node.getChildByName('punk_image').getComponent(cc.Sprite)
			cc.assetManager.loadRemote<cc.Texture2D>(remoteUrl, { ext: '.png', cacheEnabled: true }, function (err, pic) {
              if (err) {
                cc.log('LoadNetImg load error,error:' + err)
                return
              }
              sprite.spriteFrame = new cc.SpriteFrame(pic)
            });
		}
		else {
			if (freePunk <= 667 && this.okt > 0) {
				this.registerButton.interactable = true
				this.registerButton.node.zIndex = 2
			}
			cc.log("you are a visitor")
			cc.sys.localStorage.setItem('myPunk', 0)
		}
		
		this.pendingRewards = await this.rogueLandContract.pendingRewards(this.address)
		//cc.log(this.pendingRewards)
		
		const useId = await this.registerContract.lastUse(this.address)
		if (useId > 0) {
			this.setRecordLabel(useId, true)
			const done = await this.registerContract.useInfo(useId)
			if (done == 1) {
				this.setRecordLabel(useId, false)
			}
		}
    },
	
	onLoad () {
		//this.tradeButton.interactable = false
		this.chargeButton.interactable = false
		this.registerButton.interactable = false
		
		let walletData = JSON.parse(cc.sys.localStorage.getItem('wallet'));
		if (!walletData) {
			const wallet = new ethers.Wallet.createRandom()
		    this.setWallet(wallet)
		}
		else {
			this.address = walletData.address
		    this.privateKey = walletData.privateKey
		}
		this.provider = new ethers.providers.JsonRpcProvider("https://exchaintestrpc.okex.org")
		const walletPrivateKey = new ethers.Wallet(this.privateKey)
		this.wallet = walletPrivateKey.connect(this.provider)

		this.setUserInfo()
		
		const lang = cc.sys.localStorage.getItem('lang')
		if (!lang) {
			this.gameSetting()
		}
		
    },

    start () {

    }
}
