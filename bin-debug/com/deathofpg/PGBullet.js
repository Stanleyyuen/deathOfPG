var game;
(function (game) {
    var PGBullet = (function (_super) {
        __extends(PGBullet, _super);
        function PGBullet() {
            _super.call(this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        var d = __define,c=PGBullet,p=c.prototype;
        p.onAddToStage = function (event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        };
        p.setTarget = function (target) {
            var arr = [true, false];
            var bol = arr[Math.floor(Math.random() * arr.length)];
            this.x = bol ? (egret.MainContext.instance.stage.stageWidth - 300) / 2 : egret.MainContext.instance.stage.stageWidth / 2 + 100;
            this.y = 0;
            this.target = target;
            var ball = new egret.Bitmap();
            ball.texture = RES.getRes("ballImage");
            ball.width = 50;
            ball.height = 59;
            this.addChild(ball);
            this.Atk = 20;
            this.MoveSpeed = 1;
        };
        p.OnLoad = function (parent) {
            parent.addChild(this);
            game.ModuleManager.Instance.RegisterModule(this);
        };
        p.OnRelease = function () {
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
            this.move(passTime);
        };
        p.move = function (passTime) {
            var distance = game.CommonFunction.GetDistance(this.Point, this.target.Point);
            if (distance <= 152) {
                console.log(this.target.Hp);
                this.target.setHp(this.target.Hp - this.Atk);
                this.target = null;
                this.OnRelease();
            }
            else if (this.y >= egret.MainContext.instance.stage.stageHeight - 300) {
                this.target = null;
                this.OnRelease();
            }
            else {
                this.y = this.y + 10;
            }
        };
        return PGBullet;
    }(game.BaseSprite));
    game.PGBullet = PGBullet;
    egret.registerClass(PGBullet,'game.PGBullet');
})(game || (game = {}));
//# sourceMappingURL=PGBullet.js.map