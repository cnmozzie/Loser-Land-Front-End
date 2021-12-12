const {ccclass, property} = cc._decorator;
import {ethers} from 'ethers/dist/ethers.umd.min.js';

enum Status {Schedule, Committing, Committed, Confirmmed};
enum Action {SitStill, GoLeft, GoRight, GoUp, GoDown, GoLeftUp, GoLeftDown, GoRightUp, GoRightDown};

@ccclass
export default class Game extends cc.Component {
	
	id: number = 0;
	t: number = 0;
	block: number = 0;
	currentSchedule: number = 0;
	toCommit: number = 0;
	balance: number = 0;
	gold: number = 0;
	hp: number = 0;
	hep: number = 0;
	endRound: number = 1320;
	minimapSize: number = 51;
	mapSize: number = 51;
	eventNumber: number = 0;
	playerAddress: string = "";
	userName: string = 'vistor';
	mode: string = "view";
	isBusy: bool = false;
	rogueLandAddress: string = '0x373eB106CF011c0EcE12f4ecf345cE96351697F4';
	rogueLandContract: any = null;
	buildingAddress: string = '0xd87e8aa40da922eb1a8f2eF13c5Ca06d74645F4f';
	buildingContract: any = null;
	landAddress: string = '0x3bF771C9C29B03a3cb53b377A0c4797458787721';
	landContract: any = null;
	provider: any = null;
	wallet: any = null;
	validToGo: any = {};
	playerInfo: any = {x: 0, y: 0, t: 0};
	landPos: any = {x: 0, y: 0};
	minimapCenter: any = {x: 0, y: 0};
	timeList: any[] = [];
	punks: any[] = [];
	chests: any[] = [];
	tiledLayer : cc.TiledLayer = null;
	gameLayer : cc.TiledLayer = null;
	
	@property(cc.Label)
    label: cc.Label = null;
	
	@property(cc.Label)
    switchLabel: cc.Label = null;
	
	@property(cc.Label)
    messageLabel: cc.Label = null;
	
	@property(cc.Button)
    modeButton: cc.Button = null;
	
	@property(cc.Button)
    leaveButton: cc.Button = null;
	
	@property(cc.Button)
    useButton: cc.Button = null;
	
	@property(cc.TiledMap)
    smallMap: cc.TiledMap = null;
	
	@property(cc.TiledMap)
    gameMap: cc.TiledMap = null;

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
    redStarPrefab: cc.Prefab = null;
	
	@property(cc.Prefab)
    blueStarPrefab: cc.Prefab = null;
	
	@property(cc.Prefab)
    circlePrefab: cc.Prefab = null;
	
	@property(cc.Prefab)
    diePrefab: cc.Prefab = null;
	
	@property(cc.Prefab)
    punkInfoPrefab: cc.Prefab = null;
	
	@property(cc.Prefab)
    goldInfoPrefab: cc.Prefab = null;
	
	@property(cc.JsonAsset)
    rogueLandJson: cc.JsonAsset = null;
	
	@property(cc.JsonAsset)
    buildingJson: cc.JsonAsset = null;
	
	@property(cc.JsonAsset)
    loserpunkJson: cc.JsonAsset = null;
	
	@property(cc.JsonAsset)
    landJson: cc.JsonAsset = null;
	
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
	
	spawnNewDieDialog (name) {
        // 使用给定的模板在场景中生成一个新节点
        var newDialog = cc.instantiate(this.diePrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newDialog);
		newDialog.zIndex = 6;
        // 设置宝箱的位置
        newDialog.setPosition(cc.v2(this.player.x, this.player.y));
		// 在对话框脚本组件上保存 Game 对象的引用
        newDialog.getComponent('DieDialog').setText(name);
    },
	
