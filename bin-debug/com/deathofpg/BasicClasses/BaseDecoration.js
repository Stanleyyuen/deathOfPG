var game;
(function (game) {
    var BaseDecoration = (function (_super) {
        __extends(BaseDecoration, _super);
        function BaseDecoration() {
            _super.call(this);
        }
        var d = __define,c=BaseDecoration,p=c.prototype;
        p.OnUpdate = function (type, value) {
        };
        return BaseDecoration;
    }(egret.Sprite));
    game.BaseDecoration = BaseDecoration;
    egret.registerClass(BaseDecoration,'game.BaseDecoration',["game.IDecoration"]);
})(game || (game = {}));
//# sourceMappingURL=BaseDecoration.js.map