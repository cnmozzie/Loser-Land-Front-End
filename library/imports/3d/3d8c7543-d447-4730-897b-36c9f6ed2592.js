"use strict";
cc._RF.push(module, '3d8c7VD1EdHMIl7Nsn27SWS', 'Welcome');
// Script/Welcome.ts

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
var Welcome = /** @class */ (function (_super) {
    __extends(Welcome, _super);
    function Welcome() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.okt = 0;
        _this.address = '';
        _this.privateKey = '';
        _this.newRegisterAddress = '0x76f099cd22E737FC38f17FA07aA95dACe8e53e4e';
        _this.registerAddress = '0x5eFa33708a7688Fa116B6Cb3eC65D7fcE3c9f599';
        _this.rogueLandAddress = '0xFDE9DAacCbA3D802BFCBAd54039A4B0DeAA48e85';
        _this.accountInfo = null;
        _this.provider = null;
        _this.wallet = null;
        _this.rogueLandContract = null;
        _this.registerContract = null;
        _this.balance = [0, 0];
        _this.pendingRewards = [0, 0];
        _this.nameLabel = null;
        _this.infoLabel = null;
        _this.balanceLabel = null;
        _this.recordLabel = null;
        _this.chargeButton = null;
        _this.tradeButton = null;
        _this.registerButton = null;
        _this.giftButton = null;
        _this.phoneEditbox = null;
        _this.registerJson = null;
        _this.newRegisterJson = null;
        _this.rogueLandJson = null;
        _this.punkJson = null;
        _this.accountPrefab = null;
        _this.registerPrefab = null;
        _this.rewardPrefab = null;
        _this.rankPrefab = null;
        _this.withdrawPrefab = null;
        return _this;
    }
    Welcome.prototype.startGame = function (e, msg) {
        cc.log('start game');
        cc.director.loadScene("game");
    };
    Welcome.prototype.setWallet = function (wallet) {
        var walletData = { address: wallet.address, privateKey: wallet.privateKey };
        cc.sys.localStorage.setItem('wallet', JSON.stringify(walletData));
        this.address = walletData.address;
        this.privateKey = walletData.privateKey;
    };
    Welcome.prototype.setInfoLabel = function (n) {
        var lang = cc.sys.localStorage.getItem('lang');
        if (lang === 'zh') {
            this.infoLabel.string = "\u5F53\u524D\u8D5B\u5B63\uFF1AS1  \u62A5\u540D\u4EBA\u6570\uFF1A " + n + "/666";
        }
        else {
            this.infoLabel.string = "Current Season: S1  Enrollment: " + n + "/666";
        }
    };
    Welcome.prototype.setBalanceLabel = function () {
        var lang = cc.sys.localStorage.getItem('lang');
        if (lang === 'zh') {
            this.balanceLabel.string = "\u884C\u52A8\u70B9: " + this.okt + "  \u79EF\u5206: " + Math.floor(ethers_umd_min_js_1.ethers.utils.formatEther(this.balance[0])) + "  UMG: " + Math.floor(ethers_umd_min_js_1.ethers.utils.formatEther(this.balance[1]));
        }
        else {
            this.balanceLabel.string = "Action Points: " + this.okt + "  Points: " + Math.floor(ethers_umd_min_js_1.ethers.utils.formatEther(this.balance[0])) + "  UMG: " + Math.floor(ethers_umd_min_js_1.ethers.utils.formatEther(this.balance[1]));
        }
    };
    Welcome.prototype.setRecordLabel = function (id, done) {
        var lang = cc.sys.localStorage.getItem('lang');
        if (lang === 'zh') {
            this.recordLabel.string = "\u6700\u65B0\u63D0\u73B0ID\uFF1A" + id;
            if (!done) {
                this.recordLabel.string += ' (处理中)';
            }
        }
        else {
            this.recordLabel.string = "Latest Withdraw ID\uFF1A" + id;
            if (!done) {
                this.recordLabel.string += ' (Processing)';
            }
        }
    };
    Welcome.prototype.enrollGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rogueLandSigner, tx, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.registerButton.interactable = false;
                        rogueLandSigner = this.rogueLandContract.connect(this.wallet);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, rogueLandSigner.register({ gasLimit: 300000 })];
                    case 2:
                        tx = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        cc.log(e_1);
                        return [3 /*break*/, 4];
                    case 4:
                        this.okt -= 2;
                        this.setBalanceLabel();
                        return [2 /*return*/];
                }
            });
        });
    };
    Welcome.prototype.getGift = function () {
        var newDialog = cc.instantiate(this.rewardPrefab);
        this.node.addChild(newDialog);
        newDialog.setPosition(cc.v2(0, 0));
        // 在对话框脚本组件上保存 Welcome 对象的引用
        newDialog.getComponent('Rewards').welcome = this;
        newDialog.getComponent('Rewards').setLabel(Math.floor(ethers_umd_min_js_1.ethers.utils.formatEther(this.pendingRewards[0])), Math.floor(ethers_umd_min_js_1.ethers.utils.formatEther(this.pendingRewards[1])));
    };
    Welcome.prototype.openWithdrawDialog = function () {
        return __awaiter(this, void 0, void 0, function () {
            var registerContract, account, newDialog;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        registerContract = new ethers_umd_min_js_1.ethers.Contract(this.newRegisterAddress, this.newRegisterJson.json.abi, this.provider);
                        return [4 /*yield*/, registerContract.accountInfo(this.address)];
                    case 1:
                        account = _a.sent();
                        newDialog = cc.instantiate(this.withdrawPrefab);
                        this.node.addChild(newDialog);
                        newDialog.setPosition(cc.v2(0, 0));
                        // 在对话框脚本组件上保存 Welcome 对象的引用
                        newDialog.getComponent('Withdraw').welcome = this;
                        newDialog.getComponent('Withdraw').setLabel(account.wallet, Math.floor(ethers_umd_min_js_1.ethers.utils.formatEther(this.balance[0])), Math.floor(ethers_umd_min_js_1.ethers.utils.formatEther(this.balance[1])));
                        return [2 /*return*/];
                }
            });
        });
    };
    Welcome.prototype.setUserName = function (name, email, wallet) {
        return __awaiter(this, void 0, void 0, function () {
            var registerContract, registerSigner, tx, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cc.log(name, email, wallet);
                        registerContract = new ethers_umd_min_js_1.ethers.Contract(this.newRegisterAddress, this.newRegisterJson.json.abi, this.provider);
                        registerSigner = registerContract.connect(this.wallet);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, registerSigner.register(name, email, wallet)];
                    case 2:
                        tx = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        cc.log(e_2);
                        return [3 /*break*/, 4];
                    case 4:
                        this.okt -= 3;
                        this.setBalanceLabel();
                        return [2 /*return*/];
                }
            });
        });
    };
    Welcome.prototype.claimRewards = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rogueLandSigner, tx, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cc.log('claimLowb');
                        this.balance = this.pendingRewards;
                        rogueLandSigner = this.rogueLandContract.connect(this.wallet);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, rogueLandSigner.claimRewards()];
                    case 2:
                        tx = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        cc.log(e_3);
                        return [3 /*break*/, 4];
                    case 4:
                        this.okt -= 2;
                        this.setBalanceLabel();
                        return [2 /*return*/];
                }
            });
        });
    };
    Welcome.prototype.charge = function () {
        cc.log(this.phoneEditbox.string);
        this.chargeButton.interactable = false;
        this.withdraw(0, this.phoneEditbox.string);
    };
    Welcome.prototype.withdraw = function (id, kind) {
        return __awaiter(this, void 0, void 0, function () {
            var amount, registerSigner, tx, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cc.log('withdraw', this.balance[id].toString());
                        amount = '20000000000000000000000';
                        if (kind == 0) {
                            amount = this.balance[id].toString();
                        }
                        registerSigner = this.registerContract.connect(this.wallet);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, registerSigner.use(id, kind, amount)];
                    case 2:
                        tx = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_4 = _a.sent();
                        cc.log(e_4);
                        return [3 /*break*/, 4];
                    case 4:
                        if (kind == 0) {
                            this.okt -= 2;
                            this.setRecordLabel(0, false);
                            this.balance[id] = 0;
                            this.setBalanceLabel();
                        }
                        else {
                            cc.director.loadScene("welcome");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Welcome.prototype.getPunkInfo = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var player, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.rogueLandContract.punkMaster(id)];
                    case 1:
                        player = _a.sent();
                        return [4 /*yield*/, this.registerContract.accountInfo(player)];
                    case 2:
                        account = _a.sent();
                        if (account.name == "")
                            return [2 /*return*/, player.slice(0, 6)];
                        else
                            return [2 /*return*/, account.name];
                        return [2 /*return*/];
                }
            });
        });
    };
    Welcome.prototype.lookRank = function () {
        return __awaiter(this, void 0, void 0, function () {
            var golds, newDialog;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.rogueLandContract.getGoldsofAllPunk()];
                    case 1:
                        golds = _a.sent();
                        newDialog = cc.instantiate(this.rankPrefab);
                        this.node.addChild(newDialog);
                        newDialog.setPosition(cc.v2(0, 0));
                        // 在对话框脚本组件上保存 Welcome 对象的引用
                        newDialog.getComponent('Rank').welcome = this;
                        newDialog.getComponent('Rank').setGolds(golds);
                        return [2 /*return*/];
                }
            });
        });
    };
    Welcome.prototype.setAccount = function () {
        var newDialog = cc.instantiate(this.accountPrefab);
        this.node.addChild(newDialog);
        newDialog.setPosition(cc.v2(0, 0));
    };
    Welcome.prototype.gameSetting = function () {
        var newDialog = cc.instantiate(this.registerPrefab);
        this.node.addChild(newDialog);
        newDialog.setPosition(cc.v2(0, 0));
        // 在对话框脚本组件上保存 Welcome 对象的引用
        newDialog.getComponent('Register').welcome = this;
        newDialog.getComponent('Register').setInfo(this.accountInfo.name, this.accountInfo.email);
    };
    Welcome.prototype.setUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var okt, _a, balance, i, freePunk, punkId, remoteUrl, sprite_1, claimed, _b, useId, done;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.wallet.getBalance()];
                    case 1:
                        okt = _c.sent();
                        this.okt = Math.floor(ethers_umd_min_js_1.ethers.utils.formatEther(okt) * 10000);
                        this.registerContract = new ethers_umd_min_js_1.ethers.Contract(this.registerAddress, this.registerJson.json.abi, this.provider);
                        _a = this;
                        return [4 /*yield*/, this.registerContract.accountInfo(this.address)];
                    case 2:
                        _a.accountInfo = _c.sent();
                        return [4 /*yield*/, this.registerContract.balanceOf(this.address)];
                    case 3:
                        balance = _c.sent();
                        for (i = 0; i < balance.length; i++) {
                            this.balance[i] = balance[i];
                        }
                        if (this.balance[0] > 20000e18) {
                            this.chargeButton.interactable = true;
                        }
                        this.setBalanceLabel();
                        if (this.accountInfo.name != "") {
                            this.nameLabel.string = this.accountInfo.name;
                            if (this.accountInfo.punkId > 0) {
                                this.nameLabel.string = this.accountInfo.name + "(VIP)";
                            }
                        }
                        this.rogueLandContract = new ethers_umd_min_js_1.ethers.Contract(this.rogueLandAddress, this.rogueLandJson.json.abi, this.provider);
                        return [4 /*yield*/, this.rogueLandContract.freePunk()];
                    case 4:
                        freePunk = _c.sent();
                        this.setInfoLabel(freePunk - 2);
                        return [4 /*yield*/, this.rogueLandContract.punkOf(this.address)];
                    case 5:
                        punkId = _c.sent();
                        if (punkId > 0) {
                            cc.log(this.punkJson.json[punkId - 1]);
                            remoteUrl = "https://www.losernft.org/ipfs/" + this.punkJson.json[punkId - 1].hash;
                            cc.sys.localStorage.setItem('myPunk', Number(punkId));
                            sprite_1 = this.node.getChildByName('punk_image').getComponent(cc.Sprite);
                            cc.assetManager.loadRemote(remoteUrl, { ext: '.png', cacheEnabled: true }, function (err, pic) {
                                if (err) {
                                    cc.log('LoadNetImg load error,error:' + err);
                                    return;
                                }
                                sprite_1.spriteFrame = new cc.SpriteFrame(pic);
                            });
                        }
                        else {
                            if (freePunk <= 667 && this.okt > 0) {
                                //this.registerButton.interactable = true
                                //this.registerButton.node.zIndex = 2
                            }
                            cc.log("you are a visitor");
                            cc.sys.localStorage.setItem('myPunk', 0);
                        }
                        return [4 /*yield*/, this.rogueLandContract.claimed(this.address)];
                    case 6:
                        claimed = _c.sent();
                        if (!!claimed) return [3 /*break*/, 8];
                        _b = this;
                        return [4 /*yield*/, this.rogueLandContract.pendingRewards(this.address)];
                    case 7:
                        _b.pendingRewards = _c.sent();
                        _c.label = 8;
                    case 8: return [4 /*yield*/, this.registerContract.lastUse(this.address)];
                    case 9:
                        useId = _c.sent();
                        if (!(useId > 0)) return [3 /*break*/, 11];
                        this.setRecordLabel(useId, true);
                        return [4 /*yield*/, this.registerContract.useInfo(useId)];
                    case 10:
                        done = _c.sent();
                        if (done == 1) {
                            this.setRecordLabel(useId, false);
                        }
                        _c.label = 11;
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    Welcome.prototype.onLoad = function () {
        //this.tradeButton.interactable = false
        this.chargeButton.interactable = false;
        //this.registerButton.interactable = false
        var walletData = JSON.parse(cc.sys.localStorage.getItem('wallet'));
        if (!walletData) {
            var wallet = new ethers_umd_min_js_1.ethers.Wallet.createRandom();
            this.setWallet(wallet);
        }
        else {
            this.address = walletData.address;
            this.privateKey = walletData.privateKey;
        }
        this.provider = new ethers_umd_min_js_1.ethers.providers.JsonRpcProvider("https://exchaintestrpc.okex.org");
        var walletPrivateKey = new ethers_umd_min_js_1.ethers.Wallet(this.privateKey);
        this.wallet = walletPrivateKey.connect(this.provider);
        this.setUserInfo();
        var lang = cc.sys.localStorage.getItem('lang');
        if (!lang) {
            this.gameSetting();
        }
    };
    Welcome.prototype.start = function () {
    };
    __decorate([
        property(cc.Label)
    ], Welcome.prototype, "nameLabel", void 0);
    __decorate([
        property(cc.Label)
    ], Welcome.prototype, "infoLabel", void 0);
    __decorate([
        property(cc.Label)
    ], Welcome.prototype, "balanceLabel", void 0);
    __decorate([
        property(cc.Label)
    ], Welcome.prototype, "recordLabel", void 0);
    __decorate([
        property(cc.Button)
    ], Welcome.prototype, "chargeButton", void 0);
    __decorate([
        property(cc.Button)
    ], Welcome.prototype, "tradeButton", void 0);
    __decorate([
        property(cc.Button)
    ], Welcome.prototype, "registerButton", void 0);
    __decorate([
        property(cc.Button)
    ], Welcome.prototype, "giftButton", void 0);
    __decorate([
        property(cc.EditBox)
    ], Welcome.prototype, "phoneEditbox", void 0);
    __decorate([
        property(cc.JsonAsset)
    ], Welcome.prototype, "registerJson", void 0);
    __decorate([
        property(cc.JsonAsset)
    ], Welcome.prototype, "newRegisterJson", void 0);
    __decorate([
        property(cc.JsonAsset)
    ], Welcome.prototype, "rogueLandJson", void 0);
    __decorate([
        property(cc.JsonAsset)
    ], Welcome.prototype, "punkJson", void 0);
    __decorate([
        property(cc.Prefab)
    ], Welcome.prototype, "accountPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], Welcome.prototype, "registerPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], Welcome.prototype, "rewardPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], Welcome.prototype, "rankPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], Welcome.prototype, "withdrawPrefab", void 0);
    Welcome = __decorate([
        ccclass
    ], Welcome);
    return Welcome;
}(cc.Component));
exports.default = Welcome;

cc._RF.pop();