	async spawnNewPunkInfo (id, x, y, inHouse) {
        var newDialog = cc.instantiate(this.punkInfoPrefab);
        this.node.addChild(newDialog);
		newDialog.zIndex = 6;
        newDialog.setPosition(cc.v2(this.player.x, this.player.y));
        cc.log(id, x, y, this.t)
		cc.log(this.playerInfo)
		newDialog.getComponent('PunkInfo').game = this;
		newDialog.getComponent('PunkInfo').setId(id);
		const info = await this.getPunkInfo(id);
		newDialog.getComponent('PunkInfo').setInfo(info);
		if (id != this.id && this.t == this.playerInfo.t && Math.abs(x-this.playerInfo.x)<=1 && Math.abs(y-this.playerInfo.y)<=1) {
			if (!inHouse) {
				newDialog.getComponent('PunkInfo').setAttack();
			}
			else if (info.stayTime > 5) {
				newDialog.getComponent('PunkInfo').setExpel();
			}
		}
		if (inHouse && info.stayTime > 5) {
			newDialog.getComponent('PunkInfo').setCharge();
		}
    },
	
	async spawnNewLandInfo () {
        //cc.log(this.landPos)
		var newDialog = cc.instantiate(this.goldInfoPrefab);
        this.node.addChild(newDialog);
		newDialog.zIndex = 6;
        newDialog.setPosition(cc.v2(this.player.x, this.player.y));
		// 在对话框脚本组件上保存 Game 对象的引用
		newDialog.getComponent('GoldDialog').game = this;
		const info = await this.buildingContract.landOf(this.landPos.x, this.landPos.y);
		newDialog.getComponent('GoldDialog').setLabel({pos: this.landPos, block: this.block, land: info, player: this.playerAddress});
		newDialog.on(cc.Node.EventType.TOUCH_START, function(event){cc.log('touched')}, this)
    },
	
	async spawnNewCircle () {
        const balance = await this.landContract.balanceOf(this.playerAddress)
		for (let i=0; i< balance; i++) {
			let id = await this.landContract.tokenOfOwnerByIndex(this.playerAddress, i)
			let pos = await this.landContract.positionOf(id)
			// 使用给定的模板在场景中生成一个新节点
            let newCircle = cc.instantiate(this.circlePrefab);
			this.node.addChild(newCircle);
			newCircle.setPosition(cc.v2(pos.x*64,pos.y*64));
			newCircle.zIndex = 3;
		}
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
		newGrass.on(cc.Node.EventType.TOUCH_START, function(event){
			this.landPos.x = x/64 + Math.round(this.player.x/64);
			this.landPos.y = y/64 + Math.round(this.player.y/64);
			const center = this.getPosition()
			//cc.log(center, x, y)
		}, this)
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
	
	spawnNewPunk (x, y, id, inHouse) {
        //cc.log(x, y, id.toString())
		// 使用给定的模板在场景中生成一个新节点
        var newPunk = cc.instantiate(this.punkPrefab);
		let newStar;
		if (id % 2 == 0) {
			newStar = cc.instantiate(this.redStarPrefab);
		}
		else {
			newStar = cc.instantiate(this.blueStarPrefab);
		}
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newPunk);
		newPunk.addChild(newStar)
		newStar.setPosition(cc.v2(20,20));
		newPunk.zIndex = inHouse ? 2 : 4;
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
		
		newPunk.on(cc.Node.EventType.TOUCH_START, function(event){
			this.spawnNewPunkInfo(id, x/64, y/64, inHouse);
		}, this)
    },
	
	async commitMove (x, y, action) {
		if (this.balance < 0) return
		if (!this.validToGo["x"+x+"y"+y]) {
			cc.log('invalid position')
			return
		}
		// 增加1回合
		this.t ++
		// 更新地图
		this.resetMinimap()
		this.updateMap()
		// 自动提交
		const rogueLandSigner = this.rogueLandContract.connect(this.wallet)
		try {
			const tx = await rogueLandSigner.scheduleAction(this.id, action)
		}
		catch (e) {
			cc.log(e)
		}
		
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
		else if (this.playerInfo.t == 0) {
			if (lang === 'zh') {
			    this.text = `游戏尚未开始 行动点: ${this.balance}`
		    }
			else {
				this.text = `Game not start yet ACTION POINTS: ${this.balance}`
			}
		}
		else if (this.playerInfo.t == this.endRound) {
			if (lang === 'zh') {
			    this.text = `游戏结束 行动点: ${this.balance}`
		    }
			else {
				this.text = `Game Over ACTION POINTS: ${this.balance}`
			}
		}
		else {
			this.text = `SQUID: ${this.gold} OKT: ${this.balance} HP: ${this.hp} HEP: ${this.hep}`
			//this.text += `${this.endRound - this.t}回合后游戏结束`
		}
		this.label.string = this.text;
	}
	
