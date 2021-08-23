"use strict";
cc._RF.push(module, 'e1b90/rohdEk4SdmmEZANaD', 'Game');
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
        _this.mode = "view";
        _this.rogueLandAddress = '0xE9f1e59d52d66a0fF973B85f8f4744350c15E924';
        _this.rogueLandContract = null;
        _this.provider = null;
        _this.wallet = null;
        _this.numberList = [];
        _this.label = null;
        _this.accountButton = null;
        _this.modeButton = null;
        _this.text = 'hello';
        _this.grassPrefab = null;
        _this.chestPrefab = null;
        _this.numberPrefab = null;
        _this.rogueLandJson = null;
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
        newChest.zIndex = 1;
        // 设置宝箱的位置
        newChest.setPosition(cc.v2(x, y));
    };
    Game.prototype.spawnNewNumber = function (x, y, action) {
        // 使用给定的模板在场景中生成一个新节点
        var newNumber = cc.instantiate(this.numberPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newNumber);
        newNumber.zIndex = 1;
        // 设置数字的位置
        newNumber.setPosition(cc.v2(x, y));
        var color = new cc.Color(242, 129, 27);
        newNumber.color = color;
        newNumber.getComponent(cc.Label).string = Number(this.t) + 1;
        this.numberList[this.t - this.currentSchedule] = { time: Number(this.t) + 1, action: action, status: Status.Schedule, number: newNumber };
    };
    Game.prototype.setLabel = function (t, x, y) {
        this.text = this.mode + "  T" + t + " (" + x + ", " + y + ")";
        this.label.string = this.text;
    };
    Game.prototype.commit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var action, rogueLandSigner;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        action = this.numberList[this.toCommit - this.currentSchedule];
                        action.status = Status.Committing;
                        rogueLandSigner = this.rogueLandContract.connect(this.wallet);
                        return [4 /*yield*/, rogueLandSigner.scheduleAction(this.id, action.action)];
                    case 1:
                        _a.sent();
                        action.status = Status.Committed;
                        this.toCommit++;
                        cc.log('commit');
                        return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.loadPunk = function () {
        return __awaiter(this, void 0, void 0, function () {
            var myPunk, sprite_1;
            return __generator(this, function (_a) {
                myPunk = JSON.parse(cc.sys.localStorage.getItem('myPunk'));
                if (myPunk) {
                    this.id = myPunk.id;
                    sprite_1 = this.node.getChildByName('Player').getComponent(cc.Sprite);
                    cc.assetManager.loadRemote(myPunk.uri, { ext: '.png', cacheEnabled: true }, function (err, pic) {
                        if (err) {
                            cc.log('LoadNetImg load error,error:' + err);
                            return;
                        }
                        sprite_1.spriteFrame = new cc.SpriteFrame(pic);
                    });
                }
                return [2 /*return*/];
            });
        });
    };
    Game.prototype.getStatus = function () {
        return __awaiter(this, void 0, void 0, function () {
            var walletData, walletPrivateKey, balance, currentTime;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        walletData = JSON.parse(cc.sys.localStorage.getItem('wallet'));
                        walletPrivateKey = new ethers_umd_min_js_1.ethers.Wallet(walletData.privateKey);
                        this.provider = new ethers_umd_min_js_1.ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s2.binance.org:8545/");
                        this.wallet = walletPrivateKey.connect(this.provider);
                        this.rogueLandContract = new ethers_umd_min_js_1.ethers.Contract(this.rogueLandAddress, this.rogueLandJson.json.abi, this.provider);
                        return [4 /*yield*/, this.wallet.getBalance()];
                    case 1:
                        balance = _a.sent();
                        cc.log(balance / 1e18);
                        if (!(this.id > 0)) return [3 /*break*/, 2];
                        this.goViewMode();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.rogueLandContract.getCurrentTime()];
                    case 3:
                        currentTime = _a.sent();
                        this.t = currentTime;
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.loadAccount = function (e, msg) {
        cc.director.loadScene("user");
    };
    Game.prototype.goViewMode = function () {
        return __awaiter(this, void 0, void 0, function () {
            var statusInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.rogueLandContract.getCurrentStatus(this.id)];
                    case 1:
                        statusInfo = _a.sent();
                        this.mode = "view";
                        this.t = statusInfo.t;
                        this.player.x = statusInfo.x * 64;
                        this.player.y = statusInfo.y * 64;
                        return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.goScheduleMode = function () {
        return __awaiter(this, void 0, void 0, function () {
            var statusInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.rogueLandContract.getScheduleInfo(this.id)];
                    case 1:
                        statusInfo = _a.sent();
                        this.mode = "schedule";
                        this.t = statusInfo.t;
                        this.currentSchedule = statusInfo.t;
                        this.toCommit = statusInfo.t;
                        this.player.x = statusInfo.x * 64;
                        this.player.y = statusInfo.y * 64;
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
        // set a flag when key pressed
        switch (event.keyCode) {
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
                if (this.mode == "schedule") {
                    this.spawnNewNumber(this.player.x, this.player.y, Action.GoLeft);
                    this.t++;
                }
                this.player.getComponent('Player').moveLeft();
                break;
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                if (this.mode == "schedule") {
                    this.spawnNewNumber(this.player.x, this.player.y, Action.GoRight);
                    this.t++;
                }
                this.player.getComponent('Player').moveRight();
                break;
            case cc.macro.KEY.s:
            case cc.macro.KEY.down:
                if (this.mode == "schedule") {
                    this.spawnNewNumber(this.player.x, this.player.y, Action.GoDown);
                    this.t++;
                }
                this.player.getComponent('Player').moveDown();
                break;
            case cc.macro.KEY.w:
            case cc.macro.KEY.up:
                if (this.mode == "schedule") {
                    this.spawnNewNumber(this.player.x, this.player.y, Action.GoUp);
                    this.t++;
                }
                this.player.getComponent('Player').moveUp();
                break;
        }
    };
    Game.prototype.onLoad = function () {
        this.label.node.zIndex = 1;
        this.accountButton.node.zIndex = 1;
        this.modeButton.node.zIndex = 1;
        // 生成草地
        var windowSize = cc.view.getVisibleSize();
        cc.log("width=" + windowSize.width + ",height=" + windowSize.height);
        for (var i = -7; i <= 7; i++) {
            for (var j = -5; j <= 5; j++) {
                this.spawnNewGrass(i * 64, j * 64);
            }
        }
        this.spawnNewChest(64, 64);
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
        property(cc.JsonAsset)
    ], Game.prototype, "rogueLandJson", void 0);
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