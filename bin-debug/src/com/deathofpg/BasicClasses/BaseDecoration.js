var game;
(function (game) {
    var BaseDecoration = (function (_super) {
        __extends(BaseDecoration, _super);
        function BaseDecoration() {
            _super.call(this);
        }
        var __egretProto__ = BaseDecoration.prototype;
        __egretProto__.OnUpdate = function (type, value) {
        };
        return BaseDecoration;
    })(egret.Sprite);
    game.BaseDecoration = BaseDecoration;
    BaseDecoration.prototype.__class__ = "game.BaseDecoration";
})(game || (game = {}));
