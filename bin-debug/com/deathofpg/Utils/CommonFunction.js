var game;
(function (game) {
    var CommonFunction = (function () {
        function CommonFunction() {
        }
        var d = __define,c=CommonFunction,p=c.prototype;
        d(CommonFunction, "Token"
            ,function () {
                return this.token++;
            }
        );
        CommonFunction.GetDistance = function (p1, p2) {
            return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
        };
        CommonFunction.GetSpeed = function (targetP2, currentP1, SpeedNum) {
            var speed = new egret.Point();
            var hypotenuse = game.CommonFunction.GetDistance(targetP2, currentP1);
            if (hypotenuse == 0) {
                speed.x = 0;
                speed.y = 0;
                return speed;
            }
            speed.x = SpeedNum * (targetP2.x - currentP1.x) / hypotenuse;
            speed.y = SpeedNum * (targetP2.y - currentP1.y) / hypotenuse;
            return speed;
        };
        CommonFunction.numPrecentage = function (cint, mint, countCop) {
            var value = Math.floor(cint / mint * countCop);
            if (value > countCop) {
                value = countCop;
            }
            return value;
        };
        CommonFunction.drawDashed = function (graphics, p1, p2, length, gap) {
            if (length === void 0) { length = 5; }
            if (gap === void 0) { gap = 5; }
            var max = egret.Point.distance(p1, p2);
            var l = 0;
            var p3;
            var p4;
            while (l < max) {
                p3 = egret.Point.interpolate(p2, p1, l / max);
                l += length;
                if (l > max)
                    l = max;
                p4 = egret.Point.interpolate(p2, p1, l / max);
                graphics.lineStyle(2, 0xffffff);
                graphics.moveTo(p3.x, p3.y);
                graphics.lineTo(p4.x, p4.y);
                l += gap;
            }
        };
        CommonFunction.token = 0;
        return CommonFunction;
    }());
    game.CommonFunction = CommonFunction;
    egret.registerClass(CommonFunction,'game.CommonFunction');
})(game || (game = {}));
//# sourceMappingURL=CommonFunction.js.map