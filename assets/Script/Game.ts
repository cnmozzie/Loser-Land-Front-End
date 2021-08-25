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
	balance: number = 0;
	mode: string = "view";
	hasEvents: bool = false;
	rogueLandAddress: string = '0x0E66931d3c7bd5cCC9991667cBBC673de21122fF';
	rogueLandContract: any = null;
	provider: any = null;
	wallet: any = null;
	numberList: any[] = [];
	punks: any[] = [];
	chests: any[] = [];
	
	@property(cc.Label)
    label: cc.Label = null;
	
	@property(cc.Button)
    accountButton: cc.Button = null;
	
	@property(cc.Button)
    modeButton: cc.Button = null;
	
	@property(cc.Button)
    commitButton: cc.Button = null;
	
	@property(cc.Button)
    pickButton: cc.Button = null;

    @property
    text: string = 'hello';
	
	@property(cc.Prefab)
    grassPrefab: cc.Prefab = null;
	
	@property(cc.Prefab)
    chestPrefab: cc.Prefab = null;
	
	@property(cc.Prefab)
    numberPrefab: cc.Prefab = null;
	
	@property(cc.Prefab)
    punkPrefab: cc.Prefab = null;
	
	@property(cc.JsonAsset)
    rogueLandJson: cc.JsonAsset = null;
	
	@property(cc.JsonAsset)
    loserpunkJson: cc.JsonAsset = null;
	
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
		newChest.zIndex = 2;
        // 设置宝箱的位置
        newChest.setPosition(cc.v2(x,y));
		
		this.chests.push(newChest)
    },
	
	spawnNewPunk (x, y, id) {
        cc.log(x, y, id.toString())
		// 使用给定的模板在场景中生成一个新节点
        var newPunk = cc.instantiate(this.punkPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newPunk);
		newPunk.zIndex = 2;
        // 设置punk的位置
        newPunk.setPosition(cc.v2(x,y));
		this.punks.push(newPunk)
		
		if (id > 0) {
			//console.log(this.loserpunkJson.json[id-1])
			let remoteUrl = "https://www.losernft.org/ipfs/"+this.loserpunkJson.json[id-1].hash
			let sprite = newPunk.getComponent(cc.Sprite)
			cc.assetManager.loadRemote<cc.Texture2D>(remoteUrl, { ext: '.png', cacheEnabled: true }, function (err, pic) {
              if (err) {
                cc.log('LoadNetImg load error,error:' + err)
                return
              }
              sprite.spriteFrame = new cc.SpriteFrame(pic)
            });
		}
    },
	
	spawnNewNumber (x, y, action) {
        // 使用给定的模板在场景中生成一个新节点
        var newNumber = cc.instantiate(this.numberPrefab)
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newNumber)
		newNumber.zIndex = 2
        // 设置数字的位置
        newNumber.setPosition(cc.v2(x,y))
		let color = new cc.Color(242,129,27)
		newNumber.color = color
		// 增加1回合
		this.t ++
		newNumber.getComponent(cc.Label).string = this.t
		this.numberList[this.t-this.currentSchedule-1] = {time: this.t, action: action, status: Status.Schedule, number: newNumber}
		// 更新地图
		this.updateMap()
    },
	
	setLabel (t, x, y) {
		if (this.mode == 'view') {
			this.text = `View Mode  T${t} (${x}, ${y})`
		}
		else {
			this.text = `${this.balance/1e18}BNB  T${t} (${x}, ${y})`
		}
		this.label.string = this.text;
	}
	
	async commit () {
        let action = this.numberList[this.toCommit-this.currentSchedule]
		action.status = Status.Committing
		const rogueLandSigner = this.rogueLandContract.connect(this.wallet)
		const tx = await rogueLandSigner.scheduleAction(this.id, action.action, {gasLimit: 300000})
		action.status = Status.Committed
		action.number.destroy()
		this.toCommit ++;
		this.balance = this.balance - tx.gasPrice*tx.gasLimit
		cc.log(tx.gasPrice/1e9*tx.gasLimit)
    },
	
	async pick () {
        const rogueLandSigner = this.rogueLandContract.connect(this.wallet)
		const tx = await rogueLandSigner.getGold(this.player.x/64, this.player.y/64, {gasLimit: 150000})
		this.balance = this.balance - tx.gasPrice*tx.gasLimit
		cc.log(tx.gasPrice/1e9*tx.gasLimit)
		this.getEvent()
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
		if (this.id > 0) {
			this.getEvent()
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
	
	async updateMap () {
		let x1 = this.player.x/64 - 7
		let x2 = this.player.x/64 + 7
		let y1 = this.player.y/64 - 5
		let y2 = this.player.y/64 + 5
		const map = await this.rogueLandContract.getEvents(x1, y1, x2, y2, this.t)
		while (this.punks.length > 0) {
			let node = this.punks.pop()
			node.destroy();
		}
		while (this.chests.length > 0) {
			let node = this.chests.pop()
			node.destroy();
		}
		let i = 0
        for (let x=x1; x<=x2; x++) {
          for (let y=y1; y<=y2; y++) {
            if (map[i].movingPunk != 0 && !(this.mode == "schedule" && map[i].movingPunk == this.id)) {
			  //cc.log(map[i].movingPunk, x, y)
			  this.spawnNewPunk (x*64, y*64, map[i].movingPunk)
            }
			if (map[i].monster > 0) {
			  //cc.log(map[i].monster/1e18, x, y)
			  this.spawnNewChest (x*64, y*64)
            }
            i ++;
          }
        }
		//cc.log(this.punks)
	}
	
	async getEvent() {
		const statusInfo = await this.rogueLandContract.getEvent(this.id)
		//cc.log(statusInfo)
		if (statusInfo.t != 0) {
			this.t = statusInfo.t
		    this.player.zIndex = 3
		    this.player.x = statusInfo.x * 64
		    this.player.y = statusInfo.y * 64
		    this.updateMap()
			this.hasEvents = true
			this.pickButton.node.zIndex = 2
		}
		else {
			this.hasEvents = false
			this.pickButton.node.zIndex = 0
			this.goViewMode()
		}
	}
	
	async goViewMode() {
		if (this.hasEvents) {
			this.getEvent()
		}
		else {
			const statusInfo = await this.rogueLandContract.getCurrentStatus(this.id)
		    this.mode = "view"
			this.t = statusInfo.t
		    this.player.zIndex = 0
		    this.player.x = statusInfo.x * 64
		    this.player.y = statusInfo.y * 64
		    this.updateMap()
		}
	}
	
	async goScheduleMode() {
		const statusInfo = await this.rogueLandContract.getScheduleInfo(this.id)
		this.mode = "schedule"
		this.t = statusInfo.t
		this.player.zIndex = 3
		this.currentSchedule = statusInfo.t
		this.toCommit = statusInfo.t
		this.player.x = statusInfo.x * 64
		this.player.y = statusInfo.y * 64
		this.updateMap()
		this.balance = await this.wallet.getBalance();
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
		// 任何都会导致punk无法拾取lowb
        this.pickButton.node.zIndex = 0
		switch(event.keyCode) {
            case cc.macro.KEY.h:
			case cc.macro.KEY.left:
			    if (this.mode == "schedule") {
			      this.spawnNewNumber(this.player.x, this.player.y, Action.GoLeft)
		        }
				this.player.getComponent('Player').moveWest()
                break;
            case cc.macro.KEY.l:
			case cc.macro.KEY.right:
			    if (this.mode == "schedule") {
			      this.spawnNewNumber(this.player.x, this.player.y, Action.GoRight)
		        }
                this.player.getComponent('Player').moveEast()
                break;
		    case cc.macro.KEY.k:
			case cc.macro.KEY.down:
                if (this.mode == "schedule") {
			      this.spawnNewNumber(this.player.x, this.player.y, Action.GoDown)
		        }
				this.player.getComponent('Player').moveSouth()
                break;
            case cc.macro.KEY.j:
			case cc.macro.KEY.up:
                if (this.mode == "schedule") {
			      this.spawnNewNumber(this.player.x, this.player.y, Action.GoUp)
		        }
				this.player.getComponent('Player').moveNorth()
                break;
			case cc.macro.KEY.y:
			    if (this.mode == "schedule") {
			      this.spawnNewNumber(this.player.x, this.player.y, Action.GoLeftUp)
		        }
				this.player.getComponent('Player').moveNorthWest()
                break;
            case cc.macro.KEY.n:
			    if (this.mode == "schedule") {
			      this.spawnNewNumber(this.player.x, this.player.y, Action.GoRightDown)
		        }
                this.player.getComponent('Player').moveSouthEast()
                break;
		    case cc.macro.KEY.u:
                if (this.mode == "schedule") {
			      this.spawnNewNumber(this.player.x, this.player.y, Action.GoRightUp)
		        }
				this.player.getComponent('Player').moveNorthEast()
                break;
            case cc.macro.KEY.b:
                if (this.mode == "schedule") {
			      this.spawnNewNumber(this.player.x, this.player.y, Action.GoLeftDown)
		        }
				this.player.getComponent('Player').moveSouthWest()
                break;
			case cc.macro.KEY['+']:
                if (this.mode == "view") {
					this.t ++
					this.updateMap()
				}
                break;
            case cc.macro.KEY['-']:
                if (this.mode == "view" && this.t > 0) {
					this.t --
					this.updateMap()
				}
                break;
			case cc.macro.KEY['.']:
                if (this.mode == "view") {
					this.updateMap()
				}
                break;
        }
    },
	
	onLoad () {
		this.label.node.zIndex = 2;
		this.accountButton.node.zIndex = 2;
		this.modeButton.node.zIndex = 2;
		this.commitButton.node.zIndex = 2;
		// 生成草地
        let windowSize=cc.view.getVisibleSize();
        cc.log("width="+windowSize.width+",height="+windowSize.height);
		for (let i=-7; i<=7; i++) {
			for (let j=-5; j<=5; j++) {
				this.spawnNewGrass(i*64, j*64);
			}
		}
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
