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
        var __egretProto__ = BaseSprite.prototype;
        Object.defineProperty(__egretProto__, "ID", {
            get: function () {
                return this.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "Direction", {
            get: function () {
                return this.direction;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.setHp = function (value) {
            this.Hp = value;
            this.dispatchEvent(new egret.Event("gm_hpChange"));
        };
        /**
        *   设定朝向
        * @param p:要朝向的点
        */
        __egretProto__.setDirection = function (p) {
            var xNum = p.x - this.x;
            var yNum = p.y - this.y;
            var tempDirection;
            if (xNum == 0) {
                if (yNum > 0) {
                    tempDirection = "down";
                }
                if (yNum < 0) {
                    tempDirection = "up";
                }
            }
            if (yNum == 0) {
                if (xNum > 0) {
                    tempDirection = "right";
                }
                if (xNum < 0) {
                    tempDirection = "left";
                }
            }
            if (tempDirection != this.direction) {
                this.direction = tempDirection;
                this.dispatchEvent(new egret.Event("gm_directionChange"));
            }
            return;
        };
        /**
         *	 虚方法，需要Override
         *
         */
        __egretProto__.OnUpdate = function (passTime) {
        };
        __egretProto__.OnLoad = function (parent) {
        };
        __egretProto__.OnRelease = function () {
        };
        Object.defineProperty(__egretProto__, "Point", {
            get: function () {
                return new egret.Point(this.x, this.y);
            },
            enumerable: true,
            configurable: true
        });
        return BaseSprite;
    })(egret.Sprite);
    game.BaseSprite = BaseSprite;
    BaseSprite.prototype.__class__ = "game.BaseSprite";
})(game || (game = {}));