	setAttackMessage (A, B, n) {
		const lang = cc.sys.localStorage.getItem('lang')
		if (lang === 'zh') {
			this.messageLabel.string = `${A}攻击了${B}，造成了${n}点伤害\n` + this.messageLabel.string
		}
		else {
			this.messageLabel.string = `${A} hits ${B}，deals ${n} points of damage\n` + this.messageLabel.string
		}
	}
	
	setDieMessage (A, B, n) {
		const lang = cc.sys.localStorage.getItem('lang')
		if (lang === 'zh') {
			this.messageLabel.string = `${A}击杀了${B}，获得了${n}个鱿鱼币\n` + this.messageLabel.string
		}
		else {
			this.messageLabel.string = `${A} killed ${B}，rob ${n} SQUIDs\n` + this.messageLabel.string
		}
		this.spawnNewDieDialog(B)
	}
	
	async leaveGame () {
		this.leaveButton.interactable = false
		const rogueLandSigner = this.rogueLandContract.connect(this.wallet)
		try {
			const tx = await rogueLandSigner.claimRewards()
		}
		catch (e) {
			cc.log(e)
		}
		this.gold = 0
		const lang = cc.sys.localStorage.getItem('lang')
		if (lang === 'zh') {
			this.messageLabel.string = `领取奖励成功\n` + this.messageLabel.string
		}
		else {
			this.messageLabel.string = `Rewards claimed!\n` + this.messageLabel.string
		}
    },
	
	async buyLand () {
		const buildingSigner = this.buildingContract.connect(this.wallet)
		try {
			const tx = await buildingSigner.mint(this.landPos.x, this.landPos.y)
		}
		catch (e) {
			cc.log(e)
		}
    },
	
	async fish () {
		const rogueLandSigner = this.rogueLandContract.connect(this.wallet)
		try {
			const tx = await rogueLandSigner.fish(this.landPos.x, this.landPos.y)
		}
		catch (e) {
			cc.log(e)
		}
		const lang = cc.sys.localStorage.getItem('lang')
		if (lang === 'zh') {
			this.messageLabel.string = `尝试收杆中\n` + this.messageLabel.string
		}
		else {
			this.messageLabel.string = `drawing fishing rods...\n` + this.messageLabel.string
		}
    },
	
	async build (kind) {
		const buildingSigner = this.buildingContract.connect(this.wallet)
		try {
			const tx = await buildingSigner.build(this.landPos.x, this.landPos.y, kind)
		}
		catch (e) {
			cc.log(e)
		}
    },
	
	async useHEP () {
        this.useButton.interactable = false
		const rogueLandSigner = this.rogueLandContract.connect(this.wallet)
		try {
			const tx = await rogueLandSigner.useHEP(this.id)
		}
		catch (e) {
			cc.log(e)
		}
		//this.balance = this.balance - 2
		this.hep --
		this.hp = Math.min(this.hp+10, 15)
		if (this.hep > 0) {
			this.useButton.interactable = true
		}
    },
	
	async charge (to, getOut) {
		const rogueLandSigner = this.rogueLandContract.connect(this.wallet)
		try {
			const tx = await rogueLandSigner.charge(this.id, to, getOut)
		}
		catch (e) {
			cc.log(e)
		}
	}
	
	async attack (to, _seed, _name) {
        const abiCoder = new ethers.utils.AbiCoder();
		cc.log(this.seed, _seed)
		const seedA = ethers.BigNumber.from(ethers.utils.keccak256(abiCoder.encode([ "uint", "uint" ], [this.id, _seed])))
		const seedB = ethers.BigNumber.from(ethers.utils.keccak256(abiCoder.encode([ "uint", "uint" ], [to, this.seed])))
		this.seed = seedB
		
		if (this.balance < 0) return;
		const rogueLandSigner = this.rogueLandContract.connect(this.wallet)
		try {
			const tx = await rogueLandSigner.attack(this.id, to)
		}
		catch (e) {
			cc.log(e)
		}
		
		const diceA = seedA.mod(100)
		const diceB = seedB.mod(100)
		cc.log(Number(diceA), Number(diceB))
		
		//this.balance = this.balance - 5
		
		let _damage = 0
		if (diceA/5+1 < 19) {
			_damage = (diceA)%5+1
			this.setAttackMessage(this.userName, _name, diceA%5+1)
		}
		else {
			this.setAttackMessage(this.userName, _name, 0)
		}
		
		if (diceB/5+1 < 19) {
			this.hp -= ((diceB)%5+1)
			this.setAttackMessage(_name, this.userName, diceB%5+1)
			if (this.hp <= 0) {
				this.setDieMessage(_name, this.userName, Number(this.gold))
			}
		}
		else {
			this.setAttackMessage(_name, this.userName, 0)
		}
		
		return {damage: _damage, newSeed: seedA, name: this.userName}
		
		//cc.log(tx.gasPrice/1e9*tx.gasLimit)
		//this.updateMap()
		//this.getGoldInfo()
    },
	
