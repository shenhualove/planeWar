/**
 * Created by apple on 2018/8/22.
 *
 * 游戏第一关界面
 */
import UserPlane  from '../modules/userPlane';
import EnemyPlane from '../modules/enemyPlane';
import Bullet     from '../modules/bullet';
import Explosion  from '../modules/explosion';
import UserScore  from '../modules/score';

class Level_1 {
    constructor(){
        this.bg = null;
        this.userPlan = null;
        this.enemyPlane_1 = null;
        this.enemyPlane_2 = null;
        this.enemyPlane_3 = null;
        this.userBullet = null;
        this.enemyBullet = null;
        this.bulletTime = 0;
        this.explosion = null;
    }

    create(){
        let width = game.world.width,height = game.world.height;
        //添加背景
        this.bg = game.add.tileSprite(0,0,width,height,'gameBg_1');
        game.sound.play('gameBg',0.5,true);

        //创建自己的战机
        this.userPlan = new UserPlane();
        this.userPlan.init({
            width,
            height,
            pic:userData.plane
        });

        //创建敌机
        this.enemyPlane_1 = new EnemyPlane();
        this.enemyPlane_1.init({
            pic:'enemyPlane_1'
        });
        this.enemyPlane_2 = new EnemyPlane();
        this.enemyPlane_2.init({
            pic:'enemyPlane_2',
            speed:500,
            loopTime:2000
        });
        this.enemyPlane_3 = new EnemyPlane();
        this.enemyPlane_3.init({
            pic:'enemyPlane_3',
            speed:560,
            loopTime:3000
        });

        //创建子弹
        this.userBullet = new Bullet().init({
            pic:userData.sex === 'man'?'userBullet_1':'userBullet_2'
        });
        this.enemyBullet = new Bullet().init({
            pic:'enemyBullet'
        });

        //创建爆炸动画
        this.explosion = new Explosion();
        this.explosion.init({
            pic:'planeBoom'
        });

        //创建计分牌
        this.userScore = new UserScore();
        this.userScore.init({
            str:'分数: ',
            style:{
                font: '38px Arial',
                fill: 'red'
            }
        });
        this.userShoot = new UserScore();
        this.userShoot.init({
            y:180,
            str:'击落战机: '
        });
    }

    update(){
        this.bg.tilePosition.y += 4;
        //自己发射子弹
        this.userPlan.fireBullet(this.userBullet);

        //敌人发射子弹
        this.enemyPlane_1.fireBullet(this.enemyBullet);
        this.enemyPlane_2.fireBullet(this.enemyBullet);
        this.enemyPlane_3.fireBullet(this.enemyBullet);

        //子弹碰撞敌人
        game.physics.arcade.overlap(this.userBullet,[this.enemyPlane_1.plan,this.enemyPlane_2.plan,
        this.enemyPlane_3.plan],this.hitEnemy,null,this);

        //飞机碰撞敌人
        game.physics.arcade.overlap([this.enemyPlane_1.plan,this.enemyPlane_2.plan,
        this.enemyPlane_3.plan] ,this.userPlan.plan,this.crashPlayer, null,this);

        //敌人子弹碰撞飞机
        game.physics.arcade.overlap(this.enemyBullet,this.userPlan.plan,this.hitPlayer,null,this);
    }

    hitEnemy(bullet,enemy){
        bullet.kill();
        this.explosion.play(enemy);
        enemy.kill();
        game.sound.play('planeBoom');
        this.userScore.add();
        this.userShoot.add();
    }

    crashPlayer(player,enemy){
        enemy.kill();
        this.playerDead(player);
    }

    hitPlayer(player,enemyBullet){
        this.explosion.play(player);
        enemyBullet.kill();
        this.playerDead(player);
    }

    playerDead(player){
        player.kill();
        game.sound.play('planeBoom');
        userData.source = this.userScore.scoreNum;
        userData.shootPlane = this.userShoot.scoreNum;
        game.state.start('end');
    }

}

export default Level_1;