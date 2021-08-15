const {ccclass, property} = cc._decorator;
import {ethers} from 'ethers/dist/ethers.umd.min.js';

@ccclass
export default class User extends cc.Component {

	address: string = '';
	
	privateKey: string = '';
	
	@property(cc.EditBox)
    editbox: cc.EditBox = null;
	
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
    },

    start () {

    }
}
