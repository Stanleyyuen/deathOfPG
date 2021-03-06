//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView:LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            // var loadCover:HTMLElement = document.getElementById('JloadCover');
            // loadCover.style.display = 'none';
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private textfield:egret.TextField;
    private scene:game.PGScene;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private paceLeft:HTMLElement = document.getElementById('pace-left');
    private paceRight:HTMLElement = document.getElementById('pace-right');
    private soundIsPlaying:boolean = true;
    private sound:egret.Sound;
    private soundChannel:egret.SoundChannel;

    private createGameScene():void {
        game.PGLayer.Ins.OnLoad(this.stage);

        if (this.scene) { this.scene.OnRelease(); }
        this.scene = new game.PGScene();
        this.scene.OnLoad();

        this.sound = new egret.Sound();
        this.sound = RES.getRes("bgMusic");
        this.sound.addEventListener(egret.Event.COMPLETE, this.playMusic, this);
        this.sound.addEventListener(egret.IOErrorEvent.IO_ERROR, this.loadMusicError, this);

        // 音乐开关
        var gMusic:HTMLElement = document.getElementById('g-music');
        gMusic.addEventListener('click', this.gMusicClick.bind(this), false);

        // 跑步过程点击左右按钮
        this.paceLeft.addEventListener('touchstart', this.paceChange.bind(this), false);
        this.paceRight.addEventListener('touchstart', this.paceChange.bind(this), false);

        this.paceLeft.addEventListener('touchend', this.paceChange.bind(this), false);
        this.paceRight.addEventListener('touchend', this.paceChange.bind(this), false);
    }

    // 左右切换
    private initX = (egret.MainContext.instance.stage.stageWidth - 250) / 2;

    private paceChange(event):void {
        var type = event.target.name;
        var objectList:Object = game.ModuleManager.Instance.GetModuleList();
        var programmer = objectList[1];
        var tw = egret.Tween.get(programmer);

        if (event.type == 'touchstart') {
            if (type == 'left') {
                this.paceLeft.className = 'sel';
                tw.to({x: this.initX - 80}, 200, egret.Ease.sineIn);
            } else {
                this.paceRight.className = 'sel';
                tw.to({x: this.initX + 80}, 200, egret.Ease.sineIn);
            }
        } else {
            if (type == 'left') {
                this.paceLeft.className = '';
            } else {
                this.paceRight.className = '';
            }
            tw.to({x: this.initX}, 200, egret.Ease.sineIn);
        }
    }

    // 声音开关
    private gMusicClick():void {
        var gMusic:HTMLElement = document.getElementById('g-music');
        if (this.soundIsPlaying) {
            this.stopMusic();
            gMusic.className = "g-musicoff";
        } else {
            this.playMusic();
            gMusic.className = "g-musicon";
        }
        this.soundIsPlaying = !this.soundIsPlaying;
    }

    // 播放音乐
    private playMusic():void {
        this.soundChannel = this.sound.play();
    }

    // 停止播放音乐
    private stopMusic():void {
        if (this.soundChannel) {
            this.soundChannel.stop();
        }
    }

    // 加载声音出错
    private loadMusicError(event:egret.Event):void {
        console.log('声音加载出错！');
    }
}


