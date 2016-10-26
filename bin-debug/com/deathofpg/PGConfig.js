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
        var d = __define,c=PGConfig,p=c.prototype;
        d(PGConfig, "Ins"
            ,function () {
                if (this.ins == null)
                    this.ins = new PGConfig();
                return this.ins;
            }
        );
        p.addGlob = function (value) {
            this.Glob = this.Glob + value;
        };
        return PGConfig;
    }());
    game.PGConfig = PGConfig;
    egret.registerClass(PGConfig,'game.PGConfig');
})(game || (game = {}));
//# sourceMappingURL=PGConfig.js.map