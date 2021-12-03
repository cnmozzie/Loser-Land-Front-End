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
	
	kindName(n) {
	    const lang = cc.sys.localStorage.getItem('lang')
		if (n == 0) {
			this.buildButton.interactable = false
			return lang === 'zh'? '空地': 'Open Space'
		}
		else if (n == 1) {
			this.buildButton.interactable = true
			return lang === 'zh'? '房屋': 'House'
		}
		else {
			this.buildButton.interactable = true
			return lang === 'zh'? `${n-1}级矿场`: `Level ${n-1} Mine`
		}
	},
	
	setLabel (info) {
		const lang = cc.sys.localStorage.getItem('lang')
		const kind = info.land.builtTime > info.block? info.land.oldBuilding : info.land.newBuilding;
		let time =  Math.ceil((info.land.builtTime-info.block)/500)
		let text;
		const x = info.pos.x;
		const y = info.pos.y;
		if (lang === 'zh') {
			text = `坐标：(${x}, ${y})\n地主：${info.land.owner.slice(0, 6)}`
			if (time > 0) {
				text += `\n正在建造：${this.kindName(info.land.newBuilding)}（还需${time}回合）`
			}
		}
		else {
			text = `Coordinate：(${x}, ${y})\nOwner：${info.land.owner.slice(0, 6)}`
			if (time > 0) {
				text += `\nBuilding：${this.kindName(info.land.newBuilding)} (in ${time} rounds)`
			}
		}
		this.label.string = text
		this.kind = kind
		this.kindLabel.string = this.kindName(this.kind)
		if (info.land.owner == '0x0000000000000000000000000000000000000000') {
			cc.log('no owner')
			if ((x**2>100 || y**2>100) && x**2<625 && y**2<625) {
				this.buyButton.interactable = true
			}
		}
		else if (info.player.toLowerCase() == info.land.owner.toLowerCase()) {
			this.buildButton.node.zIndex = 2
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
	
	build() {
	    cc.log('build')
		this.buildButton.interactable = false
		this.game.build(this.kind%9-1)
	},
	
	inc_n() {
	    if (this.buildButton.node.zIndex == 2) {
			this.kind ++
		    this.kindLabel.string = this.kindName(this.kind%9)
		}
	},
	
	dec_n() {
	    if (this.buildButton.node.zIndex == 2) {
			this.kind += 8
		    this.kindLabel.string = this.kindName(this.kind%9)
		}
	},
	
	onLoad () {
		this.buyButton.interactable = false
    },

    start () {
        
    }
}