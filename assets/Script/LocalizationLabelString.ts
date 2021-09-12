const {ccclass, property} = cc._decorator;

@ccclass
export default class LocalizationLabelString extends cc.Component {
	
	@property()
    public zh: string = '';

    @property()
    public en: string = '';
	
	private label: cc.Label = null;
	
	onLoad () {
        const lang = cc.sys.localStorage.getItem('lang')
		this.label = this.node.getComponent(cc.Label);
		if (lang === 'zh') {
			this.label.string = this.zh
		}
		else {
			this.label.string = this.en
		}
    },

    start () {
        
    }
}
