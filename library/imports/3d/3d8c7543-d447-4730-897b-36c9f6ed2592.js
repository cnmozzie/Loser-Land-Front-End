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
        _this.squid = 0;
        _this.hep = 0;
        _this.squidApproved = 0;
        _this.hepApproved = 0;
        _this.pool = 0;
        _this.address = '';
        _this.username = '';
        _this.bindAddress = '';
        _this.privateKey = '';
        _this.hepAddress = '0xfD83168291312A0800f44610974350C569d12e42';
        _this.squidAddress = '0xC9a9bE0f88b44889F30EA0978e984FB5a6eFE68b';
        _this.rogueLandAddress = '0x432E7300786636043Bd3791fD49f4C0c58C3CC87';
        _this.provider = null;
        _this.wallet = null;
        _this.rogueLandContract = null;
        _this.nameLabel = null;
        _this.infoLabel = null;
        _this.cherryLabel = null;
        _this.loserLabel = null;
        _this.balanceLabel = null;
        _this.loserButton = null;
        _this.cherryButton = null;
        _this.registerButton = null;
        _this.approveButton = null;
        _this.ERC20Json = null;
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
    Welcome.prototype.setInfoLabel = function (a, b, n) {
        var lang = cc.sys.localStorage.getItem('lang');
        if (lang === 'zh') {
            this.loserLabel.string = "\u5B58\u6D3B: " + a + "/333";
            this.cherryLabel.string = "\u6B7B\u4EA1: " + b + "/333";
            this.infoLabel.string = "\u5F53\u524D\u8D5B\u5B63\uFF1AS2  \u62A5\u540D\u4EBA\u6570\uFF1A " + n + "/666";
        }
        else {
            this.loserLabel.string = "Live: " + a + "/333";
            this.cherryLabel.string = "Dead: " + b + "/333";
            this.infoLabel.string = "Current Season: S2a  Enrollment: " + n + "/666";
        }
    };
    Welcome.prototype.setBalanceLabel = function () {
        var lang = cc.sys.localStorage.getItem('lang');
        this.balanceLabel.string = "OKT: " + this.okt + "  SQUID: " + this.squid + "  HEP: " + this.hep + "\n";
        if (lang === 'zh') {
            this.balanceLabel.string += "\u6E38\u620F\u8FDB\u5EA6\uFF1A" + (6666 - this.pool) + "/6666";
        }
        else {
            this.balanceLabel.string += "Progress: " + (6666 - this.pool) + "/6666";
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
                        return [4 /*yield*/, rogueLandSigner.registerWithSquid()];
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
    Welcome.prototype.enrollGameWithNFT = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rogueLandSigner, tx, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.cherryButton.interactable = false;
                        rogueLandSigner = this.rogueLandContract.connect(this.wallet);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, rogueLandSigner.registerWithNFT()];
                    case 2:
                        tx = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        cc.log(e_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Welcome.prototype.enrollGameWithPunk = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rogueLandSigner, tx, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loserButton.interactable = false;
                        rogueLandSigner = this.rogueLandContract.connect(this.wallet);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, rogueLandSigner.registerWithPunk()];
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
    Welcome.prototype.setUserName = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var rogueLandSigner, tx, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cc.log(name);
                        rogueLandSigner = this.rogueLandContract.connect(this.wallet);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, rogueLandSigner.setNickName(name)];
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
    Welcome.prototype.getPunkInfo = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var player, name;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.rogueLandContract.punkMaster(id)];
                    case 1:
                        player = _a.sent();
                        return [4 /*yield*/, this.rogueLandContract.nickNameOf(player)];
                    case 2:
                        name = _a.sent();
                        if (player.slice(0, 6) == "0x0000")
                            return [2 /*return*/, "DEAD"];
                        else if (name == "")
                            return [2 /*return*/, player.slice(0, 6)];
                        else
                            return [2 /*return*/, name];
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
    Welcome.prototype.approve = function () {
        return __awaiter(this, void 0, void 0, function () {
            var squidContract, squidSigner, tx, e_5, hepContract, hepSigner, tx, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.approveButton.interactable = false;
                        if (!(this.squidApproved < 1e18)) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        squidContract = new ethers_umd_min_js_1.ethers.Contract(this.squidAddress, this.ERC20Json.json.abi, this.provider);
                        squidSigner = squidContract.connect(this.wallet);
                        return [4 /*yield*/, squidSigner.approve(this.rogueLandAddress, ethers_umd_min_js_1.ethers.utils.parseUnits("6666"))];
                    case 2:
                        tx = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_5 = _a.sent();
                        cc.log(e_5);
                        return [3 /*break*/, 4];
                    case 4:
                        if (!(this.hepApproved < 1)) return [3 /*break*/, 8];
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        hepContract = new ethers_umd_min_js_1.ethers.Contract(this.hepAddress, this.ERC20Json.json.abi, this.provider);
                        hepSigner = hepContract.connect(this.wallet);
                        return [4 /*yield*/, hepSigner.approve(this.rogueLandAddress, 30000000)];
                    case 6:
                        tx = _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        e_6 = _a.sent();
                        cc.log(e_6);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    Welcome.prototype.gameSetting = function () {
        var newDialog = cc.instantiate(this.registerPrefab);
        this.node.addChild(newDialog);
        newDialog.setPosition(cc.v2(0, 0));
        // 在对话框脚本组件上保存 Welcome 对象的引用
        newDialog.getComponent('Register').welcome = this;
        newDialog.getComponent('Register').setInfo(this.username);
    };
    Welcome.prototype.setUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var okt, _a, gameInfo, evenPunk, oddPunk, totalPunk, punkId, remoteUrl, sprite_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.provider.getBalance(this.address)];
                    case 1:
                        okt = _b.sent();
                        this.okt = Math.floor(ethers_umd_min_js_1.ethers.utils.formatEther(okt) * 10000) / 10000;
                        cc.log(this.okt);
                        this.rogueLandContract = new ethers_umd_min_js_1.ethers.Contract(this.rogueLandAddress, this.rogueLandJson.json.abi, this.provider);
                        _a = this;
                        return [4 /*yield*/, this.rogueLandContract.nickNameOf(this.address)];
                    case 2:
                        _a.username = _b.sent();
                        return [4 /*yield*/, this.rogueLandContract.gameInfo(this.address)];
                    case 3:
                        gameInfo = _b.sent();
                        cc.log(gameInfo);
                        this.hep = gameInfo.hepBalance;
                        this.squid = Math.floor(ethers_umd_min_js_1.ethers.utils.formatEther(gameInfo.squidBalance) * 1000) / 1000;
                        this.pool = Math.floor(ethers_umd_min_js_1.ethers.utils.formatEther(gameInfo.pool));
                        this.setBalanceLabel();
                        if (gameInfo.squidApproved < 1e18 || gameInfo.hepApproved < 1) {
                            this.squidApproved = gameInfo.squidApproved;
                            this.hepApproved = gameInfo.hepApproved;
                            this.approveButton.interactable = true;
                        }
                        if (gameInfo.squidApproved >= 1e18 && gameInfo.squidBalance >= 1e18) {
                            this.registerButton.interactable = true;
                        }
                        if (gameInfo.hepApproved >= 1 && gameInfo.hepBalance >= 1) {
                            cc.sys.localStorage.setItem('hep', Number(gameInfo.hepBalance));
                        }
                        if (this.username != "") {
                            this.nameLabel.string = this.username;
                        }
                        evenPunk = gameInfo.evenPunk / 2 - 1;
                        oddPunk = Math.floor(gameInfo.oddPunk / 2 - 1);
                        if (evenPunk < 333 && gameInfo.hasPunk) {
                            //this.loserButton.interactable = true
                        }
                        if (oddPunk < 333 && gameInfo.hasNFT) {
                            //this.cherryButton.interactable = true
                        }
                        return [4 /*yield*/, this.rogueLandContract.totalPunk()];
                    case 4:
                        totalPunk = _b.sent();
                        this.setInfoLabel(totalPunk - gameInfo.oddPunk, gameInfo.oddPunk, totalPunk);
                        return [4 /*yield*/, this.rogueLandContract.punkOf(this.address)];
                    case 5:
                        punkId = _b.sent();
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
                            //if (freePunk <= 667 && this.okt > 0) {
                            //	this.registerButton.interactable = true
                            //	this.registerButton.node.zIndex = 2
                            //}
                            cc.log("you are a visitor");
                            cc.sys.localStorage.setItem('myPunk', 0);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Welcome.prototype.getChainId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var chainId, newAccounts, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, ethereum.request({
                                method: 'eth_chainId',
                            })];
                    case 1:
                        chainId = _a.sent();
                        cc.log("chain id", chainId);
                        if (!(chainId == '0x42')) return [3 /*break*/, 4];
                        return [4 /*yield*/, ethereum.request({
                                method: 'eth_requestAccounts'
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, ethereum.request({
                                method: 'eth_accounts',
                            })];
                    case 3:
                        newAccounts = _a.sent();
                        this.address = newAccounts[0];
                        cc.sys.localStorage.setItem('address', this.address);
                        cc.log("address", this.address);
                        this.setUserInfo();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_1 = _a.sent();
                        console.error(err_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Welcome.prototype.onLoad = function () {
        this.loserButton.interactable = false;
        this.cherryButton.interactable = false;
        this.registerButton.interactable = false;
        this.approveButton.interactable = false;
        cc.sys.localStorage.setItem('address', '');
        cc.sys.localStorage.setItem('hep', 0);
        var ethereum = window.ethereum;
        if (Boolean(ethereum)) {
            this.provider = new ethers_umd_min_js_1.ethers.providers.Web3Provider(window.ethereum);
            this.wallet = this.provider.getSigner();
            this.getChainId();
        }
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
    ], Welcome.prototype, "cherryLabel", void 0);
    __decorate([
        property(cc.Label)
    ], Welcome.prototype, "loserLabel", void 0);
    __decorate([
        property(cc.Label)
    ], Welcome.prototype, "balanceLabel", void 0);
    __decorate([
        property(cc.Button)
    ], Welcome.prototype, "loserButton", void 0);
    __decorate([
        property(cc.Button)
    ], Welcome.prototype, "cherryButton", void 0);
    __decorate([
        property(cc.Button)
    ], Welcome.prototype, "registerButton", void 0);
    __decorate([
        property(cc.Button)
    ], Welcome.prototype, "approveButton", void 0);
    __decorate([
        property(cc.JsonAsset)
    ], Welcome.prototype, "ERC20Json", void 0);
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