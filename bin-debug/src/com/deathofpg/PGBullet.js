var game;
(function (game) {
    var PGBullet = (function (_super) {
        __extends(PGBullet, _super);
        function PGBullet() {
            _super.call(this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        var __egretProto__ = PGBullet.prototype;
        __egretProto__.onAddToStage = function (event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        };
        __egretProto__.setTarget = function (target) {
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
            this.radius = 10;
            this.MoveSpeed = 1;
        };
        __egretProto__.OnLoad = function (parent) {
            parent.addChild(this);
            game.ModuleManager.Instance.RegisterModule(this);
        };
        __egretProto__.OnRelease = function () {
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
        __egretProto__.OnUpdate = function (passTime) {
            _super.prototype.OnUpdate.call(this, passTime);
            this.move(passTime);
        };
        __egretProto__.move = function (passTime) {
            // var distance: number = game.CommonFunction.GetDistance(this.Point, this.target.Point);
            // if (distance <= this.radius) {
            if (this.y >= egret.MainContext.instance.stage.stageHeight - 300) {
                this.target.setHp(this.target.Hp - this.Atk);
                this.target = null;
                this.OnRelease();
            }
            else {
                var targetSpeed = game.CommonFunction.GetSpeed(this.target.Point, this.Point, this.MoveSpeed);
                // var xDistance: number = 10 * targetSpeed.x;
                // console.log(targetSpeed.y);
                // var yDistance: number = 10 * targetSpeed.y;
                // this.x = this.x + xDistance;
                this.y = this.y + 10;
            }
        };
        return PGBullet;
    })(game.BaseSprite);
    game.PGBullet = PGBullet;
    PGBullet.prototype.__class__ = "game.PGBullet";
})(game || (game = {}));
