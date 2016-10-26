var game;
(function (game) {
    var PGprogrammer = (function (_super) {
        __extends(PGprogrammer, _super);
        function PGprogrammer() {
            _super.call(this);
            this.lastTime = 0;
        }
        var d = __define,c=PGprogrammer,p=c.prototype;
        p.creatSp = function () {
            // var data = RES.getRes(this.skin + "_json");
            // var texture = RES.getRes(this.skin + "_png");
            // var mcFactory = new egret.MovieClipDataFactory(data, texture);
            // if (this.sp != null) {
            //     this.sp.parent.removeChild(this.sp);
            //     this.sp.stop();
            // }
            // this.sp = new egret.MovieClip(mcFactory.generateMovieClipData(this.skin));
            this.sp = new egret.Shape();
            this.sp.graphics.beginFill(0x8f8f8f, 1);
            this.sp.graphics.drawRect(0, 0, 250, 130);
            this.sp.graphics.endFill();
            this.addChild(this.sp);
            this.x = (egret.MainContext.instance.stage.stageWidth - this.sp.width) / 2;
            this.y = egret.MainContext.instance.stage.stageHeight - this.sp.width;
            // this.sp.gotoAndPlay(1, -1);
        };
        p.OnLoad = function (parent) {
            _super.prototype.OnLoad.call(this, parent);
            parent.addChild(this);
            this.creatSp();
            game.ModuleManager.Instance.RegisterModule(this);
        };
        p.OnRelease = function () {
            _super.prototype.OnRelease.call(this);
            // if (this.sp != null) {
            //     this.sp.stop();
            // }
            if (this.parent != null) {
                this.parent.removeChild(this);
            }
            game.ModuleManager.Instance.UnRegisterModule(this);
        };
        /**
        *	 虚方法，需要Override
        * @param ElapsedSeconds 距离上次被更新的时间间隔
        *
        */
        p.OnUpdate = function (passTime) {
            _super.prototype.OnUpdate.call(this, passTime);
            if (this.MoveSpeed == 0) {
                return;
            }
        };
        return PGprogrammer;
    }(game.BaseSprite));
    game.PGprogrammer = PGprogrammer;
    egret.registerClass(PGprogrammer,'game.PGprogrammer');
})(game || (game = {}));
//# sourceMappingURL=PGprogrammer.js.map