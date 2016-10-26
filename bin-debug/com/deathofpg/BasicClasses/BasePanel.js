var game;
(function (game) {
    var BasePanel = (function (_super) {
        __extends(BasePanel, _super);
        function BasePanel() {
            _super.call(this);
            this.isOpen = false;
        }
        var d = __define,c=BasePanel,p=c.prototype;
        p.backGround = function () {
            if (this.backBG) {
                return;
            }
            this.backBG = new egret.Bitmap();
            this.backBG.name = "panelbackground";
            this.backBG.texture = RES.getRes("panelbackground");
            this.backBG.alpha = 0.6;
            this.backBG.width = game.PGLayer.Ins.Stage.width;
            this.backBG.height = game.PGLayer.Ins.Stage.height;
            game.PGLayer.Ins.UiLayer.addChild(this.backBG);
        };
        p.show = function (type) {
            if (type === void 0) { type = 0; }
            this.isOpen = true;
            //灰色遮罩显示与否
            if (type == 0) {
                this.backGround();
            }
            game.PGLayer.Ins.UiLayer.addChild(this);
        };
        p.close = function () {
            this.isOpen = false;
            if (this.backBG && this.backBG.parent) {
                game.PGLayer.Ins.UiLayer.removeChild(this.backBG);
                this.backBG = null;
            }
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        p.setWindowCenter = function () {
            this.x = game.PGLayer.Ins.Stage.width - this.width >> 1;
            this.y = game.PGLayer.Ins.Stage.height - this.height >> 1;
        };
        p.setPoint = function (point) {
            this.x = point.x - (this.width >> 1);
            this.y = point.y - (this.height >> 1);
        };
        return BasePanel;
    }(egret.Sprite));
    game.BasePanel = BasePanel;
    egret.registerClass(BasePanel,'game.BasePanel');
})(game || (game = {}));
//# sourceMappingURL=BasePanel.js.map