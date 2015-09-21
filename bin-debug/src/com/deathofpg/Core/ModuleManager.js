var game;
(function (game) {
    var ModuleManager = (function (_super) {
        __extends(ModuleManager, _super);
        function ModuleManager() {
            _super.call(this);
            this.IsStop = false;
            this.dicData = new Object();
            this.lastTime = 0;
            game.PGLayer.Ins.Stage.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
        }
        var __egretProto__ = ModuleManager.prototype;
        Object.defineProperty(ModuleManager, "Instance", {
            get: function () {
                if (this.instance == null)
                    this.instance = new ModuleManager();
                return this.instance;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.GetModuleList = function () {
            return this.dicData;
        };
        __egretProto__.RegisterModule = function (object) {
            this.dicData[object.ID.toString()] = object;
        };
        __egretProto__.UnRegisterModule = function (object) {
            delete this.dicData[object.ID.toString()];
        };
        __egretProto__.update = function (e) {
            for (var key in this.dicData) {
                //根据需求，具体模块自己去算吧，这里传回当前时间
                //var nowTime: number = Math.abs(performance.now());
                //var passTime: number = nowTime - this.lastTime;
                //this.lastTime = nowTime;
                this.dicData[key].OnUpdate(egret.getTimer());
            }
        };
        return ModuleManager;
    })(egret.EventDispatcher);
    game.ModuleManager = ModuleManager;
    ModuleManager.prototype.__class__ = "game.ModuleManager";
})(game || (game = {}));
