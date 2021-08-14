const {ccclass, property} = cc._decorator;
import {ethers} from 'ethers/dist/ethers.umd.min.js';

@ccclass
export default class Game extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;
	
	@property(cc.Button)
    button: cc.Button = null;

    @property
    text: string = 'hello';
	
	@property(cc.Prefab)
    grassPrefab: cc.Prefab = null;
	
	// Player 节点，用于获取主角的位置
	@property(cc.Node)
    player: cc.Node = null;
	
	// Camera 节点，用于获取摄像头的位置
	@property(cc.Node)
    camera: cc.Node = null;
	
	spawnNewGrass (x, y) {
        // 使用给定的模板在场景中生成一个新节点
        var newGrass = cc.instantiate(this.grassPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newGrass);
        // 设置草地的位置
        newGrass.setPosition(cc.v2(x,y));
		// 在草地脚本组件上保存 Player 对象的引用
        newGrass.getComponent('Grass').player = this.player;
    },
	
	async gainScore () {
		const provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s2.binance.org:8545/");
		this.text = await provider.getBlockNumber()
		this.label.string = this.text;
        cc.log(this.text)
    },
	
	onClick (e, msg) {
        cc.log(msg);
		cc.log(this.camera.x)
    },
	
	
    update(dt) {
		this.camera.x = this.player.x
		this.camera.y = this.player.y
	}
	
	onLoad () {
        this.label.node.zIndex = 1;
		this.button.node.zIndex = 1;
		// 生成草地
        let windowSize=cc.view.getVisibleSize();
        cc.log("width="+windowSize.width+",height="+windowSize.height);
		for (let i=-7; i<=7; i++) {
			for (let j=-5; j<=5; j++) {
				this.spawnNewGrass(i*64, j*64);
			}
		}
		
    },

    start () {
        // init logic
        this.label.string = this.text;
		
		this.gainScore();
    }
}
