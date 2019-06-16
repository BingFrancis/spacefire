class background extends egret.DisplayObjectContainer {
    public bgstage: egret.Stage = egret.MainContext.instance.stage;

    public speed = 10;

    public isBg1Move = true;
    public isBg2Move = false;

    public bg1: egret.Bitmap;
    public bg2: egret.Bitmap;

    public constructor() {
        super();
        this.initial();
        this.addEventListener(egret.Event.ENTER_FRAME, this.backgroundMove, this);
        // var sound_obj :egret.Sound = RES.getRes('bg_music');
        // sound_obj.play();

    }

    public backgroundMove() {
        if (this.isBg1Move) {
            this.bg1.y += this.speed;
            if (this.bg1.y > 0) {
                this.isBg2Move = true;
            }
            if (this.bg1.y > this.bgstage.stageHeight) {
                this.isBg1Move = false;
                this.bg1.y =  - this.bgstage.stageHeight;
            }
        }
        if (this.isBg2Move) {
            this.bg2.y += this.speed;
            if (this.bg2.y > 0) {
                this.isBg1Move = true;
            }
            if (this.bg2.y > this.bgstage.stageHeight) {
                this.isBg2Move = false;
                this.bg2.y = - this.bgstage.stageHeight;
            }
        }
    }



    public initial() { //子弹的初始化，当被主场景再次使用时调用，重置它自己 
        this.bg1 = new egret.Bitmap();//新建位图
        this.bg2 = new egret.Bitmap();
        let texture1: egret.Texture = RES.getRes("bg1_png");
        let texture2: egret.Texture = RES.getRes("bg2_png");
        this.bg1.texture = texture1; 
        this.bg2.texture = texture2;
        this.addChild(this.bg1)
        this.addChild(this.bg2)
        this.bg1.height = this.bgstage.stageHeight + 10 ;
        this.bg2.height = this.bgstage.stageHeight + 10 ;

        this.bg1.x = 0 ;
        this.bg1.y = 0;

        this.bg2.x = 0;
        this.bg2.y = - this.bgstage.stageHeight;

        // this.addEventListener(egret.Event.ENTER_FRAME, this.backgroundMove, this);
        // var sound = new sound_play("shoot");
    }
}