const {ccclass, property} = cc._decorator;
import {ethers} from 'ethers/dist/ethers.umd.min.js';

@ccclass
export default class User extends cc.Component {

	address: string = '';
	
	privateKey: string = '';
	
	rogueLandAddress: string = '0xb96Dcc78667C9E76b4459abE6771cC3172663471';
	
	@property(cc.EditBox)
    editbox: cc.EditBox = null;
	
	@property(cc.JsonAsset)
    rogueLandJson: cc.JsonAsset = null;
	
	startGame (e, msg) {
        cc.log(msg);
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
		}
		catch (err) {
			cc.log(err)
		}
		
    },
	
	async gainScore () {
		const provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s2.binance.org:8545/");
		const rogueLandContract = new ethers.Contract(this.rogueLandAddress, this.rogueLandJson.json.abi, provider)
        const punkId = await rogueLandContract.getAuthorizedId(this.address)
		if (punkId >= 0) {
			const punkInfo = await rogueLandContract.getPunkInfo(this.address)
			cc.log(punkInfo)
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
		this.gainScore()
    },

    start () {

    }
}
