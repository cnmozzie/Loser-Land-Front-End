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
        _this.gold = 0;
        _this.pendingGold = 0;
        _this.hp = 0;
        _this.hep = 0;
        _this.endRound = 225;
        _this.minimapSize = 51;
        _this.mapSize = 51;
        _this.eventNumber = 0;
        _this.playerAddress = "";
        _this.userName = 'vistor';
        _this.mode = "view";
        _this.isBusy = false;
        _this.registerAddress = '0x76f099cd22E737FC38f17FA07aA95dACe8e53e4e';
        _this.rogueLandAddress = '0x4fB911AD82321a3639626260156b0f0ea3bd0d02';
        _this.rogueLandContract = null;
        _this.provider = null;
        _this.wallet = null;
        _this.validToGo = {};
        _this.playerInfo = { x: 0, y: 0, t: 0 };
        _this.toPick = { x: 0, y: 0 };
        _this.minimapCenter = { x: 0, y: 0 };
        _this.timeList = [];
        _this.punks = [];
        _this.chests = [];
        _this.tiledLayer = null;
        _this.label = null;
        _this.switchLabel = null;
        _this.messageLabel = null;
        _this.modeButton = null;
        _this.swapButton = null;
        _this.makeButton = null;
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
        _this.diePrefab = null;
        _this.punkInfoPrefab = null;
        _this.goldInfoPrefab = null;
        _this.registerJson = null;
        _this.rogueLandJson = null;
        _this.loserpunkJson = null;
        // Player ????????????????????????????????????
        _this.player = null;
        // ??????????????????
        _this.time_button_group = null;
        // ?????????????????????????????????
        _this.button_group_2 = null;
        // Camera ???????????????????????????????????????
        _this.camera = null;
        return _this;
    }
    Game.prototype.spawnNewDieDialog = function (name) {
        // ??????????????????????????????????????????????????????
        var newDialog = cc.instantiate(this.diePrefab);
        // ??????????????????????????? Canvas ????????????
        this.node.addChild(newDialog);
        newDialog.zIndex = 6;
        // ?????????????????????
        newDialog.setPosition(cc.v2(this.player.x, this.player.y));
        // ????????????????????????????????? Game ???????????????
        newDialog.getComponent('DieDialog').setText(name);
    };
    Game.prototype.spawnNewPunkInfo = function (id, x, y) {
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
                        if (id != this.id && this.t == this.playerInfo.t && Math.abs(x - this.playerInfo.x) <= 1 && Math.abs(y - this.playerInfo.y) <= 1 && !info.isMoving && Math.abs(x) < 25 && Math.abs(y) < 25 && Math.abs(this.playerInfo.x) < 25 && Math.abs(this.playerInfo.y) < 25) {
                            newDialog.getComponent('PunkInfo').setAttack(true);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.spawnNewGoldInfo = function (x, y) {
        return __awaiter(this, void 0, void 0, function () {
            var newDialog, info;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newDialog = cc.instantiate(this.goldInfoPrefab);
                        this.node.addChild(newDialog);
                        newDialog.zIndex = 6;
                        newDialog.setPosition(cc.v2(this.player.x, this.player.y));
                        return [4 /*yield*/, this.rogueLandContract.goldOn(x, y)];
                    case 1:
                        info = _a.sent();
                        newDialog.getComponent('GoldDialog').setLabel({ amount: info.amount, punkNumber: info.punkNumber, time: info.vaildTime - this.playerInfo.t });
                        return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.spawnNewGrass = function (x, y) {
        // ??????????????????????????????????????????????????????
        var newGrass = cc.instantiate(this.grassPrefab);
        // ??????????????????????????? Canvas ????????????
        this.node.addChild(newGrass);
        // ?????????????????????
        newGrass.setPosition(cc.v2(x, y));
        // ?????????????????????????????? Camera ???????????????
        newGrass.getComponent('Grass').camera = this.camera;
        //newGrass.on(cc.Node.EventType.TOUCH_START,function(t){cc.log("????????????");},this)
        //??????
        newGrass.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        newGrass.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        newGrass.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    };
    Game.prototype.spawnNewCross = function (n) {
        for (var x = -n; x <= n; x++) {
            // ??????????????????????????????????????????????????????
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
            // ??????????????????????????????????????????????????????
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
    Game.prototype.spawnNewChest = function (x, y) {
        // ??????????????????????????????????????????????????????
        var newChest = cc.instantiate(this.chestPrefab);
        // ??????????????????????????? Canvas ????????????
        this.node.addChild(newChest);
        newChest.zIndex = 2;
        // ?????????????????????
        newChest.setPosition(cc.v2(x, y));
        this.chests.push(newChest);
        newChest.on(cc.Node.EventType.TOUCH_START, function (event) {
            this.spawnNewGoldInfo(x / 64, y / 64);
        }, this);
    };
    Game.prototype.spawnNewPunk = function (x, y, id) {
        //cc.log(x, y, id.toString())
        // ??????????????????????????????????????????????????????
        var newPunk = cc.instantiate(this.punkPrefab);
        var newStar;
        if (id % 2 == 0) {
            newStar = cc.instantiate(this.redStarPrefab);
        }
        else {
            newStar = cc.instantiate(this.blueStarPrefab);
        }
        // ??????????????????????????? Canvas ????????????
        this.node.addChild(newPunk);
        newPunk.addChild(newStar);
        newStar.setPosition(cc.v2(20, 20));
        newPunk.zIndex = 4;
        // ??????punk?????????
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
            this.spawnNewPunkInfo(id, x / 64, y / 64);
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
                        // ??????1??????
                        this.t++;
                        // ????????????
                        this.resetMinimap();
                        this.updateMap();
                        rogueLandSigner = this.rogueLandContract.connect(this.wallet);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, rogueLandSigner.scheduleAction(this.id, action, { gasLimit: 300000, gasPrice: 1000000000 })];
                    case 2:
                        tx = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        cc.log(e_1);
                        return [3 /*break*/, 4];
                    case 4:
                        this.balance = this.balance - 3;
                        this.gold = Number(this.gold) + Number(this.pendingGold);
                        this.pendingGold = 0;
                        if (this.gold >= 1000) {
                            this.swapButton.interactable = true;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.spawnTimeButton = function (x, y, t) {
        // ??????????????????????????????????????????????????????
        var newNumber = cc.instantiate(this.numberPrefab);
        // ??????????????????????????? Canvas ????????????
        this.time_button_group.addChild(newNumber);
        // ?????????????????????
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
                this.text = "?????????...";
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
            if (lang === 'zh') {
                this.text = "\u91D1\u5E01: " + this.gold + "(" + this.pendingGold + ") \u884C\u52A8\u70B9: " + this.balance + " \u751F\u547D\u503C: " + this.hp + " \u836F\u6C34: " + this.hep + "\n" + (this.endRound - this.t) + "\u56DE\u5408\u540E\u6E38\u620F\u7ED3\u675F";
            }
            else {
                this.text = "GOLD: " + this.gold + "(" + this.pendingGold + ") ACTION POINTS: " + this.balance + " HP: " + this.hp + " HEP: " + this.hep + "\nGame will end in {this.endRound-this.t} rounds";
            }
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
            this.messageLabel.string = A + "\u51FB\u6740\u4E86" + B + "\uFF0C\u83B7\u5F97\u4E86" + n + "\u4E2A\u91D1\u5E01\n" + this.messageLabel.string;
        }
        else {
            this.messageLabel.string = A + " killed " + B + "\uFF0Crob " + n + " golds\n" + this.messageLabel.string;
        }
        this.spawnNewDieDialog(B);
    };
    Game.prototype.swap = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rogueLandSigner, tx, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.swapButton.interactable = false;
                        if (this.gold < 1200) {
                            this.makeButton.interactable = false;
                        }
                        rogueLandSigner = this.rogueLandContract.connect(this.wallet);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, rogueLandSigner.swapOKT(this.playerAddress, { gasPrice: 1000000000 })];
                    case 2:
                        tx = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        cc.log(e_2);
                        return [3 /*break*/, 4];
                    case 4:
                        this.balance = this.balance + 100;
                        this.gold = this.gold - 1000;
                        if (this.gold >= 1000) {
                            this.swapButton.interactable = true;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.makeHEP = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rogueLandSigner, tx, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.makeButton.interactable = false;
                        rogueLandSigner = this.rogueLandContract.connect(this.wallet);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, rogueLandSigner.swapHEP({ gasPrice: 1000000000 })];
                    case 2:
                        tx = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        cc.log(e_3);
                        return [3 /*break*/, 4];
                    case 4:
                        this.balance = this.balance - 2;
                        this.hep++;
                        this.gold = this.gold - 200;
                        this.useButton.interactable = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.useHEP = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rogueLandSigner, tx, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.useButton.interactable = false;
                        rogueLandSigner = this.rogueLandContract.connect(this.wallet);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, rogueLandSigner.useHEP(this.id, { gasPrice: 1000000000 })];
                    case 2:
                        tx = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_4 = _a.sent();
                        cc.log(e_4);
                        return [3 /*break*/, 4];
                    case 4:
                        this.balance = this.balance - 2;
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
            var abiCoder, seedA, seedB, rogueLandSigner, tx, e_5, diceA, diceB, _damage;
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
                        return [4 /*yield*/, rogueLandSigner.attack(this.id, to, { gasPrice: 1000000000 })];
                    case 2:
                        tx = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_5 = _a.sent();
                        cc.log(e_5);
                        return [3 /*break*/, 4];
                    case 4:
                        diceA = seedA.mod(100);
                        diceB = seedB.mod(100);
                        cc.log(Number(diceA), Number(diceB));
                        this.balance = this.balance - 5;
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
                                this.setDieMessage(_name, this.userName, Number(this.gold) + Number(this.pendingGold));
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
                                gold: Number(punkInfo.gold),
                                pendingGold: Number(punkInfo.pendingGold),
                                hp: Number(punkInfo.hp),
                                hep: Number(punkInfo.hep),
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
            var walletData, walletPrivateKey;
            return __generator(this, function (_a) {
                walletData = JSON.parse(cc.sys.localStorage.getItem('wallet'));
                walletPrivateKey = new ethers_umd_min_js_1.ethers.Wallet(walletData.privateKey);
                this.playerAddress = walletData.address;
                this.provider = new ethers_umd_min_js_1.ethers.providers.JsonRpcProvider("https://exchaintestrpc.okex.org");
                this.wallet = walletPrivateKey.connect(this.provider);
                this.rogueLandContract = new ethers_umd_min_js_1.ethers.Contract(this.rogueLandAddress, this.rogueLandJson.json.abi, this.provider);
                //this.modeButton.interactable = false
                this.goViewMode();
                this.mapSize = 24;
                this.spawnNewCross(Number(this.mapSize) + 1);
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
            var center, x1, x2, y1, y2, map, node, node, i, x, y;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.changeTimeButton();
                        if (!!this.isBusy) return [3 /*break*/, 2];
                        this.isBusy = true;
                        center = this.getPosition();
                        x1 = center.x - 7;
                        x2 = center.x + 7;
                        y1 = center.y - 5;
                        y2 = center.y + 5;
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
                                if (map[i] != 0 && !(this.mode == "schedule" && map[i] == this.id)) {
                                    //cc.log(map[i].movingPunk, x, y)
                                    this.spawnNewPunk(x * 64, y * 64, map[i]);
                                    if (map[i] % 2 == 0) {
                                        this.setMiniMap(x, y, 4);
                                    }
                                    else {
                                        this.setMiniMap(x, y, 5);
                                    }
                                    this.validToGo["x" + x + "y" + y] = false;
                                }
                                else {
                                    this.validToGo["x" + x + "y" + y] = true;
                                }
                                i++;
                            }
                        }
                        this.setMiniMap(this.playerInfo.x, this.playerInfo.y, 6);
                        this.isBusy = false;
                        return [3 /*break*/, 3];
                    case 2:
                        cc.log('isBusy');
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.getEvent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var statusInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.goViewMode();
                        return [4 /*yield*/, this.rogueLandContract.getEvent(this.id)];
                    case 1:
                        statusInfo = _a.sent();
                        if (statusInfo.t > this.eventNumber) {
                            this.toPick.x = statusInfo.x;
                            this.toPick.y = statusInfo.y;
                            this.eventNumber = statusInfo.t;
                            this.pick();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.goViewMode = function () {
        return __awaiter(this, void 0, void 0, function () {
            var statusInfo, myPunk, okt, isCook;
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
                            this.modeButton.interactable = false;
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.rogueLandContract.getPunkInfo(this.id)];
                    case 2:
                        myPunk = _a.sent();
                        this.gold = myPunk.gold;
                        this.pendingGold = myPunk.pendingGold;
                        this.hp = myPunk.hp;
                        this.hep = myPunk.hep;
                        if (myPunk.name == "") {
                            this.userName = myPunk.player.slice(0, 6);
                        }
                        else {
                            this.userName = myPunk.name;
                        }
                        this.seed = myPunk.seed.toHexString();
                        if (this.gold >= 1000 && this.playerInfo.t < this.endRound) {
                            this.swapButton.interactable = true;
                        }
                        if (this.hep > 0 && this.playerInfo.t < this.endRound) {
                            this.useButton.interactable = true;
                        }
                        return [4 /*yield*/, this.wallet.getBalance()];
                    case 3:
                        okt = _a.sent();
                        this.balance = Math.floor(ethers_umd_min_js_1.ethers.utils.formatEther(okt) * 10000);
                        return [4 /*yield*/, this.rogueLandContract.cooked(this.id, this.t)];
                    case 4: return [4 /*yield*/, _a.sent()];
                    case 5:
                        isCook = _a.sent();
                        if (!isCook && this.gold >= 200) {
                            this.makeButton.interactable = true;
                        }
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
                this.switchLabel.string = "????????????";
            }
            else {
                this.switchLabel.string = "View Mode";
            }
        }
        else if (this.mode == "schedule") {
            this.goViewMode();
            if (lang === 'zh') {
                this.switchLabel.string = "????????????";
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
        // ??????????????????punk????????????lowb
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
        // ??????????????????punk????????????lowb
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
            this.updateMap();
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
        this.swapButton.interactable = false;
        this.makeButton.interactable = false;
        this.useButton.interactable = false;
        // ????????????
        //let windowSize=cc.view.getVisibleSize();
        //cc.log("width="+windowSize.width+",height="+windowSize.height);
        for (var i = -9; i <= 9; i++) {
            for (var j = -6; j <= 6; j++) {
                this.spawnNewGrass(i * 64, j * 64);
            }
        }
        for (var i = -2; i <= 2; i++) {
            this.spawnTimeButton(64 * i, 0, i + 2);
        }
        this.tiledLayer = this.smallMap.getLayer("background");
        // ???????????????????????????
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    };
    Game.prototype.start = function () {
        // init logic
        var lang = cc.sys.localStorage.getItem('lang');
        this.messageLabel.string = (lang === 'zh' ? '????????????\n' : 'Game Message\n');
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
    ], Game.prototype, "swapButton", void 0);
    __decorate([
        property(cc.Button)
    ], Game.prototype, "makeButton", void 0);
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
    ], Game.prototype, "diePrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], Game.prototype, "punkInfoPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], Game.prototype, "goldInfoPrefab", void 0);
    __decorate([
        property(cc.JsonAsset)
    ], Game.prototype, "registerJson", void 0);
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