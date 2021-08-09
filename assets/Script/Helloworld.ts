const {ccclass, property} = cc._decorator;
import {ethers} from 'ethers/dist/ethers.umd.min.js';

@ccclass
export default class Helloworld extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';
	
	async gainScore () {
		const provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s2.binance.org:8545/");
		let a = await provider.getBlockNumber()
        cc.log(a)
    },

    start () {
        // init logic
        this.label.string = this.text;
		
		this.gainScore();
    }
}
