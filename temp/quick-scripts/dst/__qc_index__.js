
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/Script/DieDialog');
require('./assets/Script/Game');
require('./assets/Script/GoldDialog');
require('./assets/Script/Grass');
require('./assets/Script/LocalizationLabelString');
require('./assets/Script/Player');
require('./assets/Script/PunkInfo');
require('./assets/Script/Rank');
require('./assets/Script/Register');
require('./assets/Script/Rewards');
require('./assets/Script/User');
require('./assets/Script/Welcome');
require('./assets/Script/Withdraw');

                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();