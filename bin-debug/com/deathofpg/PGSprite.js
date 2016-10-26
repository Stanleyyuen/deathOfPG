var game;
(function (game) {
    var PGSprite = (function (_super) {
        __extends(PGSprite, _super);
        // public Glob: number;
        // private hpImg: game.XFKHpImg = new game.XFKHpImg();
        function PGSprite() {
            _super.call(this);
            /**
            *  路径存放的列表
            */
            this.Path = [];
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        var d = __define,c=PGSprite,p=c.prototype;
        p.onAddToStage = function (event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener("gm_hpChange", this.onHpChange, this);
            this.x = this.Path[0].x;
            this.y = this.Path[0].y;
        };
        p.OnLoad = function (parent) {
            _super.prototype.OnLoad.call(this, parent);
            parent.addChild(this);
            game.ModuleManager.Instance.RegisterModule(this);
            // this.hpImg.OnLoad(this);
        };
        p.OnRelease = function () {
            _super.prototype.OnRelease.call(this);
            if (this.sp != null) {
                this.sp.stop();
            }
            this.removeEventListener("gm_hpChange", this.onHpChange, this);
            if (this.parent != null) {
                this.parent.removeChild(this);
            }
            game.ModuleManager.Instance.UnRegisterModule(this);
            // this.hpImg.OnRelease();
        };
        p.onHpChange = function (e) {
            // this.hpImg.sethp(this.Hp, this.HpMax);
            if (this.Hp <= 0) {
                game.PGControls.dispatchEvent(game.BaseEvent.gm_monster_death, this);
                this.OnRelease();
            }
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
            if (this.Path.length == 0) {
                return;
            }
            var point = this.Path[0]; //下一个节点
            var targetSpeed = game.CommonFunction.GetSpeed(point, new egret.Point(this.x, this.y), this.MoveSpeed);
            var xDistance = 10 * targetSpeed.x;
            var yDistance = 10 * targetSpeed.y;
            if (Math.abs(point.x - this.x) <= Math.abs(xDistance) && Math.abs(point.y - this.y) <= Math.abs(yDistance)) {
                this.x = point.x;
                this.y = point.y;
                this.Path.shift();
                if (this.Path.length == 0) {
                    game.PGControls.dispatchEvent(game.BaseEvent.gm_moveEnd, this);
                    this.OnRelease();
                    return;
                }
                else {
                }
            }
            else {
                this.x = this.x + xDistance;
                this.y = this.y + yDistance;
            }
        };
        return PGSprite;
    }(game.BaseSprite));
    game.PGSprite = PGSprite;
    egret.registerClass(PGSprite,'game.PGSprite');
})(game || (game = {}));
//# sourceMappingURL=PGSprite.js.map