	async getPunkInfo (id) {
		const punkInfo = await this.rogueLandContract.getPunkInfo(id)
		cc.log(punkInfo)
		return  {
			        name: punkInfo.name, 
					stayTime: Number(this.playerInfo.t) - Number(punkInfo.showTime), 
		            gold: ethers.utils.formatEther(punkInfo.totalGold), 
					hp: Number(punkInfo.hp), 
					evil: Number(punkInfo.evil), 
					seed: punkInfo.seed.toHexString(),
				    address: punkInfo.player
			    }
    },
	
	async loadPunk () {
        let punkId = JSON.parse(cc.sys.localStorage.getItem('myPunk'))
		if (punkId > 0) {
		  this.id = punkId
		  let sprite = this.node.getChildByName('Player').getComponent(cc.Sprite)
		  let remoteUrl = "https://www.losernft.org/ipfs/"+this.loserpunkJson.json[punkId-1].hash
	      cc.assetManager.loadRemote<cc.Texture2D>(remoteUrl, { ext: '.png', cacheEnabled: true }, function (err, pic) {
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

		this.playerAddress = cc.sys.localStorage.getItem('address')
		if (this.playerAddress == '') {
			cc.log('visitor')
			this.provider = new ethers.providers.JsonRpcProvider("https://exchainrpc.okex.org")
			this.modeButton.interactable = false
		}
		else {
			cc.log(this.playerAddress)
			this.provider = new ethers.providers.Web3Provider(window.ethereum)
		    this.wallet = this.provider.getSigner()
		}
		
		this.rogueLandContract = new ethers.Contract(this.rogueLandAddress, this.rogueLandJson.json.abi, this.provider)
		this.buildingContract = new ethers.Contract(this.buildingAddress, this.buildingJson.json.abi, this.provider)
		this.landContract = new ethers.Contract(this.landAddress, this.landJson.json.abi, this.provider)
		this.goViewMode()
		this.mapSize = 24
		this.spawnNewCross(Number(this.mapSize)+1)
		this.spawnNewCircle()
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
		cc.director.loadScene("welcome");
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
		const minimap = await this.rogueLandContract.getEvents(x1, y1, x2, y2, this.t)
		const gamemap = await this.buildingContract.getLandInfo(x1, y1, x2, y2)
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
            if (gamemap[i] != 0) {
				//cc.log(x, y)
				this.setGameMap(x, y, gamemap[i])
				if (minimap[i]==this.id && gamemap[i]>=9 && gamemap[i]<12 && this.playerInfo.t==this.t) {
					this.leaveButton.interactable = true
				}
			}
			if (minimap[i] != 0 && !(this.mode == "schedule" && minimap[i] == this.id)) {
			  //cc.log(minimap[i].movingPunk, x, y)
			  this.spawnNewPunk (x*64, y*64, minimap[i], gamemap[i]>=9 && gamemap[i]<12)
			  //cc.log(gamemap[i])
			  if (minimap[i] % 2 == 0) {
				  this.setMiniMap(x, y, 4)
			  }
			  else {
				  this.setMiniMap(x, y, 5)
			  }
			  this.validToGo["x"+x+"y"+y] = (gamemap[i]>=9 && gamemap[i]<12)
            }
			else {
			  this.validToGo["x"+x+"y"+y] = true
			}
            i ++;
          }
        }
		this.setMiniMap(this.playerInfo.x, this.playerInfo.y, 6)
		this.isBusy = false;
	  }
	  else {
		  cc.log('isBusy')
	  }
	}
	
