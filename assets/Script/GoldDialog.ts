const {ccclass, property} = cc._decorator;

@ccclass
export default class GoldDialog extends cc.Component {
	
	kind: number = 0;
	
	@property(cc.Label)
    label: cc.Label = null;
	
	@property(cc.Label)
    kindLabel: cc.Label = null;
	
	@property(cc.Button)
    buildButton: cc.Button = null;
	
	@property(cc.Button)
    buyButton: cc.Button = null;
	
	@property(cc.Button)
    fishButton: cc.Button = null;
	
	kindName(n) {
	    const lang = cc.sys.localStorage.getItem('lang')
		if (n>=3 && n<6) {
			this.buildButton.interactable = true
			return lang === 'zh'? `${n%3+1}级矿场`: `Level ${n%3+1} Mine`
		}
		else if (n>=6 && n<9) {
			this.buildButton.interactable = true
			return lang === 'zh'? `${n%3+1}级渔场`: `Level ${n%3+1} Fishery`
		}
		else if (n>=9 && n<12) {
			this.buildButton.interactable = true
			return lang === 'zh'? `${n%3+1}级房屋`: `Level ${n%3+1} House`
		}
		else {
			this.buildButton.interactable = false
			return lang === 'zh'? '空地': 'Open Space'
		}
	},
	
	setLabel (info) {
		const lang = cc.sys.localStorage.getItem('lang')
		const kind = info.land.builtTime > info.block? info.land.oldBuilding : info.land.newBuilding;
		const hp = info.land.builtTime > info.block? info.land.oldHP : info.land.newHP;
		let time =  Math.ceil((info.land.builtTime-info.block)/500)
		let text;
		const x = info.pos.x;
		const y = info.pos.y;
		if (lang === 'zh') {
			text = `坐标：(${x}, ${y}) \t 剩余：${hp} \n地主：${info.land.owner.slice(0, 6)}`
			if (time > 0) {
				text += `\n正在建造：${this.kindName(info.land.newBuilding)}（还需${time}回合）`
			}
		}
		else {
			text = `Coordinate：(${x}, ${y})\tLeft:${hp}\nOwner：${info.land.owner.slice(0, 6)}`
			if (time > 0) {
				text += `\nBuilding：${this.kindName(info.land.newBuilding)} (in ${time} rounds)`
			}
		}
		this.label.string = text
		this.kind = kind
		this.kindLabel.string = this.kindName(this.kind)
		cc.log(this.kind)
		if (kind >= 6 && kind < 9) {
			this.fishButton.node.zIndex = 2
		}
		else if (info.land.owner == '0x0000000000000000000000000000000000000000') {
			if ((x**2>100 || y**2>100) && x**2<625 && y**2<625) {
				this.buyButton.interactable = true
			}
		}
		else if (info.player.toLowerCase() == info.land.owner.toLowerCase()) {
			this.buildButton.node.zIndex = 3
		}
    },
	
	close() {
	    cc.log('cancle')
		this.node.destroy()
	},
	
	buy() {
	    cc.log('buy')
		this.buyButton.interactable = false
		this.game.buyLand()
	},
	
	fish() {
	    cc.log('fish')
		this.fishButton.interactable = false
		this.game.fish()
	},
	
	build() {
	    cc.log('build')
		this.buildButton.interactable = false
		this.game.build(this.kind%12)
	},
	
	inc_n() {
		if (this.buildButton.node.zIndex == 3) {
			this.kind ++
			if (this.kind%12 == 2) this.kind ++
		    this.kindLabel.string = this.kindName(this.kind%12)
		}
	},
	
	dec_n() {
		if (this.buildButton.node.zIndex == 3) {
			this.kind += 11
			if (this.kind%12 == 2) this.kind --
		    this.kindLabel.string = this.kindName(this.kind%12)
		}
	},
	
	onLoad () {
		this.buyButton.interactable = false
    },

    start () {
        
    }
}