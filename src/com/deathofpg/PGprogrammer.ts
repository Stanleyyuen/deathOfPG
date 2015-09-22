module game {
    export class PGprogrammer extends game.BaseSprite {
        public constructor() {
            super();
        }

        private lastTime: number=0; 
        // private sp: egret.MovieClip;
        private sp:egret.Shape;
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
            this.sp.graphics.drawRect(0, 0, 250, 130);
            this.sp.graphics.endFill();
            this.addChild(this.sp);
            this.x = (egret.MainContext.instance.stage.stageWidth - this.sp.width) / 2;
            this.y = egret.MainContext.instance.stage.stageHeight - this.sp.width;

            // this.sp.gotoAndPlay(1, -1);
        }

        public OnLoad(parent: egret.DisplayObjectContainer): void {
            super.OnLoad(parent);
            parent.addChild(this);
            this.creatSp();
            game.ModuleManager.Instance.RegisterModule(this);
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
            if (this.MoveSpeed == 0){
                return;
            }
        }
    }
} 