	async goViewMode() {
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
		if (this.playerInfo.t == this.endRound) {
			//this.modeButton.interactable = false
			//return;
		}
		const myPunk = await this.rogueLandContract.getPunkInfo(this.id)
		this.gold = ethers.utils.formatEther(myPunk.totalGold)
		this.hp = myPunk.hp
		this.hep = cc.sys.localStorage.getItem('hep')
		if (myPunk.name == "") {
			this.userName = myPunk.player.slice(0, 6)
		}
		else {
			this.userName = myPunk.name
		}
		this.seed = myPunk.seed.toHexString()
		if (this.hep > 0) {
		    this.useButton.interactable = true
		}
		if (Math.abs(statusInfo.x) == 25 || Math.abs(statusInfo.y) == 25) {
		    //this.leaveButton.interactable = true
		}
		this.block = myPunk.blockNumber
		const okt = await this.wallet.getBalance()
		this.balance = Math.floor(ethers.utils.formatEther(okt)*10000)/10000
		
	}
	
	async goScheduleMode() {
		const statusInfo = await this.rogueLandContract.getScheduleInfo(this.id)
		this.mode = "schedule"
		this.t = Number(statusInfo.t) + 1
		this.currentSchedule = statusInfo.t
		this.player.zIndex = 3
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
		this.setPosition(this.label.node, x, y+250)
		this.setPosition(this.time_button_group, x, y-280)
		this.setPosition(this.button_group_2, x+330, y+140)
		this.setLabel(this.t, this.getPosition())
		if (this.mode == "schedule") {this.setPosition(this.playerInfo, x/64, y/64)}
	}
	
