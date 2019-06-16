class enemy extends egret.Sprite {
    public count = 0;
    public label = new egret.TextField;
    public hit = false;
    public box: egret.Shape;
    public mc: egret.MovieClip;
    public recycle = false;
    public constructor(touch_x, touch_y) {
        super();
        this.enemy_build();
        this.x = touch_x;
        this.y = touch_y;
    }
    public enemy_build() {

        var result = new egret.Bitmap();//新建位图
        let texture: egret.Texture = RES.getRes("enemy_png");
        result.texture = texture;
        this.addChild(result)

        var data = RES.getRes("mc_json");     //获取mc1帧动画的配置
        var txtr = RES.getRes("mc_png");     //获取mc1帧动画的png图片
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);     //创建帧动画对象
        this.mc = new egret.MovieClip(mcFactory.generateMovieClipData("exp"));    //载入帧动画    

        this.mc.gotoAndStop(1);    //让帧动画停在第一帧
        this.addEventListener(egret.Event.ENTER_FRAME, this.enemy_move, this);
    }
    public enemy_move() {
        this.label.text = String(this.count);
        this.label.textColor = 0x00FF00;
        this.addChild(this.label);
        if (this.hit == false) {
            this.y += 10;
        }
        else {//如果击中，则hit==true，然后移除当前的enter_frame函数
            this.addChild(this.mc);     //把帧动画绑定至该容器
            this.removeEventListener(egret.Event.ENTER_FRAME, this.enemy_move, this); //移除自身的enter_frame监听，停止自身的移动
            if (this.mc.currentFrame === 1) {
                this.mc.gotoAndPlay(2); //播放自身帧动画，实现爆炸效果
                this.mc.addEventListener(egret.Event.COMPLETE, function (e: egret.Event): void { //监听动画播放完毕事件，然后激活回调函数function
                    if (that.parent) { //如果当前对象的父对象存在
                        that.parent.removeChild(that); //调用父对象删除自己
                        that.recycle = true; //修改自身的标识符recycle，告知主场景，动画已经播放完毕，可以进行回收
                        if (this.mc.parent) {
                            this.removeChild(this.mc);     //把帧动画绑定至该容器
                        }
                        this.mc.gotoAndStop(1);    //让帧动画停在第一帧
                    }
                }, this);
                //   var sound = new sound_play("explosion_small"); //播放爆炸的声音
                var that = this; //用that来表示this，因为在子函数中,this指针会指向子函数本身，而不是对象本身，所以需要增加标示符that来在子函数中指向对象
            }
        }
        if (this.y > 1140 && this.parent) {    //如果敌机超出主舞台，同时其父容器存在
            this.parent.removeChild(this);    //调用父级容器删除自己
            this.removeEventListener(egret.Event.ENTER_FRAME, this.enemy_move, this);    //移除帧监听，即不让它再移动
            this.recycle = true;    //修改标识符recycle=true，告诉主场景，本敌机可回收
        }
    }


    public initial(touch_x, touch_y) {     //敌机的初始化函数，每一次被从回收数组中拿出来重用时调用
        this.x = touch_x;
        this.y = touch_y;
        this.hit = false;
        this.recycle = false;
        this.mc.gotoAndStop(1);
        //this.box_build();
        this.addEventListener(egret.Event.ENTER_FRAME, this.enemy_move, this);
    }
} 