/**
 * Created by apple on 2018/8/22.
 */

class UserPlane {
    constructor(){
        this.plan = null;
        this.bulletTime = 0;
        this.level = 1;
        this.hp = 1;
    }

    init(options){
        //创建战机
        this.plan = game.add.sprite(options.width/2,options.height-120, options.pic);
        this.plan.anchor.setTo(0.5, 0.5);
        this.plan.hp = options.hp?options.hp:10;
        this.hp = this.plan.hp;
        game.physics.arcade.enable(this.plan);

        //战机可以拖拽
        this.plan.inputEnabled = true;
        //this.plan.input.enableDrag(false);
        this.plan.scale.x = 1.3;
        this.plan.scale.y = 1.3;
        this.plan.body.collideWorldBounds = true;
    }

    fireBullet(userBullet){
        //发射子弹
        if(game.time.now > this.bulletTime){
            //等级为1 的时候
            this.setBullet({
                x:this.plan.x,
                y:this.plan.y-8,
                bX:0,
                bY:-900,
                time:100,
                userBullet
            });
            //等级为2
            if(this.level >= 2){
                this.setBullet({
                    x:this.plan.x-50,
                    y:this.plan.y-8,
                    bX:0,
                    bY:-900,
                    time:100,
                    userBullet
                });
                this.setBullet({
                    x:this.plan.x+50,
                    y:this.plan.y-8,
                    bX:0,
                    bY:-900,
                    time:100,
                    userBullet
                });
            }
            //等级为3
            if(this.level >= 3){
                this.setBullet({
                    x:this.plan.x-80,
                    y:this.plan.y-8,
                    bX:-300,
                    bY:-900,
                    time:100,
                    userBullet
                });
                this.setBullet({
                    x:this.plan.x+80,
                    y:this.plan.y-8,
                    bX:300,
                    bY:-900,
                    time:100,
                    userBullet
                });
            }
        }
    }

    setBullet(opt){
        let bullet = opt.userBullet.getFirstExists(false);
        if(bullet){
            bullet.reset(opt.x,opt.y);
            //子弹的 速度
            bullet.body.velocity.y = opt.bY;
            bullet.body.velocity.x = opt.bX;
            //子弹的频率
            this.bulletTime = game.time.now + opt.time;
        }
    }

    setPosition(result){
        this.plan.x += result.x;
        this.plan.y += result.y;
    }
}

export default  UserPlane;