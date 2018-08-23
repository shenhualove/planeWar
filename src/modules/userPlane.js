/**
 * Created by apple on 2018/8/22.
 */

class UserPlane {
    constructor(){
        this.plan = null;
        this.bulletTime = 0;
    }

    init(options){
        //创建战机
        this.plan = game.add.sprite(options.width/2,options.height-120, options.pic);
        this.plan.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(this.plan);

        //战机可以拖拽
        this.plan.inputEnabled = true;
        this.plan.input.enableDrag(false);
    }

    fireBullet(userBullet){
        //发射子弹
        if(game.time.now > this.bulletTime){
            // 获取子弹组里的第一颗子弹
            let bullet = userBullet.getFirstExists(false);
            if(bullet){
                bullet.reset(this.plan.x, this.plan.y - 8);
                //子弹的 速度
                bullet.body.velocity.y = -800;
                //子弹的频率
                this.bulletTime = game.time.now + 300;
            }
        }
    }
}

export default  UserPlane;