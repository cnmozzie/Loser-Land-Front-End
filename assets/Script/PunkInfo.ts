const {ccclass, property} = cc._decorator;

@ccclass
export default class PunkInfo extends cc.Component {
	
	id: number = 0;
	gold: number = 0;
	userName: string = 'vistor';
	
	@property(cc.Label)
    label: cc.Label = null;
	
	lastPunk (e, msg) {
		cc.log('lastPunk')
    },
	
	nextPunk (e, msg) {
		cc.log('nextPunk')
    },
	
	setLabel () {
		const lang = cc.sys.localStorage.getItem('lang')
		if (lang === 'zh') {
			this.label.string = `ID: ${this.id-1} \n昵称: ${this.userName} \n金币: ${this.gold}`
		}
		else {
			this.label.string = `ID: ${this.id-1} \nName: ${this.userName} \nGold: ${this.gold}`
		}
    },
	
	setId (id) {
		this.id = id
		this.setLabel()
    },
	
	setInfo (info) {
		if (info.name == "") {
			this.userName = info.address.slice(0, 6)
		}
		else {
			this.userName = info.name
		}
		this.gold = info.gold
		this.setLabel()
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
