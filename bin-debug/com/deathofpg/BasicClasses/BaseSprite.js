var game;
(function (game) {
    var BaseSprite = (function (_super) {
        __extends(BaseSprite, _super);
        function BaseSprite() {
            _super.call(this);
            /**
            * 类型
            */
            this.Type = "sprite1";
            /**
            * 	精灵的移动速度
            */
            this.MoveSpeed = 0.1;
            /**
            * 	精灵的血量
            */
            this.Hp = 100;
            /**
            * 	精灵的血量
            */
            this.HpMax = 100;
            /**
            * 	攻击力
            */
            this.Atk = 1;
            /**
            * 精灵方向 (默认为下)
            */
            this.direction = "";
            this.id = game.CommonFunction.Token;
        }
        var d = __define,c=BaseSprite,p=c.prototype;
        d(p, "ID"
            ,function () { return this.id; }
        );
        d(p, "Direction"
            ,function () {
                return this.direction;
            }
        );
        p.setHp = function (value) {
            this.Hp = value;
            this.dispatchEvent(new egret.Event("gm_hpChange"));
        };
        /**
         *	 虚方法，需要Override
         *
         */
        p.OnUpdate = function (passTime) {
        };
        p.OnLoad = function (parent) {
        };
        p.OnRelease = function () {
        };
        d(p, "Point"
            ,function () {
                return new egret.Point(this.x + this.width / 2, this.y + this.height / 2);
            }
        );
        return BaseSprite;
    }(egret.Sprite));
    game.BaseSprite = BaseSprite;
    egret.registerClass(BaseSprite,'game.BaseSprite',["game.IObject","game.ILoad","game.IUpdate"]);
})(game || (game = {}));
//# sourceMappingURL=BaseSprite.js.map