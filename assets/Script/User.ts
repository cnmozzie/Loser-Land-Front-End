const {ccclass, property} = cc._decorator;
import {ethers} from 'ethers/dist/ethers.umd.min.js';

@ccclass
export default class User extends cc.Component {

	address: string = '';
	privateKey: string = '';
	rogueLandAddress: string = '0x7066F9F9C8130405C32Ae1045AeFb4B45b11C30f';
	
	@property(cc.Label)
    label: cc.Label = null;
	
	@property(cc.EditBox)
    showAddressEditbox: cc.EditBox = null;
	
	@property(cc.EditBox)
    showKeyEditbox: cc.EditBox = null;
	
	@property(cc.EditBox)
    importKeyEditbox: cc.EditBox = null;
	
	@property(cc.JsonAsset)
    rogueLandJson: cc.JsonAsset = null;
	
	@property(cc.Node)
    punk: cc.Node = null;
	
	startGame (e, msg) {
        //cc.log(msg);
		cc.director.loadScene("game");
    },
	
	setWallet (wallet) {
		const walletData = {address: wallet.address, privateKey: wallet.privateKey}
		cc.sys.localStorage.setItem('wallet', JSON.stringify(walletData));
		this.address = walletData.address
		this.privateKey = walletData.privateKey
    },
	
	set_zh () {
		cc.sys.localStorage.setItem('lang', 'zh');
		cc.director.loadScene("user");
    },
	
	set_en () {
		cc.sys.localStorage.setItem('lang', 'en');
		cc.director.loadScene("user");
    },
	
	newAccount () {
		cc.sys.localStorage.removeItem('wallet')
		cc.director.loadScene("user")
    },
	
	showAddress () {
		this.showAddressEditbox.string = this.address
    },
	
	showPrivateKey () {
		this.showKeyEditbox.string = this.privateKey
    },
	
	importPrivateKey () {
		try {
			const wallet = new ethers.Wallet(this.importKeyEditbox.string)
		    this.setWallet(wallet)
			this.setUserInfo()
			this.showAddress()
		}
		catch (err) {
			cc.log(err)
		}
		
    },
	
	async setUserInfo () {
		
		const provider = new ethers.providers.JsonRpcProvider("https://exchaintestrpc.okex.org");
		const rogueLandContract = new ethers.Contract(this.rogueLandAddress, this.rogueLandJson.json.abi, provider)
        const punkInfo = await rogueLandContract.getPlayerInfo(this.address)
		if (punkInfo.id > 0) {
			this.label.string = "Welcome, " + punkInfo.name
			let remoteUrl = "https://www.losernft.org"+punkInfo.uri.slice(15)
			cc.sys.localStorage.setItem('myPunk', JSON.stringify({id: punkInfo.id.toString(), name: punkInfo.name, uri: remoteUrl}));
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
			cc.log("you are a visitor")
			cc.sys.localStorage.setItem('myPunk', JSON.stringify({id: 0})
		}
		
    },
	
	onLoad () {
		
		let walletData = JSON.parse(cc.sys.localStorage.getItem('wallet'));
		if (!walletData) {
			const wallet = new ethers.Wallet.createRandom()
		    this.setWallet(wallet)
		}
		else {
			this.address = walletData.address
		    this.privateKey = walletData.privateKey
		}
		
		this.showAddress()
		this.setUserInfo()
    },

    start () {

    }
}
