var game;
(function (game) {
    var XFKHpImg = (function (_super) {
        __extends(XFKHpImg, _super);
        function XFKHpImg() {
            _super.call(this);
            this.hpWidth = 44;
        }
        var __egretProto__ = XFKHpImg.prototype;
        __egretProto__.OnLoad = function (parent) {
            this.parentSprite = parent;
            this.init();
        };
        __egretProto__.OnRelease = function () {
            if (this.parent != null) {
                this.parent.removeChild(this);
            }
            while (this.numChildren > 0) {
                this.removeChildAt(0);
            }
            this.parentSprite = null;
        };
        __egretProto__.init = function () {
            this.hpBg = new egret.Bitmap();
            this.hpBg.texture = RES.getRes("spritehpbg_png");
            this.hp = new egret.Bitmap();
            this.hp.texture = RES.getRes("spritehp_png");
            this.hp.x = 1;
            this.hp.y = 1;
            this.addChild(this.hpBg);
            this.addChild(this.hp);
        };
        __egretProto__.sethp = function (cnum, mnum) {
            this.hp.width = game.CommonFunction.numPrecentage(cnum, mnum, this.hpWidth);
            this.hp.x = 1;
            this.hp.y = 1;
            if (this.parent == null) {
                this.parentSprite.addChild(this);
                this.x = -this.width >> 1;
                this.y = -40;
            }
        };
        return XFKHpImg;
    })(game.BaseDecoration);
    game.XFKHpImg = XFKHpImg;
    XFKHpImg.prototype.__class__ = "game.XFKHpImg";
})(game || (game = {}));
