var game;
(function (game) {
    var PGConfig = (function () {
        function PGConfig() {
            /**
            * 用户金钱
            */
            this.Glob = 0;
            /**
            * 当前怪物的进度
            */
            this.Count = 0;
        }
        var __egretProto__ = PGConfig.prototype;
        Object.defineProperty(PGConfig, "Ins", {
            get: function () {
                if (this.ins == null)
                    this.ins = new PGConfig();
                return this.ins;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.addGlob = function (value) {
            this.Glob = this.Glob + value;
        };
        return PGConfig;
    })();
    game.PGConfig = PGConfig;
    PGConfig.prototype.__class__ = "game.PGConfig";
})(game || (game = {}));
