var game;
(function (game) {
    var PGDecoration = (function (_super) {
        __extends(PGDecoration, _super);
        function PGDecoration() {
            _super.call(this);
            this._hp = 10;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        var d = __define,c=PGDecoration,p=c.prototype;
        p.onAddToStage = function (event) {
            this.init();
            this.draw();
        };
        p.setHp = function (value) {
            this._hp = value;
            this.draw();
        };
        d(p, "hp"
            ,function () {
                return this._hp;
            }
            ,function (value) {
                if (value == this.hp) {
                    return;
                }
                this.setHp(value);
                this.hpText.text = value.toString();
                if (this._hp <= 0) {
                    game.PGControls.dispatchEvent(game.BaseEvent.gm_headquarters_hpChange, this);
                }
            }
        );
        p.OnUpdate = function (type, value) {
            this.OnUpdate(type, value);
        };
        p.OnLoad = function (parent) {
            parent.addChild(this);
            game.PGControls.addEventListener(game.BaseEvent.gm_moveEnd, this.gm_moveEnd, this);
        };
        p.OnRelease = function () {
            if (this.parent != null) {
                this.parent.removeChild(this);
            }
            game.PGControls.removeEventListener(game.BaseEvent.gm_moveEnd, this.gm_moveEnd, this);
        };
        p.init = function () {
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
        p.draw = function () {
            if (this.parent == null) {
                return;
            }
            this.hpText.x = -this.hpText.width >> 1;
            this.hpText.y = -this.hpText.height >> 1;
        };
        //处理怪物走到目标点
        p.gm_moveEnd = function (e) {
            if (e.object instanceof game.PGSprite) {
                this.hp = this.hp - e.object.Atk;
            }
        };
        return PGDecoration;
    }(game.BaseDecoration));
    game.PGDecoration = PGDecoration;
    egret.registerClass(PGDecoration,'game.PGDecoration');
})(game || (game = {}));
//# sourceMappingURL=PGDecoration.js.map