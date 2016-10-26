var game;
(function (game) {
    var PGScene = (function () {
        function PGScene() {
            this.isInit = false;
            this.lastime = 0;
            this.id = game.CommonFunction.Token;
        }
        var d = __define,c=PGScene,p=c.prototype;
        d(p, "ID"
            ,function () { return this.id; }
        );
        //传入场景的字符串
        p.OnLoad = function () {
            this.OnRelease();
            game.ModuleManager.Instance.RegisterModule(this);
            // this.sceneKey = obj;
            this.startTime = egret.getTimer();
            game.PGControls.addEventListener(game.BaseEvent.gm_headquarters_hpChange, this.gm_headquarters_hpChange, this);
            game.PGControls.addEventListener(game.BaseEvent.gm_activation_bullet, this.gm_activation_bullet, this);
            game.PGControls.addEventListener(game.BaseEvent.gm_monster_death, this.gm_monster_death, this);
            // this.resLoad();
            this.init();
        };
        p.OnRelease = function () {
            game.ModuleManager.Instance.UnRegisterModule(this);
            game.PGControls.removeEventListener(game.BaseEvent.gm_headquarters_hpChange, this.gm_headquarters_hpChange, this);
            game.PGControls.removeEventListener(game.BaseEvent.gm_activation_bullet, this.gm_activation_bullet, this);
            game.PGControls.removeEventListener(game.BaseEvent.gm_monster_death, this.gm_monster_death, this);
            this.removeAll();
        };
        p.init = function () {
            this.createBG();
            this.creatDecration();
            this.createPG();
            this.createBoss();
            // this.creatAction();
            this.isInit = true;
        };
        // 创建游戏场景
        p.createBG = function () {
            var bitmap = new egret.Bitmap();
            bitmap.texture = RES.getRes("bgImage");
            game.PGLayer.Ins.BgLayer.addChild(bitmap);
            // 游戏中分线
            var stageW = egret.MainContext.instance.stage.stageWidth;
            var stageH = egret.MainContext.instance.stage.stageHeight;
            var midcourt = new egret.Shape();
            var startPoint = new egret.Point(stageW / 2, 0);
            var endPoint = new egret.Point(stageW / 2, stageH - 120);
            game.CommonFunction.drawDashed(midcourt.graphics, startPoint, endPoint);
            game.PGLayer.Ins.BgLayer.addChild(midcourt);
        };
        //建立一个血量挂件
        p.creatDecration = function () {
            var dt = new game.PGDecoration();
            dt.x = 780;
            dt.y = 510;
            dt.setHp(10);
            dt.OnLoad(game.PGLayer.Ins.DecorationLayer);
        };
        //建立PG
        p.createPG = function () {
            var pg;
            pg = new game.PGprogrammer();
            pg.OnLoad(game.PGLayer.Ins.DecorationLayer);
        };
        //建立Boss
        p.createBoss = function () {
            var boss;
            boss = new game.PGBoss();
            boss.OnLoad(game.PGLayer.Ins.NpcLayer);
        };
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
        p.gm_headquarters_hpChange = function (e) {
            // egret.gui.Alert.show("游戏结束！", "弹窗", function () { location.reload() },"重新开始");
            game.ModuleManager.Instance.IsStop = true;
        };
        // 发出需球
        p.gm_activation_bullet = function (e) {
            var bullet = new game.PGBullet();
            bullet.setTarget(e.object);
            bullet.OnLoad(game.PGLayer.Ins.NpcLayer);
        };
        p.gm_monster_death = function (e) {
            var sp = new game.PGSprite();
            // game.PGConfig.Ins.addGlob(sp.Glob);
        };
        p.removeAll = function () {
            while (game.PGLayer.Ins.NpcLayer.numChildren > 0) {
                var obj = game.PGLayer.Ins.NpcLayer.removeChildAt(0);
                obj.OnRelease();
            }
            while (game.PGLayer.Ins.BgLayer.numChildren > 0) {
                game.PGLayer.Ins.BgLayer.removeChildAt(0);
            }
            while (game.PGLayer.Ins.DecorationLayer.numChildren > 0) {
                var obj = game.PGLayer.Ins.DecorationLayer.removeChildAt(0);
                obj.OnRelease();
            }
        };
        p.OnUpdate = function (passTime) {
            if (this.isInit && passTime > this.lastime) {
                // this.creatSp();
                this.lastime = passTime + 800;
            }
        };
        return PGScene;
    }());
    game.PGScene = PGScene;
    egret.registerClass(PGScene,'game.PGScene',["game.IObject","game.ILoad","game.IUpdate"]);
})(game || (game = {}));
//# sourceMappingURL=PGScene.js.map