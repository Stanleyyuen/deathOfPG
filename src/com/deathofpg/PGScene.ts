module game {
    export class PGScene implements game.IObject{
        public constructor() {
            this.id = game.CommonFunction.Token;
        }

        private id: number;

        public get ID(): number { return this.id;}

        private startTime: number;

        //传入场景的字符串
        public OnLoad(): void {
            this.OnRelease();

            game.ModuleManager.Instance.RegisterModule(this);
            // this.sceneKey = obj;

            this.startTime = egret.getTimer();

            game.PGControls.addEventListener(game.BaseEvent.gm_headquarters_hpChange, this.gm_headquarters_hpChange, this);
            game.PGControls.addEventListener(game.BaseEvent.gm_activation_bullet, this.gm_activation_bullet, this);
            game.PGControls.addEventListener(game.BaseEvent.gm_monster_death, this.gm_monster_death, this);

            // this.resLoad();
            this.init();

        }

        public OnRelease(): void {

            game.ModuleManager.Instance.UnRegisterModule(this);
            game.PGControls.removeEventListener(game.BaseEvent.gm_headquarters_hpChange, this.gm_headquarters_hpChange, this);
            game.PGControls.removeEventListener(game.BaseEvent.gm_activation_bullet, this.gm_activation_bullet, this);
            game.PGControls.removeEventListener(game.BaseEvent.gm_monster_death, this.gm_monster_death, this);
            this.removeAll();
        }

        private isInit: boolean = false;

        private init(): void {

            this.createBG();
            this.creatDecration();
            this.createPG();
            this.createBoss();
            // this.creatAction();
            this.isInit = true;
        }

        // 创建游戏场景
        private createBG(): void {
            var bitmap: egret.Bitmap = new egret.Bitmap();
            bitmap.texture = RES.getRes("bgImage");
            game.PGLayer.Ins.BgLayer.addChild(bitmap);

            // 游戏中分线
            var stageW:number = egret.MainContext.instance.stage.stageWidth;
            var stageH:number = egret.MainContext.instance.stage.stageHeight;
            var midcourt:egret.Shape = new egret.Shape();
            var startPoint = new egret.Point(stageW / 2, 0);
            var endPoint = new egret.Point(stageW / 2, stageH - 120);
            game.CommonFunction.drawDashed(midcourt.graphics, startPoint, endPoint);
            game.PGLayer.Ins.BgLayer.addChild(midcourt);
        }
        
        //建立一个血量挂件
        private creatDecration(): void {
            var dt: game.PGDecoration = new game.PGDecoration();
            dt.x = 780;
            dt.y = 510;
            dt.setHp(10);
            dt.OnLoad(game.PGLayer.Ins.DecorationLayer);
        }

        //建立PG
        private createPG():void {
            var pg:game.PGprogrammer;
            pg = new game.PGprogrammer();
            pg.OnLoad(game.PGLayer.Ins.DecorationLayer);
        }

        //建立Boss
        private createBoss():void {
            var boss:game.PGBoss;
            boss = new game.PGBoss();
            boss.OnLoad(game.PGLayer.Ins.NpcLayer);
        }

        // private action: any[];

        //创建一个精灵
        // private creatAction(): void {

        //     var data = RES.getRes(this.sceneKey + "sprite_json");
           
        //     this.action = new Array();
        //     var index: number;
        //     for (var i: number = 0; i < data.sprite.length; i++) {

        //         data.sprite[i].path = data.Path;
        //         data.sprite[i].keyframe = false;
        //         data.sprite[i].delay = parseInt(data.sprite[i].delay);
        //         for (var j: number = 0; j < data.sprite[i].count; j++){
        //             index=this.action.push(data.sprite[i]);
        //             if (index == data.sprite[i].count) {
        //                 this.action[index-1].keyframe = true;
        //             }
        //         }
        //     }
        // }

        // private creatSp(): void{

        //     if (this.action.length > 0) {
        //         console.log(this.startTime + this.action[0].delay, egret.getTimer());
        //         if ((this.startTime + this.action[0].delay) <= egret.getTimer()) {
        //             var sp: game.XFKSprite
        //             sp = new game.XFKSprite();
        //             sp.Parse(this.action.shift());
        //             sp.OnLoad(game.PGLayer.Ins.NpcLayer);
        //         }
        //     }
        // }

        // 程序猿血量变化（主要处理程序猿0血量时候GAMEOVER）
        private gm_headquarters_hpChange(e: game.BaseEvent): void {
            // egret.gui.Alert.show("游戏结束！", "弹窗", function () { location.reload() },"重新开始");
            game.ModuleManager.Instance.IsStop = true;
        }

        // 发出需球
        private gm_activation_bullet(e: game.BaseEvent): void {
            var bullet: game.PGBullet = new game.PGBullet();
            bullet.setTarget(e.object);
            bullet.OnLoad(game.PGLayer.Ins.NpcLayer);
        }

        private gm_monster_death(e: game.BaseEvent): void {
            var sp: game.PGSprite = new game.PGSprite();
            // game.PGConfig.Ins.addGlob(sp.Glob);
        }

        private removeAll(): void{

            while (game.PGLayer.Ins.NpcLayer.numChildren > 0) {

                var obj: any = game.PGLayer.Ins.NpcLayer.removeChildAt(0);
                (<ILoad>obj).OnRelease();
            }

            while (game.PGLayer.Ins.BgLayer.numChildren > 0) {

                game.PGLayer.Ins.BgLayer.removeChildAt(0);
            }

            while (game.PGLayer.Ins.DecorationLayer.numChildren > 0) {

                var obj: any = game.PGLayer.Ins.DecorationLayer.removeChildAt(0);
                (<ILoad>obj).OnRelease();
            }

        }

        private lastime: number = 0;

        public OnUpdate(passTime: number): void {
            if (this.isInit && passTime > this.lastime){

                // this.creatSp();
                this.lastime = passTime + 800;

            }
        }

    }
} 