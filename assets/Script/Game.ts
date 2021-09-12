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
	gold: number = 0;
	minimapSize: number = 51;
	mapSize: number = 51;
	playerAddress: string = "";
	mode: string = "view";
	hasEvents: bool = false;
	isBusy: bool = false;
	rogueLandAddress: string = '0x7066F9F9C8130405C32Ae1045AeFb4B45b11C30f';
	rogueLandContract: any = null;
	provider: any = null;
	wallet: any = null;
	playerInfo: any = {x: 0, y: 0, t: 0};
	toPick: any = {x: 0, y: 0};
	minimapCenter: any = {x: 0, y: 0};
	timeList: any[] = [];
	numberList: any[] = [];
	punks: any[] = [];
	chests: any[] = [];
	tiledLayer : cc.TiledLayer = null;
	
	@property(cc.Label)
    label: cc.Label = null;
	
	@property(cc.Label)
    switchLabel: cc.Label = null;
	
	@property(cc.Button)
    modeButton: cc.Button = null;
	
	@property(cc.Button)
    swapButton: cc.Button = null;
	
	@property(cc.Button)
    pickButton: cc.Button = null;
	
	@property(cc.TiledMap)
    smallMap: cc.TiledMap = null;

    @property
    text: string = 'hello';
	
	@property(cc.Prefab)
    grassPrefab: cc.Prefab = null;
	
	@property(cc.Prefab)
    crossPrefab: cc.Prefab = null;
	
	@property(cc.Prefab)
    chestPrefab: cc.Prefab = null;
	
	@property(cc.Prefab)
    numberPrefab: cc.Prefab = null;
	
	@property(cc.Prefab)
    punkPrefab: cc.Prefab = null;
	
	@property(cc.Prefab)
    putGoldPrefab: cc.Prefab = null;
	
	@property(cc.JsonAsset)
    rogueLandJson: cc.JsonAsset = null;
	
	@property(cc.JsonAsset)
    loserpunkJson: cc.JsonAsset = null;
	
	// Player 节点，用于获取主角的位置
	@property(cc.Node)
    player: cc.Node = null;
	
	// 放置时间按钮
	@property(cc.Node)
    time_button_group: cc.Node = null;
	
	// 设置节点，用户交互按钮
	@property(cc.Node)
    button_group_2: cc.Node = null;
	
	// Camera 节点，用于获取摄像头的位置
	@property(cc.Node)
    camera: cc.Node = null;
	
	spawnNewDialog () {
        // 使用给定的模板在场景中生成一个新节点
        var newDialog = cc.instantiate(this.putGoldPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newDialog);
		newDialog.zIndex = 5;
        // 设置宝箱的位置
        newDialog.setPosition(cc.v2(this.player.x, this.player.y));
		// 在对话框脚本组件上保存 Game 对象的引用
        newDialog.getComponent('PutGoldDialog').game = this;
    },
	
	spawnNewGrass (x, y) {
        // 使用给定的模板在场景中生成一个新节点
        var newGrass = cc.instantiate(this.grassPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newGrass);
        // 设置草地的位置
        newGrass.setPosition(cc.v2(x,y));
		// 在草地脚本组件上保存 Camera 对象的引用
        newGrass.getComponent('Grass').camera = this.camera;
		
		//newGrass.on(cc.Node.EventType.TOUCH_START,function(t){cc.log("触摸开始");},this)
        //监听
        newGrass.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        newGrass.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        newGrass.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    },
	
	spawnNewCross (n) {
        for (let x=-n; x<=n; x++) {
			// 使用给定的模板在场景中生成一个新节点
            var newCross1 = cc.instantiate(this.crossPrefab);
            this.node.addChild(newCross1);
            newCross1.setPosition(cc.v2(x*64,n*64));
			newCross1.zIndex = 2;
			var newCross2 = cc.instantiate(this.crossPrefab);
            this.node.addChild(newCross2);
            newCross2.setPosition(cc.v2(x*64,-n*64));
			newCross2.zIndex = 2;
		}
		for (let y=-n+1; y<n; y++) {
			// 使用给定的模板在场景中生成一个新节点
            var newCross1 = cc.instantiate(this.crossPrefab);
            this.node.addChild(newCross1);
            newCross1.setPosition(cc.v2(n*64,y*64));
			newCross1.zIndex = 2;
			var newCross2 = cc.instantiate(this.crossPrefab);
            this.node.addChild(newCross2);
            newCross2.setPosition(cc.v2(-n*64,y*64));
			newCross2.zIndex = 2;
		}
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
        //cc.log(x, y, id.toString())
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
	
	async spawnNewNumber (x, y, action) {
		if (this.balance < 0) return;
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
		this.resetMinimap()
		this.updateMap()
		// 自动提交
		this.commit()
    },
	
	spawnTimeButton (x, y, t) {
		// 使用给定的模板在场景中生成一个新节点
        var newNumber = cc.instantiate(this.numberPrefab)
        // 将新增的节点添加到 Canvas 节点下面
        this.time_button_group.addChild(newNumber)
        // 设置数字的位置
        newNumber.setPosition(cc.v2(x,y))
		let color = new cc.Color(255,255,255)
		newNumber.color = color
		newNumber.getComponent(cc.Label).string = t
		newNumber.on(cc.Node.EventType.TOUCH_START, function(event){
			if (this.mode == 'view') {
				this.t = newNumber.getComponent(cc.Label).string;
			    this.resetMinimap()
				this.updateMap()
			}
			cc.log(newNumber.getComponent(cc.Label).string);
		}, this)
		this.timeList[t] = newNumber
    },
	
	changeTimeButton () {
		let t = this.t<2 ? 2 : this.t
		for (let i=0; i<5; i++) {
			this.timeList[i].getComponent(cc.Label).string = t-2+i
			if (t-2+i == this.t) {
				this.timeList[i].getComponent(cc.Label).fontSize = 30
			}
			else {
				this.timeList[i].getComponent(cc.Label).fontSize = 20
			}
			if (t-2+i <= this.playerInfo.t) {
				let color = new cc.Color(255,128,128)
				this.timeList[i].color = color
			}
			else if (t-2+i <= this.currentSchedule) {
				let color = new cc.Color(0,0,255)
				this.timeList[i].color = color
			}
			else {
				let color = new cc.Color(255,255,255)
				this.timeList[i].color = color
			}
		}
	}
	
	setLabel (t, pos) {
		const lang = cc.sys.localStorage.getItem('lang')
		
		if (this.isBusy) {
			if (lang === 'zh') {
			    this.text = "更新中..."
		    }
			else {
				this.text = "updating..."
			}			
		}
		else {
			this.text = `LOWB: ${this.gold} \n OKT ${this.balance/1e18}`
		}
		this.label.string = this.text;
	}
	
	async commit () {
		let action = this.numberList[this.toCommit-this.currentSchedule]
		action.status = Status.Committing
		const rogueLandSigner = this.rogueLandContract.connect(this.wallet)
		try {
			const tx = await rogueLandSigner.scheduleAction(this.id, action.action, {gasLimit: 300000, gasPrice: 1000000000})
		}
		catch (e) {
			cc.log(e)
		}
		action.status = Status.Committed
		action.number.destroy()
		this.toCommit ++;
		this.balance = this.balance - 300000e9
    },
	
	async swap () {
		this.swapButton.interactable = false
		const rogueLandSigner = this.rogueLandContract.connect(this.wallet)
		try {
			const tx = await rogueLandSigner.swapGold(this.playerAddress, {gasPrice: 1000000000})
		}
		catch (e) {
			cc.log(e)
		}
		this.balance = (this.balance/1e18 + 0.01)*1e18
		this.gold = this.gold - 1000
		
		if (this.gold >= 1000) {
			this.swapButton.interactable = true
		}
    },
	
	async pick () {
        if (this.balance < 0) return;
		this.pickButton.interactable = false
		const rogueLandSigner = this.rogueLandContract.connect(this.wallet)
		try {
			const tx = await rogueLandSigner.getGold(this.toPick.x, this.toPick.y, {gasLimit: 150000, gasPrice: 1000000000})
		}
		catch (e) {
			cc.log(e)
		}
		
		this.balance = this.balance - 150000e9
		//cc.log(tx.gasPrice/1e9*tx.gasLimit)
		//this.getEvent()
    },
	
	async put () {
        cc.log('put gold')
		if (this.balance < 0) return;
		const rogueLandSigner = this.rogueLandContract.connect(this.wallet)
		try {
			const tx = await rogueLandSigner.putGold({gasPrice: 1000000000})
		}
		catch (e) {
			cc.log(e)
		}
		
		//this.balance = this.balance - tx.gasPrice*tx.gasLimit
		this.gold = Number(this.gold) + 100
		//cc.log(tx.gasPrice/1e9*tx.gasLimit)
		this.updateMap()
		//this.getGoldInfo()
    },
	
	async loadPunk () {
        let myPunk = JSON.parse(cc.sys.localStorage.getItem('myPunk'))
		if (myPunk.id > 0) {
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
		else {
			cc.log("no punk")
		}
    },
	
	async getStatus () {
		let walletData = JSON.parse(cc.sys.localStorage.getItem('wallet'))
		const walletPrivateKey = new ethers.Wallet(walletData.privateKey)
		this.playerAddress = walletData.address;
		this.provider = new ethers.providers.JsonRpcProvider("https://exchaintestrpc.okex.org")
		this.wallet = walletPrivateKey.connect(this.provider)
		this.rogueLandContract = new ethers.Contract(this.rogueLandAddress, this.rogueLandJson.json.abi, this.provider)
		if (this.id > 0) {
			this.getEvent()
		}
		else {
			this.modeButton.interactable = false
			this.goViewMode()
		}
		this.mapSize = await this.rogueLandContract.mapSize()
		this.spawnNewCross(Number(this.mapSize)+1)
    },
	
	setMinimapBoundary () {
		const n = Number(this.mapSize)+1
		for (let x=-n; x<=n; x++) {
			this.setMiniMap(x, n, 2)
			this.setMiniMap(x, -n, 2)
		}
		for (let y=-n+1; y<n; y++) {
			this.setMiniMap(n, y, 2)
			this.setMiniMap(-n, y, 2)
		}
	}
	
	resetMinimap () {
		for (let i=0; i<=50; i++) {
			for (let j=0; j<=50; j++) {
				this.tiledLayer.setTileGIDAt(1, i, j, 0)
			}
		}
		this.setMinimapBoundary()
	}
	
	loadAccount (e, msg) {
		cc.director.loadScene("user");
    },
	
	async updateMap () {
      this.changeTimeButton()
	  if (!this.isBusy) {
		this.isBusy = true;
		const center = this.getPosition()
		let x1 = center.x - 7
		let x2 = center.x + 7
		let y1 = center.y - 5
		let y2 = center.y + 5
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
			  this.setMiniMap(x, y, 4)
            }
			if (map[i].monster > 0) {
			  //cc.log(map[i].monster/1e18, x, y)
			  this.spawnNewChest (x*64, y*64)
			  this.setMiniMap(x, y, 3)
            }
            i ++;
          }
        }
		this.setMiniMap(this.playerInfo.x, this.playerInfo.y, 5)
		this.isBusy = false;
	  }
	  else {
		  cc.log('isBusy')
	  }
	}
	
	async getEvent() {
		const statusInfo = await this.rogueLandContract.getEvent(this.id)
		//cc.log(statusInfo)
		if (statusInfo.t != 0) {
			this.t = statusInfo.t
		    this.player.zIndex = 4
		    this.player.x = statusInfo.x * 64
		    this.player.y = statusInfo.y * 64
		    this.resetMinimap()
			this.updateMap()
			this.toPick.x = statusInfo.x
			this.toPick.y = statusInfo.y
			this.hasEvents = true
			this.pickButton.interactable = true
			const myPunk = await this.rogueLandContract.stillPunks(this.id)
			this.gold = myPunk.gold
			if (this.gold >= 1000) {
			    this.swapButton.interactable = true
		    }
		}
		else {
			this.hasEvents = false
			this.pickButton.interactable = false
			this.goViewMode()
		}
	}
	
	async getGoldInfo() {
		const blockNumber = await this.provider.getBlockNumber()
		const validBlockToPutGold = await this.rogueLandContract.validBlockToPutGold()
		cc.log(validBlockToPutGold, blockNumber)
		if (blockNumber >= validBlockToPutGold && this.id > 0) {
			this.spawnNewDialog()
		}
	}
	
	async goViewMode() {
		this.getGoldInfo()
		if (this.hasEvents) {
			this.getEvent()
		}
		else {
			const statusInfo = await this.rogueLandContract.getCurrentStatus(this.id)
		    this.mode = "view"
			this.t = statusInfo.t
			this.playerInfo.t = statusInfo.t
			this.playerInfo.x = statusInfo.x
			this.playerInfo.y = statusInfo.y
		    this.player.zIndex = 0
		    this.player.x = statusInfo.x * 64
		    this.player.y = statusInfo.y * 64
			this.minimapCenter.x = statusInfo.x
			this.minimapCenter.y = statusInfo.y
		    this.resetMinimap()
			this.updateMap()
			const myPunk = await this.rogueLandContract.stillPunks(this.id)
			this.gold = myPunk.gold
            if (this.gold >= 1000) {
			    this.swapButton.interactable = true
		    }
			this.balance = await this.wallet.getBalance();
		}
	}
	
	async goScheduleMode() {
		const statusInfo = await this.rogueLandContract.getScheduleInfo(this.id)
		this.mode = "schedule"
		this.t = statusInfo.t
		this.currentSchedule = statusInfo.t
		this.player.zIndex = 4
		this.toCommit = statusInfo.t
		this.player.x = statusInfo.x * 64
		this.player.y = statusInfo.y * 64
		this.resetMinimap()
		this.updateMap()
	}
	
	switchMode (e, msg) {
        const lang = cc.sys.localStorage.getItem('lang')
		if (this.mode == "view" && this.id > 0) {
			this.goScheduleMode()
			if (lang === 'zh') {
			    this.switchLabel.string = "退出规划"
		    }
		    else {
			    this.switchLabel.string = "View Mode"
		    }
		}
		else if (this.mode == "schedule") {
			this.goViewMode()
			if (lang === 'zh') {
			    this.switchLabel.string = "准备行动"
		    }
		    else {
			    this.switchLabel.string = "Take Actions"
		    }
		}
    },
	
	setPosition (node, x, y) {
		node.x = x
		node.y = y
	}
	
	getPosition () {
		return {x: Math.round(this.player.x/64), y: Math.round(this.player.y/64)}
	}
    
	update(dt) {
		let x = this.player.x
		let y = this.player.y
		this.setPosition(this.camera, x, y)
		this.setPosition(this.label.node, x-300, y+250)
		this.setPosition(this.time_button_group, x, y-280)
		this.setPosition(this.button_group_2, x+330, y+140)
		this.setLabel(this.t, this.getPosition())
		if (this.mode == "schedule") {this.setPosition(this.playerInfo, x/64, y/64)}
	}
	
	click_arrow (e, msg) {
		// 任何都会导致punk无法拾取lowb
        // this.pickButton.interactable = false
		if (this.numberList[this.toCommit-this.currentSchedule] && this.mode == "schedule") {
			return;
		}
		switch(msg) {
			case "left":
			    if (this.mode == "schedule") {
			      this.spawnNewNumber(this.player.x, this.player.y, Action.GoLeft)
		        }
				this.player.getComponent('Player').moveWest()
                break;
            case "right":
			    if (this.mode == "schedule") {
			      this.spawnNewNumber(this.player.x, this.player.y, Action.GoRight)
		        }
                this.player.getComponent('Player').moveEast()
                break;
		    case "down":
                if (this.mode == "schedule") {
			      this.spawnNewNumber(this.player.x, this.player.y, Action.GoDown)
		        }
				this.player.getComponent('Player').moveSouth()
                break;
            case "up":
                if (this.mode == "schedule") {
			      this.spawnNewNumber(this.player.x, this.player.y, Action.GoUp)
		        }
				this.player.getComponent('Player').moveNorth()
                break;
			case "left-up":
			    if (this.mode == "schedule") {
			      this.spawnNewNumber(this.player.x, this.player.y, Action.GoLeftUp)
		        }
				this.player.getComponent('Player').moveNorthWest()
                break;
            case "right-down":
			    if (this.mode == "schedule") {
			      this.spawnNewNumber(this.player.x, this.player.y, Action.GoRightDown)
		        }
                this.player.getComponent('Player').moveSouthEast()
                break;
		    case "right-up":
                if (this.mode == "schedule") {
			      this.spawnNewNumber(this.player.x, this.player.y, Action.GoRightUp)
		        }
				this.player.getComponent('Player').moveNorthEast()
                break;
            case "left-down":
                if (this.mode == "schedule") {
			      this.spawnNewNumber(this.player.x, this.player.y, Action.GoLeftDown)
		        }
				this.player.getComponent('Player').moveSouthWest()
                break;
			case "+":
                if (this.mode == "view" && !this.isBusy) {
					this.t ++
					this.resetMinimap()
					this.updateMap()
				}
                break;
            case "-":
                if (this.mode == "view" && this.t > 0 && !this.isBusy) {
					this.t --
					this.resetMinimap()
					this.updateMap()
				}
                break;
        }
    }
	
	onKeyDown (event) {
		// 任何都会导致punk无法拾取lowb
        // this.pickButton.interactable = false
		if (this.numberList[this.toCommit-this.currentSchedule] && this.mode == "schedule") {
			return;
		}
		switch(event.keyCode) {
            case cc.macro.KEY.h:
			case cc.macro.KEY.left:
			    if (this.mode == "schedule") {
			      this.spawnNewNumber(this.player.x, this.player.y, Action.GoLeft)
		        }
				else {
					this.updateMap()
				}
				this.player.getComponent('Player').moveWest()
                break;
            case cc.macro.KEY.l:
			case cc.macro.KEY.right:
			    if (this.mode == "schedule") {
			      this.spawnNewNumber(this.player.x, this.player.y, Action.GoRight)
		        }
				else {
					this.updateMap()
				}
                this.player.getComponent('Player').moveEast()
                break;
		    case cc.macro.KEY.k:
			case cc.macro.KEY.down:
                if (this.mode == "schedule") {
			      this.spawnNewNumber(this.player.x, this.player.y, Action.GoDown)
		        }
				else {
					this.updateMap()
				}
				this.player.getComponent('Player').moveSouth()
                break;
            case cc.macro.KEY.j:
			case cc.macro.KEY.up:
                if (this.mode == "schedule") {
			      this.spawnNewNumber(this.player.x, this.player.y, Action.GoUp)
		        }
				else {
					this.updateMap()
				}
				this.player.getComponent('Player').moveNorth()
                break;
			case cc.macro.KEY.y:
			    if (this.mode == "schedule") {
			      this.spawnNewNumber(this.player.x, this.player.y, Action.GoLeftUp)
		        }
				else {
					this.updateMap()
				}
				this.player.getComponent('Player').moveNorthWest()
                break;
            case cc.macro.KEY.n:
			    if (this.mode == "schedule") {
			      this.spawnNewNumber(this.player.x, this.player.y, Action.GoRightDown)
		        }
				else {
					this.updateMap()
				}
                this.player.getComponent('Player').moveSouthEast()
                break;
		    case cc.macro.KEY.u:
                if (this.mode == "schedule") {
			      this.spawnNewNumber(this.player.x, this.player.y, Action.GoRightUp)
		        }
				else {
					this.updateMap()
				}
				this.player.getComponent('Player').moveNorthEast()
                break;
            case cc.macro.KEY.b:
                if (this.mode == "schedule") {
			      this.spawnNewNumber(this.player.x, this.player.y, Action.GoLeftDown)
		        }
				else {
					this.updateMap()
				}
				this.player.getComponent('Player').moveSouthWest()
                break;
			case cc.macro.KEY['+']:
                if (this.mode == "view" && !this.isBusy) {
					this.t ++
					this.resetMinimap()
					this.updateMap()
				}
                break;
            case cc.macro.KEY['-']:
                if (this.mode == "view" && this.t > 0 && !this.isBusy) {
					this.t --
					this.resetMinimap()
					this.updateMap()
				}
                break;
        }
    },
	
	onTouchMove(t){
		if (this.mode == "view") {
			let delta = t.getDelta();
            this.player.x -= delta.x;
            this.player.y -= delta.y;
		}
    },
	
	onTouchEnd(t){
		if (this.mode == "view") {
			this.updateMap()
		}
    },
	
	setMiniMap(x_, y_, gid_) {
		cc.log(x_, y_, gid_)
		let x = x_ - this.minimapCenter.x + 25
		let y = y_ - this.minimapCenter.y + 25
		if (x>=0 && x<=50 && y>=0 && y<=50) {
			this.tiledLayer.setTileGIDAt(gid_, x, 50-y, 0)
		}
	}
	
	onLoad () {
		this.label.node.zIndex = 3;
		this.time_button_group.zIndex = 3;
		this.button_group_2.zIndex = 3;
		this.pickButton.interactable = false
		this.swapButton.interactable = false
		// 生成草地
        //let windowSize=cc.view.getVisibleSize();
        //cc.log("width="+windowSize.width+",height="+windowSize.height);
		for (let i=-9; i<=9; i++) {
			for (let j=-6; j<=6; j++) {
				this.spawnNewGrass(i*64, j*64);
			}
		}
		
		for (let i=-2; i<=2; i++) {
			this.spawnTimeButton(64*i, 0, i+2)
		}
		
		this.tiledLayer = this.smallMap.getLayer("background")

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
