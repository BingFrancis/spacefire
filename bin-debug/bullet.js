var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var bullet = (function (_super) {
    __extends(bullet, _super);
    function bullet(touch_x, touch_y) {
        var _this = _super.call(this) || this;
        _this.hit = false; //碰撞标识符，默认值为false
        _this.boss_come = 0;
        _this.recycle = false; //回收标识符，默认值为false
        _this.box_build(); //创建子弹
        _this.x = touch_x + 25; //获取外部传入的坐标
        _this.y = touch_y - 50;
        return _this;
    }
    bullet.prototype.box_build = function () {
        var result = new egret.Bitmap(); //新建位图
        var texture = RES.getRes("bullet_png");
        result.texture = texture;
        this.addChild(result);
        this.addEventListener(egret.Event.ENTER_FRAME, this.box_move, this); //增加enter_frame监听，让自己每一帧都能调用函数，实现向下移动
    };
    bullet.prototype.box_move = function () {
        if (this.hit == false) {
            this.y -= 16; //这里非常重要！错就错这了！注意了，这里的坐标应该是this的，而不是this.box的，因为this是整个容器，而box只是其中的一个对象，所以这里需要整体移动！
        }
        else {
            if (this.parent) {
                this.recycle = true; //修改标识位recycle=true，告诉主场景，自己可以被回收
                this.parent.removeChild(this); //在父级容器中移除自己，这里的父级容器其实就是主场景
                this.removeEventListener(egret.Event.ENTER_FRAME, this.box_move, this); //移除自身的enter_frame，当对象被移除后，一定要手动移除它自身绑定的监听事件
            }
        }
        if (this.y < 0 && this.parent) {
            this.recycle = true; //修改标识符recycle=true，告诉主场景，自己可以被回收
            this.parent.removeChild(this); //这里厉害了，通过自身的parent，即父级容器来消除自己
            this.removeEventListener(egret.Event.ENTER_FRAME, this.box_move, this); //移除自身的enter_frame
        }
    };
    bullet.prototype.initial = function (touch_x, touch_y) {
        this.hit = false;
        this.recycle = false;
        this.x = touch_x + 25;
        this.y = touch_y - 50;
        this.addEventListener(egret.Event.ENTER_FRAME, this.box_move, this);
        // var sound = new sound_play("shoot");
    };
    return bullet;
}(egret.Sprite));
__reflect(bullet.prototype, "bullet");
//# sourceMappingURL=bullet.js.map