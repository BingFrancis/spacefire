var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var background = (function (_super) {
    __extends(background, _super);
    function background() {
        var _this = _super.call(this) || this;
        _this.bgstage = egret.MainContext.instance.stage;
        _this.speed = 10;
        _this.isBg1Move = true;
        _this.isBg2Move = false;
        _this.initial();
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.backgroundMove, _this);
        return _this;
        // var sound_obj :egret.Sound = RES.getRes('bg_music');
        // sound_obj.play();
    }
    background.prototype.backgroundMove = function () {
        if (this.isBg1Move) {
            this.bg1.y += this.speed;
            if (this.bg1.y > 0) {
                this.isBg2Move = true;
            }
            if (this.bg1.y > this.bgstage.stageHeight) {
                this.isBg1Move = false;
                this.bg1.y = -this.bgstage.stageHeight;
            }
        }
        if (this.isBg2Move) {
            this.bg2.y += this.speed;
            if (this.bg2.y > 0) {
                this.isBg1Move = true;
            }
            if (this.bg2.y > this.bgstage.stageHeight) {
                this.isBg2Move = false;
                this.bg2.y = -this.bgstage.stageHeight;
            }
        }
    };
    background.prototype.initial = function () {
        this.bg1 = new egret.Bitmap(); //新建位图
        this.bg2 = new egret.Bitmap();
        var texture1 = RES.getRes("bg1_png");
        var texture2 = RES.getRes("bg2_png");
        this.bg1.texture = texture1;
        this.bg2.texture = texture2;
        this.addChild(this.bg1);
        this.addChild(this.bg2);
        this.bg1.height = this.bgstage.stageHeight + 10;
        this.bg2.height = this.bgstage.stageHeight + 10;
        this.bg1.x = 0;
        this.bg1.y = 0;
        this.bg2.x = 0;
        this.bg2.y = -this.bgstage.stageHeight;
        // this.addEventListener(egret.Event.ENTER_FRAME, this.backgroundMove, this);
        // var sound = new sound_play("shoot");
    };
    return background;
}(egret.DisplayObjectContainer));
__reflect(background.prototype, "background");
//# sourceMappingURL=backGround.js.map