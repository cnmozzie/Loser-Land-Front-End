const {ccclass, property} = cc._decorator;
import {ethers} from 'ethers/dist/ethers.umd.min.js';

@ccclass
export default class User extends cc.Component {

	address: string = '';
	privateKey: string = '';

	@property(cc.EditBox)
    showAddressEditbox: cc.EditBox = null;
	
	@property(cc.EditBox)
    showKeyEditbox: cc.EditBox = null;
	
	@property(cc.EditBox)
    importKeyEditbox: cc.EditBox = null;
	
	setWallet (wallet) {
		const walletData = {address: wallet.address, privateKey: wallet.privateKey}
		cc.sys.localStorage.setItem('wallet', JSON.stringify(walletData));
		this.address = walletData.address
		this.privateKey = walletData.privateKey
		this.showAddress()
    },
	
	newAccount () {
		let firstWallet = JSON.parse(cc.sys.localStorage.getItem('first_wallet'));
		this.setWallet(firstWallet)
    },
	
	showAddress () {
		this.showAddressEditbox.string = this.address
		this.showKeyEditbox.string = ""
		this.importKeyEditbox.string = ""
    },
	
	showPrivateKey () {
		this.showKeyEditbox.string = this.privateKey
    },
	
	importPrivateKey () {
		try {
			const wallet = new ethers.Wallet(this.importKeyEditbox.string)
		    this.setWallet(wallet)
		}
		catch (err) {
			cc.log(err)
		}
    },
	
	close() {
	    cc.log('close')
		this.node.destroy()
	}
	
	onLoad () {
		
		let walletData = JSON.parse(cc.sys.localStorage.getItem('wallet'));
		this.address = walletData.address
		this.privateKey = walletData.privateKey
		
		let firstWallet = JSON.parse(cc.sys.localStorage.getItem('first_wallet'));
		if (!firstWallet) {
			cc.sys.localStorage.setItem('first_wallet', JSON.stringify(walletData));
		}
		
		this.showAddress()
    },

    start () {

    }
}
