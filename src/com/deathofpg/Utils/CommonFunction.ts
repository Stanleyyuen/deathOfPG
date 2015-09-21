module game {
    export class CommonFunction {
        
        public constructor() {
        }


        private static token: number = 0;
        public static get Token(): number {
            return this.token++;
        }

        public static GetDistance(p1: egret.Point, p2: egret.Point): number {

            return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));

        }

        public static GetSpeed(targetP2: egret.Point, currentP1: egret.Point, SpeedNum:number):egret.Point {

            var speed: egret.Point = new egret.Point();
            var hypotenuse:number = game.CommonFunction.GetDistance(targetP2, currentP1);
            if (hypotenuse == 0)
            {
                speed.x = 0;
                speed.y = 0;
                return speed;
            }
            speed.x = SpeedNum * (targetP2.x - currentP1.x) / hypotenuse;
            speed.y = SpeedNum * (targetP2.y - currentP1.y) / hypotenuse;
            return speed;
        }

        public static numPrecentage(cint: number, mint: number, countCop: number): number {
            var value: number = Math.floor(cint / mint * countCop);
            if (value > countCop) {
                value = countCop;
            }
            return value;
        }

        public static drawDashed(graphics:egret.Graphics, p1:egret.Point, p2:egret.Point, length:number = 5, gap:number = 5):void {
            var max:number = egret.Point.distance(p1, p2);
            var l:number = 0; 
            var p3:egret.Point;  
            var p4:egret.Point;  
            while(l < max) {
                p3 = egret.Point.interpolate(p2, p1, l / max);  
                l += length;
                if(l > max) l = max;
                p4 = egret.Point.interpolate(p2, p1, l / max);
                graphics.lineStyle(2, 0xffffff);
                graphics.moveTo(p3.x, p3.y);
                graphics.lineTo(p4.x, p4.y);
                l += gap;
            }
        }
    }
} 