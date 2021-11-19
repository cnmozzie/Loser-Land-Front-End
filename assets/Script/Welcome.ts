const {ccclass, property} = cc._decorator;
import {ethers} from 'ethers/dist/ethers.umd.min.js';

@ccclass
export default class Welcome extends cc.Component {

	okt: number = 0;
	squid: number = 0;
	hep: number = 0;
	squidApproved: number = 0;
	hepApproved: number = 0;
	pool: number = 0;
	address: string = '';
	username: string = '';
	bindAddress: string = '';
	privateKey: string = '';
	hepAddress: string = '0xfD83168291312A0800f44610974350C569d12e42';
	squidAddress: string = '0xC9a9bE0f88b44889F30EA0978e984FB5a6eFE68b';
	rogueLandAddress: string = '0x432E7300786636043Bd3791fD49f4C0c58C3CC87';
	provider: any = null;
	wallet: any = null;
	rogueLandContract: any = null;
	
	@property(cc.Label)
    nameLabel: cc.Label = null;
	
	@property(cc.Label)
    infoLabel: cc.Label = null;
	
	@property(cc.Label)
    cherryLabel: cc.Label = null;
	
	@property(cc.Label)
    loserLabel: cc.Label = null;
	
	@property(cc.Label)
    balanceLabel: cc.Label = null;
	
	@property(cc.Button)
    loserButton: cc.Button = null;
	
	@property(cc.Button)
    cherryButton: cc.Button = null;
	
	@property(cc.Button)
    registerButton: cc.Button = null;
	
	@property(cc.Button)
    approveButton: cc.Button = null;
	
	@property(cc.JsonAsset)
    ERC20Json: cc.JsonAsset = null;
	
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
	
	setInfoLabel (a, b, n) {
		const lang = cc.sys.localStorage.getItem('lang')
		if (lang === 'zh') {
			this.loserLabel.string = `存活: ${a}/333`
			this.cherryLabel.string = `死亡: ${b}/333`
			this.infoLabel.string = `当前赛季：S2  报名人数： ${n}/666`
		}
		else {
			this.loserLabel.string = `Live: ${a}/333`
			this.cherryLabel.string = `Dead: ${b}/333`
			this.infoLabel.string = `Current Season: S2a  Enrollment: ${n}/666`
		}
	}
	
	setBalanceLabel () {
		const lang = cc.sys.localStorage.getItem('lang')
		this.balanceLabel.string = `OKT: ${this.okt}  SQUID: ${this.squid}  HEP: ${this.hep}\n`
		if (lang === 'zh') {
			this.balanceLabel.string += `游戏进度：${6666-this.pool}/6666`
		}
		else {
			this.balanceLabel.string += `Progress: ${6666-this.pool}/6666`
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
			const tx = await rogueLandSigner.registerWithSquid()
		}
		catch (e) {
			cc.log(e)
		}
    },
	
	async enrollGameWithNFT () {
        this.cherryButton.interactable = false
		const rogueLandSigner = this.rogueLandContract.connect(this.wallet)
		try {
			const tx = await rogueLandSigner.registerWithNFT()
		}
		catch (e) {
			cc.log(e)
		}
    },
	
	async enrollGameWithPunk () {
        this.loserButton.interactable = false
		const rogueLandSigner = this.rogueLandContract.connect(this.wallet)
		try {
			const tx = await rogueLandSigner.registerWithPunk()
		}
		catch (e) {
			cc.log(e)
		}
    },
	
