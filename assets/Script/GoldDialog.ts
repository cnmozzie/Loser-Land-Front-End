const {ccclass, property} = cc._decorator;

@ccclass
export default class GoldDialog extends cc.Component {
	
	@property(cc.Label)
    label: cc.Label = null;
	
	setLabel (info) {
		const lang = cc.sys.localStorage.getItem('lang')
		let text;
		if (lang === 'zh') {
			text = `一个装有${info.amount}金币宝箱，\n`
			if (info.time <= 0) {
				text = text + `${info.punkNumber}只朋克正在打开它`
			}
			else if (info.punkNumber > 0) {
				text = text + `${info.time}回合后${info.punkNumber}只朋克会打开它`
			}
			else {
				text = text + `目前没有朋克想去打开它`
			}
		}
		else {
			text = `A chest with ${info.amount} gold, \n`
			if (info.time <= 0 && info.punkNumber > 0) {
				text = text + `${info.punkNumber} punks are looting it now...`
			}
			else if (info.punkNumber > 0) {
				text = text + `${info.punkNumber} punk will loot it ${info.time} rounds later`
			}
			else {
				text = text + `no punk want to loot it for now`
			}
		}
		this.label.string = text
    },
	
	close() {
	    cc.log('cancle')
		this.node.destroy()
	}
	
	onLoad () {
        
    },

    start () {
        
    }
}
