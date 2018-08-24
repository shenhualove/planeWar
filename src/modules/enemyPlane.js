/**
 * Created by apple on 2018/8/22.
 *
 * 敌机类
 */

class EnemyPlane {
    constructor() {
        this.plan = null;
        this.maxWidth = 0;
        this.speed = 400;
        this.hp = 1;
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
            this.hp = options.hp;
        }

        //产生敌人
        this.maxWidth = game.width - game.cache.getImage(options.pic).width;
        if(options.speed){
           this.speed = options.speed;
        }
        game.time.events.loop(options.loopTime?options.loopTime:Phaser.Timer.SECOND , this.create,this);
    }

    create(){
        let enemy = this.plan.getFirstExists(false);
        if(enemy){
            enemy.hp = this.hp;
            enemy.reset(game.rnd.integerInRange(0, this.maxWidth), 0);
            enemy.body.velocity.y = this.speed;
        }
    }

    fireBullet(enemyBullet){
        //发射子弹
        this.plan.forEachExists((enemy)=>{
            let bullet = enemyBullet.getFirstExists(false);
            if(bullet) {
                if(game.time.now > (enemy.bulletTime || 0)) {
                    bullet.angle =180;
                    bullet.reset(enemy.x, enemy.y + 38);
                    bullet.body.velocity.y = 800;
                    enemy.bulletTime = game.time.now + 600;
                }
            }
        });
    }
}

export default EnemyPlane;