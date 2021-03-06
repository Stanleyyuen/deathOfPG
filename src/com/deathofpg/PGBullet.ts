﻿module game {
    export class PGBullet extends BaseSprite {

        public constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        private onAddToStage(event: egret.Event) {

            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        private target: game.BaseSprite;

        public setTarget(target: game.BaseSprite): void {

            var arr = [true, false];
            var bol = arr[Math.floor(Math.random()*arr.length)];
            this.x = bol ? (egret.MainContext.instance.stage.stageWidth - 300) / 2 : egret.MainContext.instance.stage.stageWidth / 2 + 100;
            this.y = 0;
            this.target = target;

            var ball: egret.Bitmap = new egret.Bitmap();
            ball.texture = RES.getRes("ballImage");
            ball.width = 50;
            ball.height = 59;

            this.addChild(ball);
            this.Atk = 20;
            this.MoveSpeed = 1;
        }

        public OnLoad(parent: egret.DisplayObjectContainer): void {

            parent.addChild(this);
            game.ModuleManager.Instance.RegisterModule(this);
        }

        public OnRelease(): void {

            if (this.parent != null) {
                this.parent.removeChild(this);
            }
            game.ModuleManager.Instance.UnRegisterModule(this);
        }

        /**
        *	 虚方法，需要Override
        * @param ElapsedSeconds 距离上次被更新的时间间隔
        *
        */
        public OnUpdate(passTime: number): void {

            super.OnUpdate(passTime);
            this.move(passTime);
        }

        private move(passTime: number): void {

            var distance: number = game.CommonFunction.GetDistance(this.Point, this.target.Point);
            if (distance <= 152) {
                console.log(this.target.Hp);
                this.target.setHp(this.target.Hp - this.Atk);
                this.target = null;
                this.OnRelease();
            } else if (this.y >= egret.MainContext.instance.stage.stageHeight - 300) {
                this.target = null;
                this.OnRelease();
            } else {
                this.y = this.y + 10;
            }
        }
    }
} 