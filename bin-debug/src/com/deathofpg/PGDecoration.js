var game;
(function (game) {
    var PGDecoration = (function (_super) {
        __extends(PGDecoration, _super);
        function PGDecoration() {
            _super.call(this);
            this._hp = 10;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        var __egretProto__ = PGDecoration.prototype;
        __egretProto__.onAddToStage = function (event) {
            this.init();
            this.draw();
        };
        __egretProto__.setHp = function (value) {
            this._hp = value;
            this.draw();
        };
        Object.defineProperty(__egretProto__, "hp", {
            get: function () {
                return this._hp;
            },
            set: function (value) {
                if (value == this.hp) {
                    return;
                }
                this.setHp(value);
                this.hpText.text = value.toString();
                if (this._hp <= 0) {
                    game.PGControls.dispatchEvent(game.BaseEvent.gm_headquarters_hpChange, this);
                }
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.OnUpdate = function (type, value) {
            this.OnUpdate(type, value);
        };
        __egretProto__.OnLoad = function (parent) {
            parent.addChild(this);
            game.PGControls.addEventListener(game.BaseEvent.gm_moveEnd, this.gm_moveEnd, this);
        };
        __egretProto__.OnRelease = function () {
            if (this.parent != null) {
                this.parent.removeChild(this);
            }
            game.PGControls.removeEventListener(game.BaseEvent.gm_moveEnd, this.gm_moveEnd, this);
        };
        __egretProto__.init = function () {
            var data = RES.getRes("num_fnt");
            this.hpText = new egret.BitmapText();
            this.hpText.font = data;
            this.hpText.text = this.hp.toString();
            this.addChild(this.hpText);
            var shap = new egret.Shape();
            shap.graphics.beginFill(0xffff60, 1);
            shap.graphics.drawRect(0, 0, 8, 8);
            shap.graphics.endFill();
            this.addChild(shap); //添加到显示列表
        };
        __egretProto__.draw = function () {
            if (this.parent == null) {
                return;
            }
            this.hpText.x = -this.hpText.width >> 1;
            this.hpText.y = -this.hpText.height >> 1;
        };
        //处理怪物走到目标点
        __egretProto__.gm_moveEnd = function (e) {
            if (e.object instanceof game.PGSprite) {
                this.hp = this.hp - e.object.Atk;
            }
        };
        return PGDecoration;
    })(game.BaseDecoration);
    game.PGDecoration = PGDecoration;
    PGDecoration.prototype.__class__ = "game.PGDecoration";
})(game || (game = {}));
