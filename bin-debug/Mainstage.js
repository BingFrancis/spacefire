var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var mainStage = (function (_super) {
    __extends(mainStage, _super);
    function mainStage() {
        var _this = _super.call(this) || this;
        _this.label = new egret.TextField; //提示的文字
        _this.label2 = new egret.TextField;
        _this.label3 = new egret.TextField;
        _this.label4 = new egret.TextField;
        _this.label5 = new egret.TextField;
        _this.label6 = new egret.TextField;
        _this.count = 0;
        _this.count2 = 0;
        _this.count3 = 0;
        _this.count4 = 0;
        _this.count5 = 0;
        _this.count6 = 0;
        _this.touch = new touch_location(200, 800); //设置一开始的触摸位置
        _this.bossstatic = 0;
        _this.bullet_array = []; //新建一个子弹数组，用于子弹的管理
        _this.enemy_array = []; //新建一个敌机数组，用于敌机的管理
        _this.enemy_bullet_array = []; //新建一个敌机子弹数组，用于敌机子弹的管理
        _this.recycle_bullet = []; //新建一个回收子弹的数组，用于回收子弹及重用
        _this.recycle_enemy = []; //新建一个回收敌机的数组，用于回收敌机及重用
        _this.recycle_enemy_bullet = []; //新建一个回收敌机子弹的数组，用于回收敌机子弹及重用
        _this.$touchEnabled = true;
        var bg = new background();
        _this.addChild(bg);
        _this.addEventListener(egret.TouchEvent.TOUCH_MOVE, _this.touch_location, _this); //添加触摸的移动监听
        _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.touch_location, _this); //添加触摸的开始监听
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.touch_location, _this); //添加触摸监听 
        _this.bullet_creat(); //创建子弹
        _this.myplane1 = new myplane; //创建我机
        _this.enemy1_creat(); //创建  敌机
        _this.enemy_bullet_create(); //创建敌机子弹
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.hit_target, _this); //主舞台添加逐帧监听，每刷新一帧，都自动执行一次hit_target函数来进行碰撞检测和回收检测
        // this.addEventListener(egret.Event.ENTER_FRAME, this.bosscome, this);    //主舞台添加逐帧监听，每刷新一帧，都自动执行一次hit_target函数来进行碰撞检测和回收检测
        _this.myplane1.x = 300; //我机的初始位置
        _this.myplane1.y = 900;
        _this.addChild(_this.myplane1); //绑定我机到主舞台  
        _this.myplane1.addEventListener(egret.Event.ENTER_FRAME, _this.myplane_move, _this); //我机添加逐帧监听，每刷新一帧，就调用移动函数来改变位移
        return _this;
        // this.bosscome();
    }
    mainStage.prototype.touch_location = function (touch_now) {
        this.touch.x = touch_now.stageX;
        this.touch.y = touch_now.stageY;
    };
    mainStage.prototype.myplane_move = function () {
        if (this.myplane1.x < this.touch.x) {
            this.myplane1.x += this.myplane1.speed;
        }
        if (this.myplane1.x > this.touch.x) {
            this.myplane1.x -= this.myplane1.speed;
        }
        if (this.myplane1.y < this.touch.y) {
            this.myplane1.y += this.myplane1.speed;
        }
        if (this.myplane1.y > this.touch.y) {
            this.myplane1.y -= this.myplane1.speed;
        }
    };
    mainStage.prototype.bullet_creat = function () {
        var timer = new egret.Timer(200); //建立新的计时器，每150毫秒触发一次
        timer.addEventListener(egret.TimerEvent.TIMER, this.bullet_new, this); //每次到时间，就触发一次bullet_new函数，用于新建一颗子弹
        timer.start(); //定时器开始
    };
    mainStage.prototype.enemy_bullet_create = function () {
        var timer = new egret.Timer(600); //建立新的计时器，每800毫秒触发一次
        timer.addEventListener(egret.TimerEvent.TIMER, this.enemy_bullet_new, this); //每次到时间，就触发一次enemy_bullet_new函数，用于新建一颗子弹
        timer.start(); //定时器开始
    };
    mainStage.prototype.enemy_bullet_new = function () {
        for (var j = 0; j < this.enemy_array.length; j++) {
            if (this.recycle_enemy_bullet.length != 0) {
                var enemy_bullet_Obj = this.recycle_enemy_bullet.shift();
                enemy_bullet_Obj.initial(this.enemy_array[j].x + 60, this.enemy_array[j].y + 210);
                this.enemy_bullet_array.push(enemy_bullet_Obj);
                this.count5++;
                this.label5.text = "重用的敌机子弹数为=" + this.count5;
                this.label5.y = 120;
                this.addChild(this.label5);
            }
            else {
                enemy_bullet_Obj = new enemybullet(this.enemy_array[j].x + 60, this.enemy_array[j].y + 210);
                this.enemy_bullet_array.push(enemy_bullet_Obj); //把敌机子弹装入数组
                this.count6++;
                this.label6.text = "新建的敌机子弹数为=" + this.count6;
                this.label6.y = 150;
                this.addChild(this.label6);
            }
            this.addChild(enemy_bullet_Obj);
        }
    };
    mainStage.prototype.bullet_new = function () {
        if (this.recycle_bullet.length != 0) {
            var bullet_Obj = this.recycle_bullet.shift(); //则取出回收数组的第一个元素，然后在回收数组中删除该元素
            bullet_Obj.initial(this.myplane1.x, this.myplane1.y); //对取出的子弹进行初始化      
            this.bullet_array.push(bullet_Obj); //把该子弹装入子弹数组
            this.count2++;
            this.label2.text = "重用的子弹数为=" + this.count2;
            this.addChild(this.label2);
        }
        else {
            bullet_Obj = new bullet(this.myplane1.x, this.myplane1.y); //新建一颗子弹
            this.bullet_array.push(bullet_Obj); //把该子弹装入子弹数组
            this.count++;
            this.label.text = "新建的子弹数为=" + this.count;
            this.label.y = 30;
            this.addChild(this.label);
        }
        this.addChild(bullet_Obj); //把新建的子弹绑定到主舞台   
    };
    mainStage.prototype.enemy1_creat = function () {
        var timer = new egret.Timer(700); //建立新的计时器，每300毫秒触发一次
        timer.addEventListener(egret.TimerEvent.TIMER, this.enemy_new, this); //每次到时间，就触发一次enemy1_create函数，用于创建一个敌机
        timer.start();
    };
    mainStage.prototype.enemy_new = function () {
        var position_y = 0; //敌机的纵坐标为0
        var position_x = Math.random() * 450; //计算敌机的横坐标，为随机数
        var enemy1_Obj = this.recycle_enemy[0]; //获取回收敌机数组的第一个元素
        if (enemy1_Obj != undefined) {
            this.recycle_enemy.shift(); //在回收敌机数组中删除该元素
            enemy1_Obj.initial(position_x, position_y); //初始化该敌机元素
            this.enemy_array.push(enemy1_Obj); //把该敌机装入敌机数组
            this.count3 += 1;
            this.label3.text = "敌机重用数为=" + this.count3;
            this.label3.y = 60;
            this.addChild(this.label3);
        }
        else {
            this.count4++;
            enemy1_Obj = new enemy(position_x, position_y); //则新建一个敌机对象
            enemy1_Obj.count = this.count4;
            this.enemy_array.push(enemy1_Obj); //把新建的敌机装入敌机数组
            this.label4.text = "新建的敌机数为=" + this.count4;
            this.label4.y = 90;
            this.addChild(this.label4);
        }
        this.addChild(enemy1_Obj); //把创建的敌机绑定到主舞台
    };
    mainStage.prototype.hit_target = function () {
        for (var i = 0; i < this.bullet_array.length; i++) {
            for (var j = 0; j < this.enemy_array.length; j++) {
                //碰撞检测/////////////////
                if (this.bullet_array[i] != undefined && this.enemy_array[j] != undefined) {
                    if (this.hitTest(this.bullet_array[i], this.enemy_array[j]) == true && this.enemy_array[j].hit == false && this.bullet_array[i].hit == false) {
                        this.bossstatic++;
                        this.bullet_array[i].hit = true; //当前子弹标为hit=true
                        this.enemy_array[j].hit = true; //当前敌机标为hit=true                                      
                    } //if  
                } //if    
                //回收检测，注意回收检测是单独的，是碰撞检测结束后进行 
                if (this.enemy_array[j] != undefined && this.enemy_array[j].recycle == true) {
                    this.recycle_enemy.push(this.enemy_array[j]); //把该敌机回收至回收敌机数组
                    this.enemy_array.splice(j, 1); //把该敌机从敌机数组删除   
                }
                if (this.bullet_array[i] != undefined && this.bullet_array[i].recycle == true) {
                    this.recycle_bullet.push(this.bullet_array[i]); //把该子弹回收至回收子弹数组 
                    this.bullet_array.splice(i, 1); //把该子弹从子弹数组中删除           
                }
            }
        }
        for (var i = 0; i < this.enemy_bullet_array.length; i++) {
            if (this.enemy_bullet_array[i] != undefined) {
                if (this.hitTest(this.enemy_bullet_array[i], this.myplane1) == true && this.myplane1.hit == false && this.enemy_bullet_array[i].hit == false) {
                    this.enemy_bullet_array[i].hit = true; //当前子弹标为hit=true
                }
            }
            //回收检测，注意回收检测是单独的，是碰撞检测结束后进行 
            //这里可以写一个我机生命值的判断条件
            // if(){
            // }
            if (this.enemy_bullet_array[i] != undefined && this.enemy_bullet_array[i].recycle == true) {
                this.recycle_enemy_bullet.push(this.enemy_bullet_array[i]); //把该子弹回收至回收子弹数组 
                this.enemy_bullet_array.splice(i, 1); //把该子弹从敌机子弹数组中删除           
            }
        }
    };
    //碰撞检测函数////////////////////
    mainStage.prototype.hitTest = function (obj1, obj2) {
        if (obj1 != undefined && obj2 != undefined) {
            var rect1 = obj1.getBounds();
            var rect2 = obj2.getBounds();
            rect1.x = obj1.x;
            rect1.y = obj1.y;
            rect2.x = obj2.x;
            rect2.y = obj2.y;
            return rect1.intersects(rect2);
        }
        else {
            return false;
        }
    };
    mainStage.prototype.bosscome = function () {
        if (this.bossstatic > 5) {
            this.boss = new boss; //创建boss
            this.boss.x = 200;
            this.boss.y = 300;
            this.addChild(this.boss);
            // this.boss.addEventListener(egret.Event.ENTER_FRAME, this.bossmove, this);
            if (this.boss.x < 0) {
                this.boss.x += 10;
            }
            if (this.boss.x > egret.MainContext.instance.stage.stageWidth) {
                this.boss.x -= 10;
            }
        }
    };
    return mainStage;
}(egret.DisplayObjectContainer));
__reflect(mainStage.prototype, "mainStage");
//# sourceMappingURL=Mainstage.js.map