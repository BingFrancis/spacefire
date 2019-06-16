var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var boss = (function (_super) {
    __extends(boss, _super);
    function boss() {
        var _this = _super.call(this) || this;
        _this.speed = 20;
        _this.hit = false; //碰撞标识符，默认值为false
        var result = new egret.Bitmap(); //新建位图
        var texture = RES.getRes("boss_png");
        result.texture = texture;
        _this.addChild(result);
        return _this;
    }
    return boss;
}(egret.Sprite));
__reflect(boss.prototype, "boss");
//# sourceMappingURL=boss.js.map