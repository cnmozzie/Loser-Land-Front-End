const {ccclass, property} = cc._decorator;
import {ethers} from 'ethers/dist/ethers.umd.min.js';

enum Status {Schedule, Committing, Committed, Confirmmed};
enum Action {SitStill, GoLeft, GoRight, GoUp, GoDown, GoLeftUp, GoLeftDown, GoRightUp, GoRightDown};

@ccclass
export default class Game extends cc.Component {
	
	id: number = 0;
	t: number = 0;
	currentSchedule: number = 0;
	toCommit: number = 0;
	mode: string = "view";
	rogueLandAddress: string = '0xE9f1e59d52d66a0fF973B85f8f4744350c15E924';
	rogueLandContract: any = null;
	provider: any = null;
	wallet: any = null;
	numberList: any[] = [];
	
	@property(cc.Label)
    label: cc.Label = null;
	
	@property(cc.Button)
    accountButton: cc.Button = null;
	
	@property(cc.Button)
    modeButton: cc.Button = null;

    @property
    text: string = 'hello';
	
	@property(cc.Prefab)
    grassPrefab: cc.Prefab = null;
	
	@property(cc.Prefab)
    chestPrefab: cc.Prefab = null;
	
	@property(cc.Prefab)
    numberPrefab: cc.Prefab = null;
	
	@property(cc.JsonAsset)
    rogueLandJson: cc.JsonAsset = null;
	
	// Player 节点，用于获取主角的位置
	@property(cc.Node)
    player: cc.Node = null;
	
	// Camera 节点，用于获取摄像头的位置
	@property(cc.Node)
    camera: cc.Node = null;
	
	spawnNewGrass (x, y, action) {
        // 使用给定的模板在场景中生成一个新节点
        var newGrass = cc.instantiate(this.grassPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newGrass);
        // 设置草地的位置
        newGrass.setPosition(cc.v2(x,y));
		// 在草地脚本组件上保存 Camera 对象的引用
        newGrass.getComponent('Grass').camera = this.camera;
    },
	
	spawnNewChest (x, y) {
        // 使用给定的模板在场景中生成一个新节点
        var newChest = cc.instantiate(this.chestPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newChest);
		newChest.zIndex = 1;
        // 设置宝箱的位置
        newChest.setPosition(cc.v2(x,y));
    },
	
	spawnNewNumber (x, y, action) {
        // 使用给定的模板在场景中生成一个新节点
        var newNumber = cc.instantiate(this.numberPrefab)
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newNumber)
		newNumber.zIndex = 1
        // 设置数字的位置
        newNumber.setPosition(cc.v2(x,y))
		let color = new cc.Color(242,129,27)
		newNumber.color = color
		newNumber.getComponent(cc.Label).string = Number(this.t) + 1
		
