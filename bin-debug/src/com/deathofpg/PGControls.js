var game;
(function (game) {
    var PGControls = (function () {
        function PGControls() {
        }
        var __egretProto__ = PGControls.prototype;
        PGControls.dispatchEvent = function (type, object) {
            var event = new game.BaseEvent(type);
            event.object = object;
            this.dispatcher.dispatchEvent(event);
        };
        PGControls.addEventListener = function (type, listener, thisObject, useCapture, priority) {
            this.dispatcher.addEventListener(type, listener, thisObject, useCapture, priority);
        };
        PGControls.removeEventListener = function (type, listener, thisObject, useCapture) {
            this.dispatcher.removeEventListener(type, listener, thisObject, useCapture);
        };
        PGControls.dispatcher = new egret.EventDispatcher();
        return PGControls;
    })();
    game.PGControls = PGControls;
    PGControls.prototype.__class__ = "game.PGControls";
})(game || (game = {}));
