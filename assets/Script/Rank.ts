const {ccclass, property} = cc._decorator;
import {ethers} from 'ethers/dist/ethers.umd.min.js';

@ccclass
export default class Rank extends cc.Component {
	
	sortGolds: any[] = [];
	names: any[] = ["visitor", "visitor", "visitor", "visitor", "visitor"];
	
	@property(cc.Label)
    idLabel: cc.Label = null;
	
	@property(cc.Label)
    goldLabel: cc.Label = null;
	
	@property(cc.Label)
    nameLabel: cc.Label = null;
	
	
	setLabel () {
		this.idLabel.string = `ID\n${this.sortGolds[0].id}\n${this.sortGolds[1].id}\n${this.sortGolds[2].id}\n${this.sortGolds[3].id}\n${this.sortGolds[4].id}`
		this.goldLabel.string = `GOLD\n${this.sortGolds[0].gold}\n${this.sortGolds[1].gold}\n${this.sortGolds[2].gold}\n${this.sortGolds[3].gold}\n${this.sortGolds[4].gold}`
		this.nameLabel.string = `Name\n${this.names[0]}\n${this.names[1]}\n${this.names[2]}\n${this.names[3]}\n${this.names[4]}`
    },
	
	async setGolds (golds) {
        let unsortGolds = [];
		const invalid = ethers.utils.formatEther(golds[0])
		for (let i=1; i<667; i++) {
			let temp = ethers.utils.formatEther(golds[i])
			if (temp < invalid) {
				unsortGolds.push({id: i, gold: temp})
			}
		}
		this.sortGolds = unsortGolds.sort(function(a, b){return b.gold - a.gold});
		this.setLabel()
		for (let i=0; i<5; i++) {
			let name = await this.welcome.getPunkInfo(this.sortGolds[i].id+1)
			this.names[i] = name
			this.setLabel()
		}
    },
	
	
	cancle (e, msg) {
        cc.log('quit');
		this.node.destroy()
    },

	onLoad () {
		
    },

    start () {

    }
}
