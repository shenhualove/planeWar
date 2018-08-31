/**
 * Created by apple on 2018/8/23.
 *
 * 敌机BOSS
 */

class BossPlane {
    constructor(){
        this.plan = null;
        this.hp = 100;
        this.blood = 100;
        this.left = true;
    }

    init(options){
        this.plan = game.add.group();
        this.plan.enableBody = true;
        this.plan.createMultiple(20, options.pic);
        this.plan.setAll('anchor.x', 0.5);
        this.plan.setAll('anchor.y', 0.5);
        this.plan.setAll('outOfBoundsKill', true);
        this.plan.setAll('checkWorldBounds', true);
        if(options.hp){
            this.hp = this.blood = options.hp;
        }
        let enemy = this.plan.getFirstExists(false);
        if(enemy){
            enemy.hp = this.hp;
            enemy.reset(options.width,options.height);
            this.move(enemy,options.height);
        }
    }

    fireBullet(enemyBullet){
        //发射子弹
        this.plan&&this.plan.forEachExists((enemy)=>{
            let width = game.world.width;
            for(let i = 0;i<16;i++){
                let bullet = enemyBullet.getFirstExists(false);
                if(bullet) {
                    if(game.time.now > (enemy['bulletTime'+i] || 0)) {
                        bullet.angle =180;
                        bullet.reset(enemy.x, enemy.y + 38);
                        bullet.body.velocity.y = 600;
                        if(i!==0){
                            bullet.body.velocity.x = (i<8?-(width/8*i):width/8*(i-7));
                        }
                        enemy['bulletTime'+i] = game.time.now + 1800;
                    }
                }
            }
            this.left = !this.left;
        });
    }

    move(enemy,height){
         setTimeout(()=>{
             game.add.tween(enemy).to( { x: game.rnd.integerInRange(100, game.world.width-300) }, 2000, null, true);
             this.move(enemy,height);
         },2000);
    }
}

export default BossPlane;