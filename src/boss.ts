class boss extends egret.Sprite{
    public speed = 20; 
    public hit = false; //碰撞标识符，默认值为false
    
    public constructor(){
        super();
        var result = new egret.Bitmap();//新建位图
        let texture: egret.Texture = RES.getRes("boss_png");
        result.texture = texture;  
        this.addChild(result)
    }
}

