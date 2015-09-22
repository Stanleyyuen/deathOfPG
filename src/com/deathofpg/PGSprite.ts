module game {
    export class PGSprite extends game.BaseSprite
    {

        // public Glob: number;

        // private hpImg: game.XFKHpImg = new game.XFKHpImg();

        public constructor() {

            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        private onAddToStage(event: egret.Event) {

            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener("gm_hpChange", this.onHpChange, this);

            this.x = this.Path[0].x;
            this.y = this.Path[0].y;
        }

        public sp: egret.MovieClip;


        /**
        *  路径存放的列表
        */
        public Path: egret.Point[] = [

        ];

        public OnLoad(parent:egret.DisplayObjectContainer): void {

            super.OnLoad(parent);
            parent.addChild(this);
            game.ModuleManager.Instance.RegisterModule(this);

            // this.hpImg.OnLoad(this);
        }

        public OnRelease(): void {

            super.OnRelease();

            if (this.sp != null) {
                this.sp.stop();
            }
            this.removeEventListener("gm_hpChange", this.onHpChange, this);

            if (this.parent != null) {
                this.parent.removeChild(this);
            }
            game.ModuleManager.Instance.UnRegisterModule(this);

            // this.hpImg.OnRelease();
        }

        private onHpChange(e: egret.Event): void {
            // this.hpImg.sethp(this.Hp, this.HpMax);
            if (this.Hp <= 0) {
                game.PGControls.dispatchEvent(game.BaseEvent.gm_monster_death,this);
                this.OnRelease();
            }
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
            
            if (this.Path.length == 0) {
                return;
            }

            var point: egret.Point = this.Path[0];  //下一个节点

            var targetSpeed: egret.Point = game.CommonFunction.GetSpeed(point, new egret.Point(this.x, this.y),this.MoveSpeed);
            var xDistance: number = 10  * targetSpeed.x;
            var yDistance: number = 10  * targetSpeed.y;

            if (Math.abs(point.x - this.x) <= Math.abs(xDistance) && Math.abs(point.y - this.y) <= Math.abs(yDistance)) {

                this.x = point.x;
                this.y = point.y;
                this.Path.shift();
                
                if (this.Path.length == 0) {
                    game.PGControls.dispatchEvent(game.BaseEvent.gm_moveEnd,this);
                    this.OnRelease();
                    return;
                }
                else {
                    // this.setDirection(this.Path[0]);
                }
            }
            else {
                this.x = this.x + xDistance;
                this.y = this.y + yDistance;
            }

        }
    }
} 