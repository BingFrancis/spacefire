var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var enemy = (function (_super) {
    __extends(enemy, _super);
    function enemy(touch_x, touch_y) {
        var _this = _super.call(this) || this;
        _this.count = 0;
        _this.label = new egret.TextField;
        _this.hit = false;
        _this.recycle = false;
        _this.enemy_build();
        _this.x = touch_x;
        _this.y = touch_y;
        return _this;
    }
    enemy.prototype.enemy_build = function () {
        var result = new egret.Bitmap(); //新建位图
        var texture = RES.getRes("enemy_png");
        result.texture = texture;
        this.addChild(result);
        var data = RES.getRes("mc_json"); //获取mc1帧动画的配置
        var txtr = RES.getRes("mc_png"); //获取mc1帧动画的png图片
        var mcFactory = new egret.MovieClipDataFactory(data, txtr); //创建帧动画对象
        this.mc = new egret.MovieClip(mcFactory.generateMovieClipData("exp")); //载入帧动画    
        this.mc.gotoAndStop(1); //让帧动画停在第一帧
        this.addEventListener(egret.Event.ENTER_FRAME, this.enemy_move, this);
    };
    enemy.prototype.enemy_move = function () {
        this.label.text = String(this.count);
        this.label.textColor = 0x00FF00;
        this.addChild(this.label);
        if (this.hit == false) {
            this.y += 10;
        }
        else {
            this.addChild(this.mc); //把帧动画绑定至该容器
            this.removeEventListener(egret.Event.ENTER_FRAME, this.enemy_move, this); //移除自身的enter_frame监听，停止自身的移动
            if (this.mc.currentFrame === 1) {
                this.mc.gotoAndPlay(2); //播放自身帧动画，实现爆炸效果
                this.mc.addEventListener(egret.Event.COMPLETE, function (e) {
                    if (that.parent) {
                        that.parent.removeChild(that); //调用父对象删除自己
                        that.recycle = true; //修改自身的标识符recycle，告知主场景，动画已经播放完毕，可以进行回收
                        if (this.mc.parent) {
                            this.removeChild(this.mc); //把帧动画绑定至该容器
                        }
                        this.mc.gotoAndStop(1); //让帧动画停在第一帧
                    }
                }, this);
                //   var sound = new sound_play("explosion_small"); //播放爆炸的声音
                var that = this; //用that来表示this，因为在子函数中,this指针会指向子函数本身，而不是对象本身，所以需要增加标示符that来在子函数中指向对象
            }
        }
        if (this.y > 1140 && this.parent) {
            this.parent.removeChild(this); //调用父级容器删除自己
            this.removeEventListener(egret.Event.ENTER_FRAME, this.enemy_move, this); //移除帧监听，即不让它再移动
            this.recycle = true; //修改标识符recycle=true，告诉主场景，本敌机可回收
        }
    };
    enemy.prototype.initial = function (touch_x, touch_y) {
        this.x = touch_x;
        this.y = touch_y;
        this.hit = false;
        this.recycle = false;
        this.mc.gotoAndStop(1);
        //this.box_build();
        this.addEventListener(egret.Event.ENTER_FRAME, this.enemy_move, this);
    };
    return enemy;
}(egret.Sprite));
__reflect(enemy.prototype, "enemy");
//# sourceMappingURL=enemy.js.map