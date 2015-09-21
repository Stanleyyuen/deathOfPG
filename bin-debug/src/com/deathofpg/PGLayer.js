var game;
(function (game) {
    var PGLayer = (function () {
        function PGLayer() {
            /**
            *  加载进度
            */
            this.LoadingView = new LoadingUI();
        }
        var __egretProto__ = PGLayer.prototype;
        Object.defineProperty(PGLayer, "Ins", {
            get: function () {
                if (this.ins == null)
                    this.ins = new PGLayer();
                return this.ins;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.LoadingViewOnOff = function () {
            if (this.Stage.contains(this.LoadingView)) {
                this.Stage.removeChild(this.LoadingView);
            }
            else {
                this.Stage.addChild(this.LoadingView);
                this.LoadingView.x = (this.Stage.width - this.LoadingView.width) >> 1; //设置居中
            }
        };
        __egretProto__.SetLoadingView = function (current, total) {
            this.LoadingView.setProgress(current, total);
        };
        __egretProto__.init = function () {
            //游戏场景层，游戏场景相关内容可以放在这里面（可以单独提取出来）。
            this.GameLayer = new egret.DisplayObjectContainer();
            this.GameLayer.name = "gameLayer";
            this.Stage.addChild(this.GameLayer);
            this.BgLayer = new egret.DisplayObjectContainer();
            this.BgLayer.name = "bgLayer";
            this.GameLayer.addChild(this.BgLayer);
            this.NpcLayer = new egret.DisplayObjectContainer();
            this.NpcLayer.name = "NpcLayer";
            this.GameLayer.addChild(this.NpcLayer);
            this.DecorationLayer = new egret.DisplayObjectContainer();
            this.DecorationLayer.name = "DecorationLayer";
            this.GameLayer.addChild(this.DecorationLayer);
            this.UiLayer = new egret.DisplayObjectContainer();
            this.UiLayer.name = "UiLayer";
            this.Stage.addChild(this.UiLayer);
        };
        __egretProto__.OnLoad = function (parent) {
            this.Stage = parent;
            this.init();
        };
        return PGLayer;
    })();
    game.PGLayer = PGLayer;
    PGLayer.prototype.__class__ = "game.PGLayer";
})(game || (game = {}));