	async setUserName (name) {
        cc.log(name)
		const rogueLandSigner = this.rogueLandContract.connect(this.wallet)
		try {
			const tx = await rogueLandSigner.setNickName(name)
		}
		catch (e) {
			cc.log(e)
		}
		//this.setBalanceLabel()
    },
	
	
	async getPunkInfo (id) {
        const player = await this.rogueLandContract.punkMaster(id)
		const name = await this.rogueLandContract.nickNameOf(player)
		if (player.slice(0, 6) == "0x0000")
			return "DEAD"
		else if (name == "")
			return player.slice(0, 6)
		else 
			return name
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
	
	async approve () {
        this.approveButton.interactable = false
		
		if (this.squidApproved < 1e18) {
		  try {
			const squidContract = new ethers.Contract(this.squidAddress, this.ERC20Json.json.abi, this.provider)
			const squidSigner = squidContract.connect(this.wallet)
			const tx = await squidSigner.approve(this.rogueLandAddress, ethers.utils.parseUnits("6666"))
		  }
		  catch (e) {
			cc.log(e)
		  }
		}
		if (this.hepApproved < 1) {
		  try {
			const hepContract = new ethers.Contract(this.hepAddress, this.ERC20Json.json.abi, this.provider)
			const hepSigner = hepContract.connect(this.wallet)
			const tx = await hepSigner.approve(this.rogueLandAddress, 30000000)
		  }
		  catch (e) {
			cc.log(e)
		  }
		}
    },
	
	gameSetting () {
        var newDialog = cc.instantiate(this.registerPrefab);
        this.node.addChild(newDialog);
        newDialog.setPosition(cc.v2(0, 0));
		// 在对话框脚本组件上保存 Welcome 对象的引用
        newDialog.getComponent('Register').welcome = this;
		newDialog.getComponent('Register').setInfo(this.username)
    },
	
	async setUserInfo () {
		
		const okt = await this.provider.getBalance(this.address)
		this.okt = Math.floor(ethers.utils.formatEther(okt)*10000)/10000
		cc.log(this.okt)

		this.rogueLandContract = new ethers.Contract(this.rogueLandAddress, this.rogueLandJson.json.abi, this.provider)
        this.username = await this.rogueLandContract.nickNameOf(this.address)
		const gameInfo = await this.rogueLandContract.gameInfo(this.address)
		cc.log(gameInfo)
		this.hep = gameInfo.hepBalance;
		this.squid = Math.floor(ethers.utils.formatEther(gameInfo.squidBalance)*1000)/1000;
		this.pool = Math.floor(ethers.utils.formatEther(gameInfo.pool));
		this.setBalanceLabel()
		
		if (gameInfo.squidApproved < 1e18 || gameInfo.hepApproved < 1) {
			this.squidApproved = gameInfo.squidApproved
			this.hepApproved = gameInfo.hepApproved
			this.approveButton.interactable = true
		}
		
		if (gameInfo.squidApproved >= 1e18 && gameInfo.squidBalance >= 1e18) {
			this.registerButton.interactable = true
		}
		
		if (gameInfo.hepApproved >= 1 && gameInfo.hepBalance >= 1) {
			cc.sys.localStorage.setItem('hep', Number(gameInfo.hepBalance));
		}

		if (this.username != "") {
			this.nameLabel.string = this.username
		}
		
        const evenPunk = gameInfo.evenPunk/2-1
		const oddPunk = Math.floor(gameInfo.oddPunk/2-1)
		if (evenPunk < 333 && gameInfo.hasPunk) {
			//this.loserButton.interactable = true
		}
		if (oddPunk < 333 && gameInfo.hasNFT) {
			//this.cherryButton.interactable = true
		}
		const totalPunk = await this.rogueLandContract.totalPunk()
		this.setInfoLabel(totalPunk-gameInfo.oddPunk, gameInfo.oddPunk, totalPunk)
		
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
			//if (freePunk <= 667 && this.okt > 0) {
			//	this.registerButton.interactable = true
			//	this.registerButton.node.zIndex = 2
			//}
			cc.log("you are a visitor")
			cc.sys.localStorage.setItem('myPunk', 0)
		}
		
		//this.pendingRewards = await this.rogueLandContract.pendingRewards(this.address)
		//cc.log(this.pendingRewards)
		
    },
	
	async getChainId () {
  		try {
    		const chainId = await ethereum.request({
      			method: 'eth_chainId',
      		})
    		cc.log("chain id", chainId)
			if (chainId == '0x42') {
				await ethereum.request({ 
    				method: 'eth_requestAccounts' 
    			})
    			const newAccounts = await ethereum.request({
      			method: 'eth_accounts',
    			})
				this.address = newAccounts[0]
				cc.sys.localStorage.setItem('address', this.address);
				cc.log("address", this.address)
				this.setUserInfo()
			}
  		} catch (err) {
    		console.error(err)
  		}
	},
	
	onLoad () {
		this.loserButton.interactable = false
		this.cherryButton.interactable = false
		this.registerButton.interactable = false
		this.approveButton.interactable = false
		
		cc.sys.localStorage.setItem('address', '');
		cc.sys.localStorage.setItem('hep', 0);
		const { ethereum } = window
		if (Boolean(ethereum)) {
			this.provider = new ethers.providers.Web3Provider(window.ethereum)
		    this.wallet = this.provider.getSigner()
			this.getChainId()
		}
		
		const lang = cc.sys.localStorage.getItem('lang')
		if (!lang) {
			this.gameSetting()
		}
		
    },

    start () {

    }
}