		this.numberList[this.t-this.currentSchedule] = {time: Number(this.t)+1, action: action, status: Status.Schedule, number: newNumber}
    },
	
	setLabel (t, x, y) {
		this.text = `${this.mode}  T${t} (${x}, ${y})`
		this.label.string = this.text;
	}
	
	async commit () {
        let action = this.numberList[this.toCommit-this.currentSchedule]
		action.status = Status.Committing
		const rogueLandSigner = this.rogueLandContract.connect(this.wallet)
		await rogueLandSigner.scheduleAction(this.id, action.action)
		action.status = Status.Committed
		this.toCommit ++;
		cc.log('commit')
    },
	
	async loadPunk () {
        let myPunk = JSON.parse(cc.sys.localStorage.getItem('myPunk'))
		if (myPunk) {
		  this.id = myPunk.id
		  let sprite = this.node.getChildByName('Player').getComponent(cc.Sprite)
	      cc.assetManager.loadRemote<cc.Texture2D>(myPunk.uri, { ext: '.png', cacheEnabled: true }, function (err, pic) {
            if (err) {
              cc.log('LoadNetImg load error,error:' + err)
              return
            }
            sprite.spriteFrame = new cc.SpriteFrame(pic)
          });
		}
    },
	
	async getStatus () {
		let walletData = JSON.parse(cc.sys.localStorage.getItem('wallet'))
		const walletPrivateKey = new ethers.Wallet(walletData.privateKey)
		this.provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s2.binance.org:8545/")
		this.wallet = walletPrivateKey.connect(this.provider)
		this.rogueLandContract = new ethers.Contract(this.rogueLandAddress, this.rogueLandJson.json.abi, this.provider)
		let balance = await this.wallet.getBalance();
		cc.log(balance/1e18)
		if (this.id > 0) {
			this.goViewMode()
		}
		else {
			const currentTime = await this.rogueLandContract.getCurrentTime()
			this.t = currentTime
		    //this.setLabel(this.t, 0, 0)
		}
    },
	
	loadAccount (e, msg) {
		cc.director.loadScene("user");
    },
	
	async goViewMode() {
		const statusInfo = await this.rogueLandContract.getCurrentStatus(this.id)
		this.mode = "view"
		this.t = statusInfo.t
		this.player.x = statusInfo.x * 64
		this.player.y = statusInfo.y * 64
	}
	
	async goScheduleMode() {
		const statusInfo = await this.rogueLandContract.getScheduleInfo(this.id)
		this.mode = "schedule"
		this.t = statusInfo.t
		this.currentSchedule = statusInfo.t
		this.toCommit = statusInfo.t
		this.player.x = statusInfo.x * 64
		this.player.y = statusInfo.y * 64
	}
	
	switchMode (e, msg) {
        if (this.mode == "view") {
			this.goScheduleMode()
		}
		else if (this.mode == "schedule") {
			this.goViewMode()
		}
    },
	
	
    update(dt) {
		if (Math.abs(this.player.x) < 9*64) {
			this.camera.x = this.player.x
		}
		if (Math.abs(this.player.y) < 12*64) {
			this.camera.y = this.player.y
		}
		this.setLabel(this.t, this.player.x/64, this.player.y/64)
	}
	
	onKeyDown (event) {
		// set a flag when key pressed
        
		switch(event.keyCode) {
            case cc.macro.KEY.a:
			case cc.macro.KEY.left:
			    if (this.mode == "schedule") {
			      this.spawnNewNumber(this.player.x, this.player.y, Action.GoLeft)
			      this.t ++;
		        }
				this.player.getComponent('Player').moveLeft()
                break;
            case cc.macro.KEY.d:
			case cc.macro.KEY.right:
			    if (this.mode == "schedule") {
			      this.spawnNewNumber(this.player.x, this.player.y, Action.GoRight)
			      this.t ++;
		        }
                this.player.getComponent('Player').moveRight()
                break;
		    case cc.macro.KEY.s:
			case cc.macro.KEY.down:
                if (this.mode == "schedule") {
			      this.spawnNewNumber(this.player.x, this.player.y, Action.GoDown)
			      this.t ++;
		        }
				this.player.getComponent('Player').moveDown()
                break;
            case cc.macro.KEY.w:
			case cc.macro.KEY.up:
                if (this.mode == "schedule") {
			      this.spawnNewNumber(this.player.x, this.player.y, Action.GoUp)
			      this.t ++;
		        }
				this.player.getComponent('Player').moveUp()
                break;
        }
    },
	
	onLoad () {
		this.label.node.zIndex = 1;
		this.accountButton.node.zIndex = 1;
		this.modeButton.node.zIndex = 1;
		// 生成草地
        let windowSize=cc.view.getVisibleSize();
        cc.log("width="+windowSize.width+",height="+windowSize.height);
		for (let i=-7; i<=7; i++) {
			for (let j=-5; j<=5; j++) {
				this.spawnNewGrass(i*64, j*64);
			}
		}
		this.spawnNewChest(64, 64)
		// 初始化键盘输入监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },

    start () {
        // init logic
        this.label.string = this.text
		this.loadPunk()
		this.getStatus()
    }
}
