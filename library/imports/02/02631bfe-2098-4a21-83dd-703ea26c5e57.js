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
        _this.block = 0;
        _this.currentSchedule = 0;
        _this.toCommit = 0;
        _this.balance = 0;
        _this.gold = 0;
        _this.hp = 0;
        _this.hep = 0;
        _this.endRound = 1320;
        _this.minimapSize = 51;
        _this.mapSize = 51;
        _this.eventNumber = 0;
        _this.playerAddress = "";
        _this.userName = 'vistor';
        _this.mode = "view";
        _this.isBusy = false;
        _this.rogueLandAddress = '0xCaFf20f886248F6d8c0D7dF08A8c3E67C3Cfd3C2';
        _this.rogueLandContract = null;
        _this.buildingAddress = '0xcCbFb4740838365AfcB6AEC663C09652A859d219';
        _this.buildingContract = null;
        _this.landAddress = '0xd4B4529cB66a3793fE2423E627Ba32ca1FEbD3b9';
        _this.landContract = null;
        _this.provider = null;
        _this.wallet = null;
        _this.validToGo = {};
        _this.playerInfo = { x: 0, y: 0, t: 0 };
        _this.landPos = { x: 0, y: 0 };
        _this.minimapCenter = { x: 0, y: 0 };
        _this.timeList = [];
        _this.punks = [];
        _this.chests = [];
        _this.tiledLayer = null;
        _this.gameLayer = null;
        _this.label = null;
        _this.switchLabel = null;
        _this.messageLabel = null;
        _this.modeButton = null;
        _this.leaveButton = null;
        _this.useButton = null;
        _this.smallMap = null;
        _this.gameMap = null;
        _this.text = 'hello';
        _this.grassPrefab = null;
        _this.crossPrefab = null;
        _this.chestPrefab = null;
        _this.numberPrefab = null;
        _this.punkPrefab = null;
        _this.redStarPrefab = null;
        _this.blueStarPrefab = null;
        _this.circlePrefab = null;
        _this.diePrefab = null;
        _this.punkInfoPrefab = null;
        _this.goldInfoPrefab = null;
        _this.rogueLandJson = null;
        _this.buildingJson = null;
        _this.loserpunkJson = null;
        _this.landJson = null;
        // Player 节点，用于获取主角的位置
        _this.player = null;
        // 放置时间按钮
        _this.time_button_group = null;
        // 设置节点，用户交互按钮
        _this.button_group_2 = null;
        // Camera 节点，用于获取摄像头的位置
        _this.camera = null;
        return _this;
    }
    Game.prototype.spawnNewDieDialog = function (name) {
        // 使用给定的模板在场景中生成一个新节点
        var newDialog = cc.instantiate(this.diePrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newDialog);
        newDialog.zIndex = 6;
        // 设置宝箱的位置
        newDialog.setPosition(cc.v2(this.player.x, this.player.y));
        // 在对话框脚本组件上保存 Game 对象的引用
        newDialog.getComponent('DieDialog').setText(name);
    };
    Game.prototype.spawnNewPunkInfo = function (id, x, y, inHouse) {
        return __awaiter(this, void 0, void 0, function () {
            var newDialog, info;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newDialog = cc.instantiate(this.punkInfoPrefab);
                        this.node.addChild(newDialog);
                        newDialog.zIndex = 6;
                        newDialog.setPosition(cc.v2(this.player.x, this.player.y));
                        cc.log(id, x, y, this.t);
                        cc.log(this.playerInfo);
                        newDialog.getComponent('PunkInfo').game = this;
                        newDialog.getComponent('PunkInfo').setId(id);
                        return [4 /*yield*/, this.getPunkInfo(id)];
                    case 1:
                        info = _a.sent();
                        newDialog.getComponent('PunkInfo').setInfo(info);
                        if (id != this.id && this.t == this.playerInfo.t && Math.abs(x - this.playerInfo.x) <= 1 && Math.abs(y - this.playerInfo.y) <= 1 && !info.isMoving && !inHouse) {
                            newDialog.getComponent('PunkInfo').setAttack(true);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.spawnNewLandInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var newDialog, info;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newDialog = cc.instantiate(this.goldInfoPrefab);
                        this.node.addChild(newDialog);
                        newDialog.zIndex = 6;
                        newDialog.setPosition(cc.v2(this.player.x, this.player.y));
                        // 在对话框脚本组件上保存 Game 对象的引用
                        newDialog.getComponent('GoldDialog').game = this;
                        return [4 /*yield*/, this.buildingContract.landOf(this.landPos.x, this.landPos.y)];
                    case 1:
                        info = _a.sent();
                        newDialog.getComponent('GoldDialog').setLabel({ pos: this.landPos, block: this.block, land: info, player: this.playerAddress });
                        newDialog.on(cc.Node.EventType.TOUCH_START, function (event) { cc.log('touched'); }, this);
                        return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.spawnNewCircle = function () {
        return __awaiter(this, void 0, void 0, function () {
            var balance, i, id, pos, newCircle;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.landContract.balanceOf(this.playerAddress)];
                    case 1:
                        balance = _a.sent();
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < balance)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.landContract.tokenOfOwnerByIndex(this.playerAddress, i)];
                    case 3:
                        id = _a.sent();
                        return [4 /*yield*/, this.landContract.positionOf(id)
                            // 使用给定的模板在场景中生成一个新节点
                        ];
                    case 4:
                        pos = _a.sent();
                        newCircle = cc.instantiate(this.circlePrefab);
                        this.node.addChild(newCircle);
                        newCircle.setPosition(cc.v2(pos.x * 64, pos.y * 64));
                        newCircle.zIndex = 3;
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 2];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.spawnNewGrass = function (x, y) {
        // 使用给定的模板在场景中生成一个新节点
        var newGrass = cc.instantiate(this.grassPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newGrass);
        // 设置草地的位置
        newGrass.setPosition(cc.v2(x, y));
        // 在草地脚本组件上保存 Camera 对象的引用
        newGrass.getComponent('Grass').camera = this.camera;
        //newGrass.on(cc.Node.EventType.TOUCH_START,function(t){cc.log("触摸开始");},this)
        newGrass.on(cc.Node.EventType.TOUCH_START, function (event) {
            this.landPos.x = x / 64 + Math.round(this.player.x / 64);
            this.landPos.y = y / 64 + Math.round(this.player.y / 64);
            var center = this.getPosition();
            //cc.log(center, x, y)
        }, this);
        //监听
        newGrass.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        newGrass.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        newGrass.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    };
    Game.prototype.spawnNewCross = function (n) {
        for (var x = -n; x <= n; x++) {
            // 使用给定的模板在场景中生成一个新节点
            var newCross1 = cc.instantiate(this.crossPrefab);
            this.node.addChild(newCross1);
            newCross1.setPosition(cc.v2(x * 64, n * 64));
            newCross1.zIndex = 2;
            var newCross2 = cc.instantiate(this.crossPrefab);
            this.node.addChild(newCross2);
            newCross2.setPosition(cc.v2(x * 64, -n * 64));
            newCross2.zIndex = 2;
        }
        for (var y = -n + 1; y < n; y++) {
            // 使用给定的模板在场景中生成一个新节点
            var newCross1 = cc.instantiate(this.crossPrefab);
            this.node.addChild(newCross1);
            newCross1.setPosition(cc.v2(n * 64, y * 64));
            newCross1.zIndex = 2;
            var newCross2 = cc.instantiate(this.crossPrefab);
            this.node.addChild(newCross2);
            newCross2.setPosition(cc.v2(-n * 64, y * 64));
            newCross2.zIndex = 2;
        }
    };
    Game.prototype.spawnNewPunk = function (x, y, id, inHouse) {
        //cc.log(x, y, id.toString())
        // 使用给定的模板在场景中生成一个新节点
        var newPunk = cc.instantiate(this.punkPrefab);
        var newStar;
        if (id % 2 == 0) {
            newStar = cc.instantiate(this.redStarPrefab);
        }
        else {
            newStar = cc.instantiate(this.blueStarPrefab);
        }
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newPunk);
        newPunk.addChild(newStar);
        newStar.setPosition(cc.v2(20, 20));
        newPunk.zIndex = inHouse ? 2 : 4;
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
        newPunk.on(cc.Node.EventType.TOUCH_START, function (event) {
            this.spawnNewPunkInfo(id, x / 64, y / 64, inHouse);
        }, this);
    };
    Game.prototype.commitMove = function (x, y, action) {
        return __awaiter(this, void 0, void 0, function () {
            var rogueLandSigner, tx, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.balance < 0)
                            return [2 /*return*/];
                        if (!this.validToGo["x" + x + "y" + y]) {
                            cc.log('invalid position');
                            return [2 /*return*/];
                        }
                        // 增加1回合
                        this.t++;
                        // 更新地图
                        this.resetMinimap();
                        this.updateMap();
                        rogueLandSigner = this.rogueLandContract.connect(this.wallet);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, rogueLandSigner.scheduleAction(this.id, action)];
                    case 2:
                        tx = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        cc.log(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.spawnTimeButton = function (x, y, t) {
        // 使用给定的模板在场景中生成一个新节点
        var newNumber = cc.instantiate(this.numberPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.time_button_group.addChild(newNumber);
        // 设置数字的位置
        newNumber.setPosition(cc.v2(x, y));
        var color = new cc.Color(255, 255, 255);
        newNumber.color = color;
        newNumber.getComponent(cc.Label).string = t;
        newNumber.on(cc.Node.EventType.TOUCH_START, function (event) {
            if (this.mode == 'view') {
                this.t = newNumber.getComponent(cc.Label).string;
                this.resetMinimap();
                this.updateMap();
            }
            cc.log(newNumber.getComponent(cc.Label).string);
        }, this);
        this.timeList[t] = newNumber;
    };
    Game.prototype.changeTimeButton = function () {
        var t = this.t < 2 ? 2 : this.t;
        for (var i = 0; i < 5; i++) {
            this.timeList[i].getComponent(cc.Label).string = t - 2 + i;
            if (t - 2 + i == this.t) {
                this.timeList[i].getComponent(cc.Label).fontSize = 30;
            }
            else {
                this.timeList[i].getComponent(cc.Label).fontSize = 20;
            }
            if (t - 2 + i <= this.playerInfo.t) {
                var color = new cc.Color(255, 128, 128);
                this.timeList[i].color = color;
            }
            else if (t - 2 + i <= this.currentSchedule) {
                var color = new cc.Color(0, 0, 255);
                this.timeList[i].color = color;
            }
            else {
                var color = new cc.Color(255, 255, 255);
                this.timeList[i].color = color;
            }
        }
    };
    Game.prototype.setLabel = function (t, pos) {
        var lang = cc.sys.localStorage.getItem('lang');
        if (this.isBusy) {
            if (lang === 'zh') {
                this.text = "更新中...";
            }
            else {
                this.text = "updating...";
            }
        }
        else if (this.playerInfo.t == 0) {
            if (lang === 'zh') {
                this.text = "\u6E38\u620F\u5C1A\u672A\u5F00\u59CB \u884C\u52A8\u70B9: " + this.balance;
            }
            else {
                this.text = "Game not start yet ACTION POINTS: " + this.balance;
            }
        }
        else if (this.playerInfo.t == this.endRound) {
            if (lang === 'zh') {
                this.text = "\u6E38\u620F\u7ED3\u675F \u884C\u52A8\u70B9: " + this.balance;
            }
            else {
                this.text = "Game Over ACTION POINTS: " + this.balance;
            }
        }
        else {
            this.text = "SQUID: " + this.gold + " OKT: " + this.balance + " HP: " + this.hp + " HEP: " + this.hep;
            //this.text += `${this.endRound - this.t}回合后游戏结束`
        }
        this.label.string = this.text;
    };
    Game.prototype.setAttackMessage = function (A, B, n) {
        var lang = cc.sys.localStorage.getItem('lang');
        if (lang === 'zh') {
            this.messageLabel.string = A + "\u653B\u51FB\u4E86" + B + "\uFF0C\u9020\u6210\u4E86" + n + "\u70B9\u4F24\u5BB3\n" + this.messageLabel.string;
        }
        else {
            this.messageLabel.string = A + " hits " + B + "\uFF0Cdeals " + n + " points of damage\n" + this.messageLabel.string;
        }
    };
    Game.prototype.setDieMessage = function (A, B, n) {
        var lang = cc.sys.localStorage.getItem('lang');
        if (lang === 'zh') {
            this.messageLabel.string = A + "\u51FB\u6740\u4E86" + B + "\uFF0C\u83B7\u5F97\u4E86" + n + "\u4E2A\u9C7F\u9C7C\u5E01\n" + this.messageLabel.string;
        }
        else {
            this.messageLabel.string = A + " killed " + B + "\uFF0Crob " + n + " SQUIDs\n" + this.messageLabel.string;
        }
        this.spawnNewDieDialog(B);
    };
    Game.prototype.leaveGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rogueLandSigner, tx, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.leaveButton.interactable = false;
                        rogueLandSigner = this.rogueLandContract.connect(this.wallet);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, rogueLandSigner.claimRewards()];
                    case 2:
                        tx = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        cc.log(e_2);
                        return [3 /*break*/, 4];
                    case 4:
                        this.setDieMessage(this.userName, this.userName, this.gold);
                        return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.buyLand = function () {
        return __awaiter(this, void 0, void 0, function () {
            var buildingSigner, tx, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        buildingSigner = this.buildingContract.connect(this.wallet);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, buildingSigner.mint(this.landPos.x, this.landPos.y)];
                    case 2:
                        tx = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        cc.log(e_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.build = function (kind) {
        return __awaiter(this, void 0, void 0, function () {
            var buildingSigner, tx, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        buildingSigner = this.buildingContract.connect(this.wallet);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, buildingSigner.build(this.landPos.x, this.landPos.y, kind)];
                    case 2:
                        tx = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_4 = _a.sent();
                        cc.log(e_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.useHEP = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rogueLandSigner, tx, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.useButton.interactable = false;
                        rogueLandSigner = this.rogueLandContract.connect(this.wallet);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, rogueLandSigner.useHEP(this.id)];
                    case 2:
                        tx = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_5 = _a.sent();
                        cc.log(e_5);
                        return [3 /*break*/, 4];
                    case 4:
                        //this.balance = this.balance - 2
                        this.hep--;
                        this.hp = Math.min(this.hp + 10, 15);
                        if (this.hep > 0) {
                            this.useButton.interactable = true;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.attack = function (to, _seed, _name) {
        return __awaiter(this, void 0, void 0, function () {
            var abiCoder, seedA, seedB, rogueLandSigner, tx, e_6, diceA, diceB, _damage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        abiCoder = new ethers_umd_min_js_1.ethers.utils.AbiCoder();
                        cc.log(this.seed, _seed);
                        seedA = ethers_umd_min_js_1.ethers.BigNumber.from(ethers_umd_min_js_1.ethers.utils.keccak256(abiCoder.encode(["uint", "uint"], [this.id, _seed])));
                        seedB = ethers_umd_min_js_1.ethers.BigNumber.from(ethers_umd_min_js_1.ethers.utils.keccak256(abiCoder.encode(["uint", "uint"], [to, this.seed])));
                        this.seed = seedB;
                        if (this.balance < 0)
                            return [2 /*return*/];
                        rogueLandSigner = this.rogueLandContract.connect(this.wallet);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, rogueLandSigner.attack(this.id, to)];
                    case 2:
                        tx = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_6 = _a.sent();
                        cc.log(e_6);
                        return [3 /*break*/, 4];
                    case 4:
                        diceA = seedA.mod(100);
                        diceB = seedB.mod(100);
                        cc.log(Number(diceA), Number(diceB));
                        _damage = 0;
                        if (diceA / 5 + 1 < 19) {
                            _damage = (diceA) % 5 + 1;
                            this.setAttackMessage(this.userName, _name, diceA % 5 + 1);
                        }
                        else {
                            this.setAttackMessage(this.userName, _name, 0);
                        }
                        if (diceB / 5 + 1 < 19) {
                            this.hp -= ((diceB) % 5 + 1);
                            this.setAttackMessage(_name, this.userName, diceB % 5 + 1);
                            if (this.hp <= 0) {
                                this.setDieMessage(_name, this.userName, Number(this.gold));
                            }
                        }
                        else {
                            this.setAttackMessage(_name, this.userName, 0);
                        }
                        return [2 /*return*/, { damage: _damage, newSeed: seedA, name: this.userName }
                            //cc.log(tx.gasPrice/1e9*tx.gasLimit)
                            //this.updateMap()
                            //this.getGoldInfo()
                        ];
                }
            });
        });
    };
    Game.prototype.getPunkInfo = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var punkInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.rogueLandContract.getPunkInfo(id)];
                    case 1:
                        punkInfo = _a.sent();
                        return [2 /*return*/, {
                                name: punkInfo.name,
                                isMoving: Number(punkInfo.isMoving),
                                gold: ethers_umd_min_js_1.ethers.utils.formatEther(punkInfo.totalGold),
                                hp: Number(punkInfo.hp),
                                evil: Number(punkInfo.evil),
                                seed: punkInfo.seed.toHexString(),
                                address: punkInfo.player
                            }];
                }
            });
        });
    };
    Game.prototype.loadPunk = function () {
        return __awaiter(this, void 0, void 0, function () {
            var punkId, sprite_2, remoteUrl;
            return __generator(this, function (_a) {
                punkId = JSON.parse(cc.sys.localStorage.getItem('myPunk'));
                if (punkId > 0) {
                    this.id = punkId;
                    sprite_2 = this.node.getChildByName('Player').getComponent(cc.Sprite);
                    remoteUrl = "https://www.losernft.org/ipfs/" + this.loserpunkJson.json[punkId - 1].hash;
                    cc.assetManager.loadRemote(remoteUrl, { ext: '.png', cacheEnabled: true }, function (err, pic) {
                        if (err) {
                            cc.log('LoadNetImg load error,error:' + err);
                            return;
                        }
                        sprite_2.spriteFrame = new cc.SpriteFrame(pic);
                    });
                }
                else {
                    cc.log("no punk");
                }
                return [2 /*return*/];
            });
        });
    };
    Game.prototype.getStatus = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.playerAddress = cc.sys.localStorage.getItem('address');
                if (this.playerAddress == '') {
                    cc.log('visitor');
                    this.provider = new ethers_umd_min_js_1.ethers.providers.JsonRpcProvider("https://exchainrpc.okex.org");
                    this.modeButton.interactable = false;
                }
                else {
                    cc.log(this.playerAddress);
                    this.provider = new ethers_umd_min_js_1.ethers.providers.Web3Provider(window.ethereum);
                    this.wallet = this.provider.getSigner();
                }
                this.rogueLandContract = new ethers_umd_min_js_1.ethers.Contract(this.rogueLandAddress, this.rogueLandJson.json.abi, this.provider);
                this.buildingContract = new ethers_umd_min_js_1.ethers.Contract(this.buildingAddress, this.buildingJson.json.abi, this.provider);
                this.landContract = new ethers_umd_min_js_1.ethers.Contract(this.landAddress, this.landJson.json.abi, this.provider);
                this.goViewMode();
                this.mapSize = 24;
                this.spawnNewCross(Number(this.mapSize) + 1);
                this.spawnNewCircle();
                return [2 /*return*/];
            });
        });
    };
    Game.prototype.setMinimapBoundary = function () {
        var n = Number(this.mapSize) + 1;
        for (var x = -n; x <= n; x++) {
            this.setMiniMap(x, n, 2);
            this.setMiniMap(x, -n, 2);
        }
        for (var y = -n + 1; y < n; y++) {
            this.setMiniMap(n, y, 2);
            this.setMiniMap(-n, y, 2);
        }
    };
    Game.prototype.resetMinimap = function () {
        for (var i = 0; i <= 50; i++) {
            for (var j = 0; j <= 50; j++) {
                this.tiledLayer.setTileGIDAt(1, i, j, 0);
            }
        }
        this.setMinimapBoundary();
    };
    Game.prototype.loadAccount = function (e, msg) {
        cc.director.loadScene("welcome");
    };
    Game.prototype.updateMap = function () {
        return __awaiter(this, void 0, void 0, function () {
            var center, x1, x2, y1, y2, minimap, gamemap, node, node, i, x, y;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.changeTimeButton();
                        if (!!this.isBusy) return [3 /*break*/, 3];
                        this.isBusy = true;
                        center = this.getPosition();
                        x1 = center.x - 7;
                        x2 = center.x + 7;
                        y1 = center.y - 5;
                        y2 = center.y + 5;
                        return [4 /*yield*/, this.rogueLandContract.getEvents(x1, y1, x2, y2, this.t)];
                    case 1:
                        minimap = _a.sent();
                        return [4 /*yield*/, this.buildingContract.getLandInfo(x1, y1, x2, y2)];
                    case 2:
                        gamemap = _a.sent();
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
                                if (gamemap[i] != 0) {
                                    //cc.log(x, y)
                                    this.setGameMap(x, y, gamemap[i]);
                                    if (minimap[i] == this.id && gamemap[i] == 1 && this.playerInfo.t == this.t) {
                                        this.leaveButton.interactable = true;
                                    }
                                }
                                if (minimap[i] != 0 && !(this.mode == "schedule" && minimap[i] == this.id)) {
                                    //cc.log(minimap[i].movingPunk, x, y)
                                    this.spawnNewPunk(x * 64, y * 64, minimap[i], gamemap[i] == 1);
                                    if (minimap[i] % 2 == 0) {
                                        this.setMiniMap(x, y, 4);
                                    }
                                    else {
                                        this.setMiniMap(x, y, 5);
                                    }
                                    this.validToGo["x" + x + "y" + y] = (gamemap[i] == 1);
                                }
                                else {
                                    this.validToGo["x" + x + "y" + y] = true;
                                }
                                i++;
                            }
                        }
                        this.setMiniMap(this.playerInfo.x, this.playerInfo.y, 6);
                        this.isBusy = false;
                        return [3 /*break*/, 4];
                    case 3:
                        cc.log('isBusy');
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.goViewMode = function () {
        return __awaiter(this, void 0, void 0, function () {
            var statusInfo, myPunk, okt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.rogueLandContract.getCurrentStatus(this.id)];
                    case 1:
                        statusInfo = _a.sent();
                        this.mode = "view";
                        this.t = statusInfo.t;
                        this.playerInfo.t = statusInfo.t;
                        this.playerInfo.x = statusInfo.x;
                        this.playerInfo.y = statusInfo.y;
                        this.player.zIndex = 0;
                        this.player.x = statusInfo.x * 64;
                        this.player.y = statusInfo.y * 64;
                        this.minimapCenter.x = statusInfo.x;
                        this.minimapCenter.y = statusInfo.y;
                        this.resetMinimap();
                        this.updateMap();
                        if (this.playerInfo.t == this.endRound) {
                            //this.modeButton.interactable = false
                            //return;
                        }
                        return [4 /*yield*/, this.rogueLandContract.getPunkInfo(this.id)];
                    case 2:
                        myPunk = _a.sent();
                        this.gold = ethers_umd_min_js_1.ethers.utils.formatEther(myPunk.totalGold);
                        this.hp = myPunk.hp;
                        this.hep = cc.sys.localStorage.getItem('hep');
                        if (myPunk.name == "") {
                            this.userName = myPunk.player.slice(0, 6);
                        }
                        else {
                            this.userName = myPunk.name;
                        }
                        this.seed = myPunk.seed.toHexString();
                        if (this.hep > 0) {
                            this.useButton.interactable = true;
                        }
                        if (Math.abs(statusInfo.x) == 25 || Math.abs(statusInfo.y) == 25) {
                            //this.leaveButton.interactable = true
                        }
                        this.block = myPunk.blockNumber;
                        return [4 /*yield*/, this.wallet.getBalance()];
                    case 3:
                        okt = _a.sent();
                        this.balance = Math.floor(ethers_umd_min_js_1.ethers.utils.formatEther(okt) * 10000) / 10000;
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
                        this.t = Number(statusInfo.t) + 1;
                        this.currentSchedule = statusInfo.t;
                        this.player.zIndex = 3;
                        this.toCommit = statusInfo.t;
                        this.player.x = statusInfo.x * 64;
                        this.player.y = statusInfo.y * 64;
                        this.resetMinimap();
                        this.updateMap();
                        return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.switchMode = function (e, msg) {
        var lang = cc.sys.localStorage.getItem('lang');
        if (this.mode == "view" && this.id > 0) {
            this.goScheduleMode();
            if (lang === 'zh') {
                this.switchLabel.string = "退出规划";
            }
            else {
                this.switchLabel.string = "View Mode";
            }
        }
        else if (this.mode == "schedule") {
            this.goViewMode();
            if (lang === 'zh') {
                this.switchLabel.string = "准备行动";
            }
            else {
                this.switchLabel.string = "Take Actions";
            }
        }
    };
    Game.prototype.setPosition = function (node, x, y) {
        node.x = x;
        node.y = y;
    };
    Game.prototype.getPosition = function () {
        return { x: Math.round(this.player.x / 64), y: Math.round(this.player.y / 64) };
    };
    Game.prototype.update = function (dt) {
        var x = this.player.x;
        var y = this.player.y;
        this.setPosition(this.camera, x, y);
        this.setPosition(this.label.node, x, y + 250);
        this.setPosition(this.time_button_group, x, y - 280);
        this.setPosition(this.button_group_2, x + 330, y + 140);
        this.setLabel(this.t, this.getPosition());
        if (this.mode == "schedule") {
            this.setPosition(this.playerInfo, x / 64, y / 64);
        }
    };
    Game.prototype.click_arrow = function (e, msg) {
        // 任何都会导致punk无法拾取lowb
        // this.pickButton.interactable = false
        if (this.isBusy) {
            return;
        }
        switch (msg) {
            case "left":
                if (this.mode == "schedule") {
                    this.commitMove(this.player.x / 64 - 1, this.player.y / 64, Action.GoLeft);
                }
                this.player.getComponent('Player').moveWest();
                break;
            case "right":
                if (this.mode == "schedule") {
                    this.commitMove(this.player.x / 64 + 1, this.player.y / 64, Action.GoRight);
                }
                this.player.getComponent('Player').moveEast();
                break;
            case "down":
                if (this.mode == "schedule") {
                    this.commitMove(this.player.x / 64, this.player.y / 64 - 1, Action.GoDown);
                }
                this.player.getComponent('Player').moveSouth();
                break;
            case "up":
                if (this.mode == "schedule") {
                    this.commitMove(this.player.x / 64, this.player.y / 64 + 1, Action.GoUp);
                }
                this.player.getComponent('Player').moveNorth();
                break;
            case "left-up":
                if (this.mode == "schedule") {
                    this.commitMove(this.player.x / 64 - 1, this.player.y / 64 + 1, Action.GoLeftUp);
                }
                this.player.getComponent('Player').moveNorthWest();
                break;
            case "right-down":
                if (this.mode == "schedule") {
                    this.commitMove(this.player.x / 64 + 1, this.player.y / 64 - 1, Action.GoRightDown);
                }
                this.player.getComponent('Player').moveSouthEast();
                break;
            case "right-up":
                if (this.mode == "schedule") {
                    this.commitMove(this.player.x / 64 + 1, this.player.y / 64 + 1, Action.GoRightUp);
                }
                this.player.getComponent('Player').moveNorthEast();
                break;
            case "left-down":
                if (this.mode == "schedule") {
                    this.commitMove(this.player.x / 64 - 1, this.player.y / 64 - 1, Action.GoLeftDown);
                }
                this.player.getComponent('Player').moveSouthWest();
                break;
            case "+":
                if (this.mode == "view" && !this.isBusy) {
                    this.t++;
                    this.resetMinimap();
                    this.updateMap();
                }
                break;
            case "-":
                if (this.mode == "view" && this.t > 0 && !this.isBusy) {
                    this.t--;
                    this.resetMinimap();
                    this.updateMap();
                }
                break;
        }
    };
    Game.prototype.onKeyDown = function (event) {
        // 任何都会导致punk无法拾取lowb
        // this.pickButton.interactable = false
        if (this.isBusy) {
            return;
        }
        switch (event.keyCode) {
            case cc.macro.KEY.h:
            case cc.macro.KEY.left:
                if (this.mode == "schedule") {
                    this.commitMove(this.player.x / 64 - 1, this.player.y / 64, Action.GoLeft);
                }
                else {
                    this.updateMap();
                }
                this.player.getComponent('Player').moveWest();
                break;
            case cc.macro.KEY.l:
            case cc.macro.KEY.right:
                if (this.mode == "schedule") {
                    this.commitMove(this.player.x / 64 + 1, this.player.y / 64, Action.GoRight);
                }
                else {
                    this.updateMap();
                }
                this.player.getComponent('Player').moveEast();
                break;
            case cc.macro.KEY.k:
            case cc.macro.KEY.down:
                if (this.mode == "schedule") {
                    this.commitMove(this.player.x / 64, this.player.y / 64 - 1, Action.GoDown);
                }
                else {
                    this.updateMap();
                }
                this.player.getComponent('Player').moveSouth();
                break;
            case cc.macro.KEY.j:
            case cc.macro.KEY.up:
                if (this.mode == "schedule") {
                    this.commitMove(this.player.x / 64, this.player.y / 64 + 1, Action.GoUp);
                }
                else {
                    this.updateMap();
                }
                this.player.getComponent('Player').moveNorth();
                break;
            case cc.macro.KEY.y:
                if (this.mode == "schedule") {
                    this.commitMove(this.player.x / 64 - 1, this.player.y / 64 + 1, Action.GoLeftUp);
                }
                else {
                    this.updateMap();
                }
                this.player.getComponent('Player').moveNorthWest();
                break;
            case cc.macro.KEY.n:
                if (this.mode == "schedule") {
                    this.commitMove(this.player.x / 64 + 1, this.player.y / 64 - 1, Action.GoRightDown);
                }
                else {
                    this.updateMap();
                }
                this.player.getComponent('Player').moveSouthEast();
                break;
            case cc.macro.KEY.u:
                if (this.mode == "schedule") {
                    this.commitMove(this.player.x / 64 + 1, this.player.y / 64 + 1, Action.GoRightUp);
                }
                else {
                    this.updateMap();
                }
                this.player.getComponent('Player').moveNorthEast();
                break;
            case cc.macro.KEY.b:
                if (this.mode == "schedule") {
                    this.commitMove(this.player.x / 64 - 1, this.player.y / 64 - 1, Action.GoLeftDown);
                }
                else {
                    this.updateMap();
                }
                this.player.getComponent('Player').moveSouthWest();
                break;
            case cc.macro.KEY['+']:
                if (this.mode == "view" && !this.isBusy) {
                    this.t++;
                    this.resetMinimap();
                    this.updateMap();
                }
                break;
            case cc.macro.KEY['-']:
                if (this.mode == "view" && this.t > 0 && !this.isBusy) {
                    this.t--;
                    this.resetMinimap();
                    this.updateMap();
                }
                break;
        }
    };
    Game.prototype.onTouchMove = function (t) {
        if (this.mode == "view") {
            var delta = t.getDelta();
            this.player.x -= delta.x;
            this.player.y -= delta.y;
        }
    };
    Game.prototype.onTouchEnd = function (t) {
        if (this.mode == "view") {
            var deltaX = t.getLocation().x - t.getStartLocation().x;
            var deltaY = t.getLocation().y - t.getStartLocation().y;
            //cc.log(deltaX, deltaY)
            if (Math.abs(deltaX) > 64 || Math.abs(deltaY) > 64) {
                this.updateMap();
            }
            else {
                //const center = this.getPosition()
                var windowSize = cc.view.getVisibleSize();
                cc.log("width=" + windowSize.width + ",height=" + windowSize.height);
                this.landPos.x = Math.round((t.getLocation().x + this.player.x - windowSize.width / 2) / 64);
                this.landPos.y = Math.round((t.getLocation().y + this.player.y - windowSize.height / 2) / 64);
                this.spawnNewLandInfo();
                cc.log(Math.floor(t.getLocation().x / 64), Math.floor(t.getLocation().y / 64));
            }
        }
    };
    Game.prototype.setGameMap = function (x_, y_, kind) {
        var gid = 0;
        if (kind == 0) {
            gid = 8;
        }
        else if (kind == 1) {
            gid = 9;
        }
        else {
            gid = kind - 1;
        }
        var x = x_ + 24;
        var y = y_ + 24;
        if (x >= 0 && x <= 48 && y >= 0 && y <= 48) {
            this.gameLayer.setTileGIDAt(gid, x, 48 - y, 0);
        }
    };
    Game.prototype.setMiniMap = function (x_, y_, gid_) {
        //cc.log(x_, y_, gid_)
        var x = x_ - this.minimapCenter.x + 25;
        var y = y_ - this.minimapCenter.y + 25;
        if (x >= 0 && x <= 50 && y >= 0 && y <= 50) {
            this.tiledLayer.setTileGIDAt(gid_, x, 50 - y, 0);
        }
    };
    Game.prototype.onLoad = function () {
        this.label.node.zIndex = 5;
        this.time_button_group.zIndex = 5;
        this.button_group_2.zIndex = 5;
        this.gameMap.node.zIndex = 2;
        this.leaveButton.interactable = false;
        this.useButton.interactable = false;
        // 生成草地
        for (var i = -9; i <= 9; i++) {
            for (var j = -6; j <= 6; j++) {
                this.spawnNewGrass(i * 64, j * 64);
            }
        }
        for (var i = -2; i <= 2; i++) {
            this.spawnTimeButton(64 * i, 0, i + 2);
        }
        this.tiledLayer = this.smallMap.getLayer("background");
        this.gameLayer = this.gameMap.getLayer("game_map");
        // 初始化键盘输入监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    };
    Game.prototype.start = function () {
        // init logic
        var lang = cc.sys.localStorage.getItem('lang');
        this.messageLabel.string = (lang === 'zh' ? '游戏消息\n' : 'Game Message\n');
        this.loadPunk();
        this.getStatus();
    };
    __decorate([
        property(cc.Label)
    ], Game.prototype, "label", void 0);
    __decorate([
        property(cc.Label)
    ], Game.prototype, "switchLabel", void 0);
    __decorate([
        property(cc.Label)
    ], Game.prototype, "messageLabel", void 0);
    __decorate([
        property(cc.Button)
    ], Game.prototype, "modeButton", void 0);
    __decorate([
        property(cc.Button)
    ], Game.prototype, "leaveButton", void 0);
    __decorate([
        property(cc.Button)
    ], Game.prototype, "useButton", void 0);
    __decorate([
        property(cc.TiledMap)
    ], Game.prototype, "smallMap", void 0);
    __decorate([
        property(cc.TiledMap)
    ], Game.prototype, "gameMap", void 0);
    __decorate([
        property
    ], Game.prototype, "text", void 0);
    __decorate([
        property(cc.Prefab)
    ], Game.prototype, "grassPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], Game.prototype, "crossPrefab", void 0);
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
        property(cc.Prefab)
    ], Game.prototype, "redStarPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], Game.prototype, "blueStarPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], Game.prototype, "circlePrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], Game.prototype, "diePrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], Game.prototype, "punkInfoPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], Game.prototype, "goldInfoPrefab", void 0);
    __decorate([
        property(cc.JsonAsset)
    ], Game.prototype, "rogueLandJson", void 0);
    __decorate([
        property(cc.JsonAsset)
    ], Game.prototype, "buildingJson", void 0);
    __decorate([
        property(cc.JsonAsset)
    ], Game.prototype, "loserpunkJson", void 0);
    __decorate([
        property(cc.JsonAsset)
    ], Game.prototype, "landJson", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "player", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "time_button_group", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "button_group_2", void 0);
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