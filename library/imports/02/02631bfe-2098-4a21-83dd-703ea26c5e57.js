"use strict";
cc._RF.push(module, '02631v+IJhKIYPdcD6ibF5X', 'Game');
// Script/Game.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ethers_umd_min_js_1 = require("ethers/dist/ethers.umd.min.js");
var Status;
(function (Status) {
    Status[Status["Schedule"] = 0] = "Schedule";
    Status[Status["Committing"] = 1] = "Committing";
    Status[Status["Committed"] = 2] = "Committed";
    Status[Status["Confirmmed"] = 3] = "Confirmmed";
})(Status || (Status = {}));
;
var Action;
(function (Action) {
    Action[Action["SitStill"] = 0] = "SitStill";
    Action[Action["GoLeft"] = 1] = "GoLeft";
    Action[Action["GoRight"] = 2] = "GoRight";
    Action[Action["GoUp"] = 3] = "GoUp";
    Action[Action["GoDown"] = 4] = "GoDown";
    Action[Action["GoLeftUp"] = 5] = "GoLeftUp";
    Action[Action["GoLeftDown"] = 6] = "GoLeftDown";
    Action[Action["GoRightUp"] = 7] = "GoRightUp";
    Action[Action["GoRightDown"] = 8] = "GoRightDown";
})(Action || (Action = {}));
;
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = 0;
        _this.t = 0;
        _this.currentSchedule = 0;
        _this.toCommit = 0;
        _this.balance = 0;
        _this.mode = "view";
        _this.hasEvents = false;
        _this.rogueLandAddress = '0x0E66931d3c7bd5cCC9991667cBBC673de21122fF';
        _this.rogueLandContract = null;
        _this.provider = null;
        _this.wallet = null;
        _this.numberList = [];
        _this.punks = [];
        _this.chests = [];
        _this.label = null;
        _this.accountButton = null;
        _this.modeButton = null;
        _this.commitButton = null;
        _this.pickButton = null;
        _this.text = 'hello';
        _this.grassPrefab = null;
        _this.chestPrefab = null;
        _this.numberPrefab = null;
        _this.punkPrefab = null;
        _this.rogueLandJson = null;
        _this.loserpunkJson = null;
        // Player 节点，用于获取主角的位置
        _this.player = null;
        // Camera 节点，用于获取摄像头的位置
        _this.camera = null;
        return _this;
    }
    Game.prototype.spawnNewGrass = function (x, y, action) {
        // 使用给定的模板在场景中生成一个新节点
        var newGrass = cc.instantiate(this.grassPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newGrass);
        // 设置草地的位置
        newGrass.setPosition(cc.v2(x, y));
        // 在草地脚本组件上保存 Camera 对象的引用
        newGrass.getComponent('Grass').camera = this.camera;
    };
    Game.prototype.spawnNewChest = function (x, y) {
        // 使用给定的模板在场景中生成一个新节点
        var newChest = cc.instantiate(this.chestPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newChest);
        newChest.zIndex = 2;
        // 设置宝箱的位置
        newChest.setPosition(cc.v2(x, y));
        this.chests.push(newChest);
    };
    Game.prototype.spawnNewPunk = function (x, y, id) {
        cc.log(x, y, id.toString());
        // 使用给定的模板在场景中生成一个新节点
        var newPunk = cc.instantiate(this.punkPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newPunk);
        newPunk.zIndex = 2;
        // 设置punk的位置
        newPunk.setPosition(cc.v2(x, y));
        this.punks.push(newPunk);
        if (id > 0) {
            //console.log(this.loserpunkJson.json[id-1])
            var remoteUrl = "https://www.losernft.org/ipfs/" + this.loserpunkJson.json[id - 1].hash;
            var sprite_1 = newPunk.getComponent(cc.Sprite);
            cc.assetManager.loadRemote(remoteUrl, { ext: '.png', cacheEnabled: true }, function (err, pic) {
                if (err) {
                    cc.log('LoadNetImg load error,error:' + err);
                    return;
                }
                sprite_1.spriteFrame = new cc.SpriteFrame(pic);
            });
        }
    };
    Game.prototype.spawnNewNumber = function (x, y, action) {
        // 使用给定的模板在场景中生成一个新节点
        var newNumber = cc.instantiate(this.numberPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newNumber);
        newNumber.zIndex = 2;
        // 设置数字的位置
        newNumber.setPosition(cc.v2(x, y));
        var color = new cc.Color(242, 129, 27);
        newNumber.color = color;
        // 增加1回合
        this.t++;
        newNumber.getComponent(cc.Label).string = this.t;
        this.numberList[this.t - this.currentSchedule - 1] = { time: this.t, action: action, status: Status.Schedule, number: newNumber };
        // 更新地图
        this.updateMap();
    };
    Game.prototype.setLabel = function (t, x, y) {
        if (this.mode == 'view') {
            this.text = "View Mode  T" + t + " (" + x + ", " + y + ")";
        }
        else {
            this.text = this.balance / 1e18 + "BNB  T" + t + " (" + x + ", " + y + ")";
        }
        this.label.string = this.text;
    };
    Game.prototype.commit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var action, rogueLandSigner, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        action = this.numberList[this.toCommit - this.currentSchedule];
                        action.status = Status.Committing;
                        rogueLandSigner = this.rogueLandContract.connect(this.wallet);
                        return [4 /*yield*/, rogueLandSigner.scheduleAction(this.id, action.action, { gasLimit: 300000 })];
                    case 1:
                        tx = _a.sent();
                        action.status = Status.Committed;
                        action.number.destroy();
                        this.toCommit++;
                        this.balance = this.balance - tx.gasPrice * tx.gasLimit;
                        cc.log(tx.gasPrice / 1e9 * tx.gasLimit);
                        return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.pick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rogueLandSigner, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rogueLandSigner = this.rogueLandContract.connect(this.wallet);
                        return [4 /*yield*/, rogueLandSigner.getGold(this.player.x / 64, this.player.y / 64, { gasLimit: 150000 })];
                    case 1:
                        tx = _a.sent();
                        this.balance = this.balance - tx.gasPrice * tx.gasLimit;
                        cc.log(tx.gasPrice / 1e9 * tx.gasLimit);
                        this.getEvent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.loadPunk = function () {
        return __awaiter(this, void 0, void 0, function () {
            var myPunk, sprite_2;
            return __generator(this, function (_a) {
                myPunk = JSON.parse(cc.sys.localStorage.getItem('myPunk'));
                if (myPunk) {
                    this.id = myPunk.id;
                    sprite_2 = this.node.getChildByName('Player').getComponent(cc.Sprite);
                    cc.assetManager.loadRemote(myPunk.uri, { ext: '.png', cacheEnabled: true }, function (err, pic) {
                        if (err) {
                            cc.log('LoadNetImg load error,error:' + err);
                            return;
                        }
                        sprite_2.spriteFrame = new cc.SpriteFrame(pic);
                    });
                }
                return [2 /*return*/];
            });
        });
    };
    Game.prototype.getStatus = function () {
        return __awaiter(this, void 0, void 0, function () {
            var walletData, walletPrivateKey, currentTime;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        walletData = JSON.parse(cc.sys.localStorage.getItem('wallet'));
                        walletPrivateKey = new ethers_umd_min_js_1.ethers.Wallet(walletData.privateKey);
                        this.provider = new ethers_umd_min_js_1.ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s2.binance.org:8545/");
                        this.wallet = walletPrivateKey.connect(this.provider);
                        this.rogueLandContract = new ethers_umd_min_js_1.ethers.Contract(this.rogueLandAddress, this.rogueLandJson.json.abi, this.provider);
                        if (!(this.id > 0)) return [3 /*break*/, 1];
                        this.getEvent();
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.rogueLandContract.getCurrentTime()];
                    case 2:
                        currentTime = _a.sent();
                        this.t = currentTime;
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.loadAccount = function (e, msg) {
        cc.director.loadScene("user");
    };
    Game.prototype.updateMap = function () {
        return __awaiter(this, void 0, void 0, function () {
            var x1, x2, y1, y2, map, node, node, i, x, y;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        x1 = this.player.x / 64 - 7;
                        x2 = this.player.x / 64 + 7;
                        y1 = this.player.y / 64 - 5;
                        y2 = this.player.y / 64 + 5;
                        return [4 /*yield*/, this.rogueLandContract.getEvents(x1, y1, x2, y2, this.t)];
                    case 1:
                        map = _a.sent();
                        while (this.punks.length > 0) {
                            node = this.punks.pop();
                            node.destroy();
                        }
                        while (this.chests.length > 0) {
                            node = this.chests.pop();
                            node.destroy();
                        }
                        i = 0;
                        for (x = x1; x <= x2; x++) {
                            for (y = y1; y <= y2; y++) {
                                if (map[i].movingPunk != 0 && !(this.mode == "schedule" && map[i].movingPunk == this.id)) {
                                    //cc.log(map[i].movingPunk, x, y)
                                    this.spawnNewPunk(x * 64, y * 64, map[i].movingPunk);
                                }
                                if (map[i].monster > 0) {
                                    //cc.log(map[i].monster/1e18, x, y)
                                    this.spawnNewChest(x * 64, y * 64);
                                }
                                i++;
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.getEvent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var statusInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.rogueLandContract.getEvent(this.id)
                        //cc.log(statusInfo)
                    ];
                    case 1:
                        statusInfo = _a.sent();
                        //cc.log(statusInfo)
                        if (statusInfo.t != 0) {
                            this.t = statusInfo.t;
                            this.player.zIndex = 3;
                            this.player.x = statusInfo.x * 64;
                            this.player.y = statusInfo.y * 64;
                            this.updateMap();
                            this.hasEvents = true;
                            this.pickButton.node.zIndex = 2;
                        }
                        else {
                            this.hasEvents = false;
                            this.pickButton.node.zIndex = 0;
                            this.goViewMode();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.goViewMode = function () {
        return __awaiter(this, void 0, void 0, function () {
            var statusInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.hasEvents) return [3 /*break*/, 1];
                        this.getEvent();
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.rogueLandContract.getCurrentStatus(this.id)];
                    case 2:
                        statusInfo = _a.sent();
                        this.mode = "view";
                        this.t = statusInfo.t;
                        this.player.zIndex = 0;
                        this.player.x = statusInfo.x * 64;
                        this.player.y = statusInfo.y * 64;
                        this.updateMap();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.goScheduleMode = function () {
        return __awaiter(this, void 0, void 0, function () {
            var statusInfo, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.rogueLandContract.getScheduleInfo(this.id)];
                    case 1:
                        statusInfo = _b.sent();
                        this.mode = "schedule";
                        this.t = statusInfo.t;
                        this.player.zIndex = 3;
                        this.currentSchedule = statusInfo.t;
                        this.toCommit = statusInfo.t;
                        this.player.x = statusInfo.x * 64;
                        this.player.y = statusInfo.y * 64;
                        this.updateMap();
                        _a = this;
                        return [4 /*yield*/, this.wallet.getBalance()];
                    case 2:
                        _a.balance = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.switchMode = function (e, msg) {
        if (this.mode == "view") {
            this.goScheduleMode();
        }
        else if (this.mode == "schedule") {
            this.goViewMode();
        }
    };
    Game.prototype.update = function (dt) {
        if (Math.abs(this.player.x) < 9 * 64) {
            this.camera.x = this.player.x;
        }
        if (Math.abs(this.player.y) < 12 * 64) {
            this.camera.y = this.player.y;
        }
        this.setLabel(this.t, this.player.x / 64, this.player.y / 64);
    };
    Game.prototype.onKeyDown = function (event) {
        // 任何都会导致punk无法拾取lowb
        this.pickButton.node.zIndex = 0;
        switch (event.keyCode) {
            case cc.macro.KEY.h:
            case cc.macro.KEY.left:
                if (this.mode == "schedule") {
                    this.spawnNewNumber(this.player.x, this.player.y, Action.GoLeft);
                }
                this.player.getComponent('Player').moveWest();
                break;
            case cc.macro.KEY.l:
            case cc.macro.KEY.right:
                if (this.mode == "schedule") {
                    this.spawnNewNumber(this.player.x, this.player.y, Action.GoRight);
                }
                this.player.getComponent('Player').moveEast();
                break;
            case cc.macro.KEY.k:
            case cc.macro.KEY.down:
                if (this.mode == "schedule") {
                    this.spawnNewNumber(this.player.x, this.player.y, Action.GoDown);
                }
                this.player.getComponent('Player').moveSouth();
                break;
            case cc.macro.KEY.j:
            case cc.macro.KEY.up:
                if (this.mode == "schedule") {
                    this.spawnNewNumber(this.player.x, this.player.y, Action.GoUp);
                }
                this.player.getComponent('Player').moveNorth();
                break;
            case cc.macro.KEY.y:
                if (this.mode == "schedule") {
                    this.spawnNewNumber(this.player.x, this.player.y, Action.GoLeftUp);
                }
                this.player.getComponent('Player').moveNorthWest();
                break;
            case cc.macro.KEY.n:
                if (this.mode == "schedule") {
                    this.spawnNewNumber(this.player.x, this.player.y, Action.GoRightDown);
                }
                this.player.getComponent('Player').moveSouthEast();
                break;
            case cc.macro.KEY.u:
                if (this.mode == "schedule") {
                    this.spawnNewNumber(this.player.x, this.player.y, Action.GoRightUp);
                }
                this.player.getComponent('Player').moveNorthEast();
                break;
            case cc.macro.KEY.b:
                if (this.mode == "schedule") {
                    this.spawnNewNumber(this.player.x, this.player.y, Action.GoLeftDown);
                }
                this.player.getComponent('Player').moveSouthWest();
                break;
            case cc.macro.KEY['+']:
                if (this.mode == "view") {
                    this.t++;
                    this.updateMap();
                }
                break;
            case cc.macro.KEY['-']:
                if (this.mode == "view" && this.t > 0) {
                    this.t--;
                    this.updateMap();
                }
                break;
            case cc.macro.KEY['.']:
                if (this.mode == "view") {
                    this.updateMap();
                }
                break;
        }
    };
    Game.prototype.onLoad = function () {
        this.label.node.zIndex = 2;
        this.accountButton.node.zIndex = 2;
        this.modeButton.node.zIndex = 2;
        this.commitButton.node.zIndex = 2;
        // 生成草地
        var windowSize = cc.view.getVisibleSize();
        cc.log("width=" + windowSize.width + ",height=" + windowSize.height);
        for (var i = -7; i <= 7; i++) {
            for (var j = -5; j <= 5; j++) {
                this.spawnNewGrass(i * 64, j * 64);
            }
        }
        // 初始化键盘输入监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    };
    Game.prototype.start = function () {
        // init logic
        this.label.string = this.text;
        this.loadPunk();
        this.getStatus();
    };
    __decorate([
        property(cc.Label)
    ], Game.prototype, "label", void 0);
    __decorate([
        property(cc.Button)
    ], Game.prototype, "accountButton", void 0);
    __decorate([
        property(cc.Button)
    ], Game.prototype, "modeButton", void 0);
    __decorate([
        property(cc.Button)
    ], Game.prototype, "commitButton", void 0);
    __decorate([
        property(cc.Button)
    ], Game.prototype, "pickButton", void 0);
    __decorate([
        property
    ], Game.prototype, "text", void 0);
    __decorate([
        property(cc.Prefab)
    ], Game.prototype, "grassPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], Game.prototype, "chestPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], Game.prototype, "numberPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], Game.prototype, "punkPrefab", void 0);
    __decorate([
        property(cc.JsonAsset)
    ], Game.prototype, "rogueLandJson", void 0);
    __decorate([
        property(cc.JsonAsset)
    ], Game.prototype, "loserpunkJson", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "player", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "camera", void 0);
    Game = __decorate([
        ccclass
    ], Game);
    return Game;
}(cc.Component));
exports.default = Game;

cc._RF.pop();