	click_arrow (e, msg) {
		// 任何都会导致punk无法拾取lowb
        // this.pickButton.interactable = false
		if (this.isBusy) {
			return;
		}
		switch(msg) {
			case "left":
			    if (this.mode == "schedule") {
			      this.commitMove(this.player.x/64-1, this.player.y/64, Action.GoLeft)
		        }
				this.player.getComponent('Player').moveWest()
                break;
            case "right":
			    if (this.mode == "schedule") {
			      this.commitMove(this.player.x/64+1, this.player.y/64, Action.GoRight)
		        }
                this.player.getComponent('Player').moveEast()
                break;
		    case "down":
                if (this.mode == "schedule") {
			      this.commitMove(this.player.x/64, this.player.y/64-1, Action.GoDown)
		        }
				this.player.getComponent('Player').moveSouth()
                break;
            case "up":
                if (this.mode == "schedule") {
			      this.commitMove(this.player.x/64, this.player.y/64+1, Action.GoUp)
		        }
				this.player.getComponent('Player').moveNorth()
                break;
			case "left-up":
			    if (this.mode == "schedule") {
			      this.commitMove(this.player.x/64-1, this.player.y/64+1, Action.GoLeftUp)
		        }
				this.player.getComponent('Player').moveNorthWest()
                break;
            case "right-down":
			    if (this.mode == "schedule") {
			      this.commitMove(this.player.x/64+1, this.player.y/64-1, Action.GoRightDown)
		        }
                this.player.getComponent('Player').moveSouthEast()
                break;
		    case "right-up":
                if (this.mode == "schedule") {
			      this.commitMove(this.player.x/64+1, this.player.y/64+1, Action.GoRightUp)
		        }
				this.player.getComponent('Player').moveNorthEast()
                break;
            case "left-down":
                if (this.mode == "schedule") {
			      this.commitMove(this.player.x/64-1, this.player.y/64-1, Action.GoLeftDown)
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
		if (this.isBusy) {
			return;
		}
		switch(event.keyCode) {
            case cc.macro.KEY.h:
			case cc.macro.KEY.left:
			    if (this.mode == "schedule") {
			      this.commitMove(this.player.x/64-1, this.player.y/64, Action.GoLeft)
		        }
				else {
					this.updateMap()
				}
				this.player.getComponent('Player').moveWest()
                break;
            case cc.macro.KEY.l:
			case cc.macro.KEY.right:
			    if (this.mode == "schedule") {
			      this.commitMove(this.player.x/64+1, this.player.y/64, Action.GoRight)
		        }
				else {
					this.updateMap()
				}
                this.player.getComponent('Player').moveEast()
                break;
		    case cc.macro.KEY.k:
			case cc.macro.KEY.down:
                if (this.mode == "schedule") {
			      this.commitMove(this.player.x/64, this.player.y/64-1, Action.GoDown)
		        }
				else {
					this.updateMap()
				}
				this.player.getComponent('Player').moveSouth()
                break;
            case cc.macro.KEY.j:
			case cc.macro.KEY.up:
                if (this.mode == "schedule") {
			      this.commitMove(this.player.x/64, this.player.y/64+1, Action.GoUp)
		        }
				else {
					this.updateMap()
				}
				this.player.getComponent('Player').moveNorth()
                break;
			case cc.macro.KEY.y:
			    if (this.mode == "schedule") {
			      this.commitMove(this.player.x/64-1, this.player.y/64+1, Action.GoLeftUp)
		        }
				else {
					this.updateMap()
				}
				this.player.getComponent('Player').moveNorthWest()
                break;
            case cc.macro.KEY.n:
			    if (this.mode == "schedule") {
			      this.commitMove(this.player.x/64+1, this.player.y/64-1, Action.GoRightDown)
		        }
				else {
					this.updateMap()
				}
                this.player.getComponent('Player').moveSouthEast()
                break;
		    case cc.macro.KEY.u:
                if (this.mode == "schedule") {
			      this.commitMove(this.player.x/64+1, this.player.y/64+1, Action.GoRightUp)
		        }
				else {
					this.updateMap()
				}
				this.player.getComponent('Player').moveNorthEast()
                break;
            case cc.macro.KEY.b:
                if (this.mode == "schedule") {
			      this.commitMove(this.player.x/64-1, this.player.y/64-1, Action.GoLeftDown)
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
			let deltaX = t.getLocation().x - t.getStartLocation().x;
			let deltaY = t.getLocation().y - t.getStartLocation().y;
			//cc.log(deltaX, deltaY)
			if (Math.abs(deltaX) > 64 || Math.abs(deltaY) > 64) {
				this.updateMap()
			}
			else {
				//const center = this.getPosition()
				let windowSize=cc.view.getVisibleSize();
                cc.log("width="+windowSize.width+",height="+windowSize.height);
				this.landPos.x = Math.round((t.getLocation().x+this.player.x-windowSize.width/2)/64)
				this.landPos.y = Math.round((t.getLocation().y+this.player.y-windowSize.height/2)/64)
				this.spawnNewLandInfo()
				cc.log(Math.floor(t.getLocation().x/64), Math.floor(t.getLocation().y/64))
			}
		}
    },
	
	setGameMap(x_, y_, kind) {
		cc.log(x_, y_, kind)
		gid = Number(kind) + 1
		let x = x_ + 24
		let y = y_ + 24
		if (x>=0 && x<=48 && y>=0 && y<=48) {
			this.gameLayer.setTileGIDAt(gid, x, 48-y, 0)
		}
	},
	
	setMiniMap(x_, y_, gid_) {
		//cc.log(x_, y_, gid_)
		let x = x_ - this.minimapCenter.x + 25
		let y = y_ - this.minimapCenter.y + 25
		if (x>=0 && x<=50 && y>=0 && y<=50) {
			this.tiledLayer.setTileGIDAt(gid_, x, 50-y, 0)
		}
	},
	
	onLoad () {
		this.label.node.zIndex = 5;
		this.time_button_group.zIndex = 5;
		this.button_group_2.zIndex = 5;
		this.gameMap.node.zIndex = 2;
		this.leaveButton.interactable = false
		this.useButton.interactable = false
		// 生成草地
		for (let i=-9; i<=9; i++) {
			for (let j=-6; j<=6; j++) {
				this.spawnNewGrass(i*64, j*64);
			}
		}
		
		for (let i=-2; i<=2; i++) {
			this.spawnTimeButton(64*i, 0, i+2)
		}
		
		this.tiledLayer = this.smallMap.getLayer("background")
		this.gameLayer = this.gameMap.getLayer("game_map")

		// 初始化键盘输入监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);

    },

    start () {
        // init logic
		const lang = cc.sys.localStorage.getItem('lang')
		this.messageLabel.string = (lang === 'zh'? '游戏消息\n' : 'Game Message\n')
		this.loadPunk()
		this.getStatus()
    }
}
