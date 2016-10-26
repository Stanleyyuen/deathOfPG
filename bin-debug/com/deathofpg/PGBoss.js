var game;
(function (game) {
    var PGBoss = (function (_super) {
        __extends(PGBoss, _super);
        function PGBoss() {
            _super.call(this);
            this.lastTime = 0;
        }
        var d = __define,c=PGBoss,p=c.prototype;
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
            this.sp.graphics.drawRect(0, 0, 400, 130);
            this.sp.graphics.endFill();
            this.addChild(this.sp);
            this.sp.x = (egret.MainContext.instance.stage.stageWidth - this.sp.width) / 2;
            this.sp.y = 0;
            // this.sp.gotoAndPlay(1, -1);
        };
        p.creatBullet = function (source, target) {
            var nowTime = egret.getTimer();
            if (nowTime > this.lastTime) {
                this.lastTime = nowTime + 600; //下次执行时间
                game.PGControls.dispatchEvent(game.BaseEvent.gm_activation_bullet, target);
            }
        };
        p.OnLoad = function (parent) {
            _super.prototype.OnLoad.call(this, parent);
            parent.addChild(this);
            this.creatSp();
            game.ModuleManager.Instance.RegisterModule(this);
            var objectList = game.ModuleManager.Instance.GetModuleList();
            var programmer;
            programmer = objectList[1];
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
            var objectList = game.ModuleManager.Instance.GetModuleList();
            var programmer;
            programmer = objectList[1];
            this.creatBullet(this, programmer);
        };
        return PGBoss;
    }(game.BaseSprite));
    game.PGBoss = PGBoss;
    egret.registerClass(PGBoss,'game.PGBoss');
})(game || (game = {}));
//# sourceMappingURL=PGBoss.js.map