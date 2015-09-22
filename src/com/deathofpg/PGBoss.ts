module game {
    export class PGBoss extends game.BaseSprite {
        public constructor() {
            super();
        }

        private lastTime: number=0; 
        // private sp: egret.MovieClip;
        private sp: egret.Shape;
        private radiusShap: egret.Shape;

        private creatSp(): void {
            // var data = RES.getRes(this.skin + "_json");
            // var texture = RES.getRes(this.skin + "_png");
            // var mcFactory = new egret.MovieClipDataFactory(data, texture);

            // if (this.sp != null) {
            //     this.sp.parent.removeChild(this.sp);
            //     this.sp.stop();
            // }

            // this.sp = new egret.MovieClip(mcFactory.generateMovieClipData(this.skin));
            this.sp = new egret.Shape();
            this.sp.graphics.beginFill(0x8f8f8f, 1);
            this.sp.graphics.drawRect(0, 0, 400, 130);
            this.sp.graphics.endFill();
            this.addChild(this.sp);

            this.sp.x = (egret.MainContext.instance.stage.stageWidth - this.sp.width) / 2;
            this.sp.y = 0;

            // this.sp.gotoAndPlay(1, -1);
        }

        private creatBullet(source:game.BaseSprite, target:game.BaseSprite): void {

            var nowTime: number = egret.getTimer();
            if (nowTime > this.lastTime) {
                this.lastTime = nowTime + 600;//下次执行时间
                game.PGControls.dispatchEvent(game.BaseEvent.gm_activation_bullet, target);
            }
           
        }

        public OnLoad(parent: egret.DisplayObjectContainer): void {
            super.OnLoad(parent);
            parent.addChild(this);
            this.creatSp();
            game.ModuleManager.Instance.RegisterModule(this);


            var objectList:Object = game.ModuleManager.Instance.GetModuleList();
            var programmer:game.PGSprite;

            programmer = objectList[1];
        }

        public OnRelease(): void {
            super.OnRelease();
            // if (this.sp != null) {
            //     this.sp.stop();
            // }
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
            if (this.MoveSpeed == 0) {
                return;
            }
            var objectList:Object = game.ModuleManager.Instance.GetModuleList();
            var programmer:game.PGSprite;

            programmer = objectList[1];
            this.creatBullet(this, programmer);
        }
    }
} 