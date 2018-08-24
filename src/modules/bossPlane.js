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
        }
    }

    fireBullet(enemyBullet){
        //发射子弹
        this.plan.forEachExists((enemy)=>{
            for(let i = 0;i<30;i++){
                let bullet = enemyBullet.getFirstExists(false);
                if(bullet) {
                    if(game.time.now > (enemy['bulletTime'+i] || 0)) {
                        bullet.angle =180;
                        bullet.reset(enemy.x, enemy.y + 38);
                        bullet.body.velocity.y = 800;
                        if(i!==0){
                            bullet.body.velocity.x = (this.left?Math.floor(Math.random()*-1000):Math.floor(Math.random()*100)*i);
                        }
                        enemy['bulletTime'+i] = game.time.now + 1500;
                    }
                }
            }
            this.left = !this.left;
        });
    }
}

export default BossPlane;