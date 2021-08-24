const {ccclass, property} = cc._decorator;
import {ethers} from 'ethers/dist/ethers.umd.min.js';

@ccclass
export default class User extends cc.Component {

	address: string = '';
	privateKey: string = '';
	rogueLandAddress: string = '0x07de2043d322b48113dd04e7e2eec77232acf3e8';
	
	@property(cc.Label)
    label: cc.Label = null;
	
	@property(cc.EditBox)
    editbox: cc.EditBox = null;
	
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
	
	showAddress () {
		this.editbox.string = this.address
    },
	
	showPrivateKey () {
		this.editbox.string = this.privateKey
    },
	
	importPrivateKey () {
		try {
			const wallet = new ethers.Wallet(this.editbox.string)
		    this.setWallet(wallet)
			this.setUserInfo()
		}
		catch (err) {
			cc.log(err)
		}
		
    },
	
	async setUserInfo () {
		cc.sys.localStorage.removeItem('myPunk');
		const provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s2.binance.org:8545/");
		const rogueLandContract = new ethers.Contract(this.rogueLandAddress, this.rogueLandJson.json.abi, provider)
        const punkId = await rogueLandContract.getAuthorizedId(this.address)
		if (punkId > 0) {
			const punkInfo = await rogueLandContract.getPlayerInfo(this.address)
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
