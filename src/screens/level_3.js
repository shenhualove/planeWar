/**
 * Created by apple on 2018/8/22.
 *
 * 游戏第三关界面
 */
import UserPlane  from '../modules/userPlane';
import EnemyPlane from '../modules/enemyPlane';
import Bullet     from '../modules/bullet';
import Explosion  from '../modules/explosion';
import UserScore  from '../modules/score';
import BossPlane  from '../modules/bossPlane';
import Resource   from '../modules/resource';

class Level_3 {
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
        this.boss = null;
        this.showBoss = false;
        this.userBlood = null;
        this.bossBlood = null;
        this.theScore = 0;
        this.gem = null;
        this.gasoline = null;
    }

    create(){
        let width = game.world.width,height = game.world.height;
        //添加背景
        this.bg = game.add.tileSprite(0,0,width,height,'gameBg_3');
        game.sound.play('gameBg',0.5,true);

        //创建战机血条
        let userBlood = game.add.sprite(20,60, 'bloodEmpty');
        userBlood.scale.x = 1.5;
        this.userBlood = game.add.sprite(20,60, 'bloodFull');
        this.userBlood.scale.x = 1.5;
        let userBloodText = game.add.text(100,140,'战机生命值',{
            font: '28px Arial',
            fill: '#ae8f23'
        });
        userBloodText.anchor.setTo(0.5,0.5);

        //创建BOSS血条
        let bossBlood = game.add.sprite(width-220,60, 'bloodEmpty');
        bossBlood.scale.x = 1.5;
        this.bossBlood = game.add.sprite(width-220,60, 'bloodFull');
        this.bossBlood.scale.x = 1.5;
        let bossBloodText = game.add.text(width-140,140,'BOSS生命值',{
            font: '28px Arial',
            fill: '#ae8f23'
        });
        bossBloodText.anchor.setTo(0.5,0.5);

        //创建自己的战机
        this.userPlan = new UserPlane();
        this.userPlan.init({
            width,
            height,
            pic:userData.plane,
            hp:8
        });

        //创建敌机
        this.enemyPlane_1 = new EnemyPlane();
        this.enemyPlane_1.init({
            pic:'enemyPlane_4',
            hp:3
        });
        this.enemyPlane_2 = new EnemyPlane();
        this.enemyPlane_2.init({
            pic:'enemyPlane_5',
            speed:500,
            loopTime:1900,
            hp:4
        });
        this.enemyPlane_3 = new EnemyPlane();
        this.enemyPlane_3.init({
            pic:'enemyPlane_6',
            speed:560,
            loopTime:2800,
            hp:5
        });

        //创建资源
        this.gem = new Resource();
        this.gem.init({
            pic:'baoshi',
            loopTime:5000
        });
        this.gasoline = new Resource();
        this.gasoline.init({
            pic:'gasoline',
            loopTime:8000
        });

        //显示BOSS
        this.boss = new BossPlane();

        //创建子弹
        this.userBullet = new Bullet().init({
            pic:userData.plane?'userBullet_2':'userBullet_1',
        });
        this.enemyBullet = new Bullet().init({
            pic:'enemyBullet'
        });
        this.bossBullet = new Bullet().init({
            pic:'bossBullet'
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

    update() {
        this.bg.tilePosition.y += 4;
        //自己发射子弹
        this.userPlan.fireBullet(this.userBullet);

        //敌人发射子弹
        this.enemyPlane_1.fireBullet(this.enemyBullet);
        this.enemyPlane_2.fireBullet(this.enemyBullet);
        this.enemyPlane_3.fireBullet(this.enemyBullet);
        this.showBoss && this.boss.fireBullet(this.bossBullet);

        //子弹碰撞敌人
        game.physics.arcade.overlap(this.userBullet, [this.enemyPlane_1.plan, this.enemyPlane_2.plan,
            this.enemyPlane_3.plan, this.boss.plan], this.hitEnemy, null, this);

        //飞机碰撞敌人
        game.physics.arcade.overlap([this.enemyPlane_1.plan, this.enemyPlane_2.plan,
            this.enemyPlane_3.plan, this.boss.plan], this.userPlan.plan, this.crashPlayer, null, this);

        //敌人子弹碰撞飞机
        game.physics.arcade.overlap([this.enemyBullet, this.bossBullet], this.userPlan.plan, this.hitPlayer, null, this);

        //飞机碰撞到资源
        game.physics.arcade.overlap([this.gem.items,this.gasoline.items], this.userPlan.plan, this.getResource, null, this);

        //是否出现BOSS
        this.checkShowBoss();

        //检测血条
        this.checkBlood();

        //检测战机升级
        this.checkPlanLevel();

        //消灭BOSS
        this.killBoss();
    }

    hitEnemy(bullet,enemy){
        let score = this.getPlaneScore(enemy.key);
        bullet.kill();
        if(this.enemyIsKill(enemy)){
            enemy.kill();
            this.explosion.play(enemy);
            this.userScore.add(score);
            this.userShoot.add();
            this.theScore+=score;
        }
        game.sound.play('planeBoom');
    }

    crashPlayer(player,enemy){
        this.userPlan.level = 1;
        this.enemyIsKill(enemy) && enemy.kill();
        this.enemyIsKill(player) && this.playerDead(player);
    }

    hitPlayer(player,enemyBullet){
        enemyBullet.kill();
        this.userPlan.level = 1;
        if(this.enemyIsKill(player)){
            this.explosion.play(player);
            this.playerDead(player);
        }
    }

    playerDead(player){
        player.kill();
        game.sound.play('planeBoom');
        userData.source = this.userScore.scoreNum;
        userData.shootPlane = this.userShoot.scoreNum;
        game.state.start('end',false,true);
        this.showBoss = false;
    }

    getPlaneScore(name){
        //根据不同的敌机类型，返回不同分数
        switch(name){
            case "enemyPlane_1":
                return 2;
            case "enemyPlane_2":
                return 4;
            case "enemyPlane_3":
                return 5;
            case "enemyPlane_4":
                return 7;
            case "enemyPlane_5":
                return 8;
            case "enemyPlane_6":
                return 10;
            case "enemyPlane_7":
                return 12;
            case "enemyPlaneBoss_1":
                return 200;
            case "enemyPlaneBoss_2":
                return 320;
            case "enemyPlaneBoss_3":
                return 480;
            case "enemyPlaneBoss_4":
                return 600;
            default :
                return 0;
        }
    }

    checkShowBoss(){
        if(this.userScore.scoreNum>400&&!this.showBoss){
            //清除定时产生敌机
            game.time.events.stop();
            this.showBoss = true;
            game.sound.play('waring');
            this.boss.init({
                hp:480,
                pic:'enemyPlaneBoss_3',
                height:200,
                width:game.world.width/2
            });
        }
    }

    enemyIsKill(enemy){
        enemy.hp--;
        if(enemy.key === 'enemyPlaneBoss_3'){
            this.boss.blood = enemy.hp;
        }
        if(enemy.hp<=0){
            return true
        }
        return false;
    }

    checkBlood(){
        this.userBlood.scale.x = this.userPlan.plan.hp/this.userPlan.hp *1.5;
        if(this.showBoss){
            this.bossBlood.scale.x = (this.boss.blood/this.boss.hp *1.5);
        }
    }

    checkPlanLevel(){

    }

    killBoss(){
        if(this.boss.blood === 0){
            game.time.events.start();
            this.showBoss = false;
            game.state.start('level_4');
        }
    }

    getResource(player,item){
        if(item.key === 'gasoline'){
            this.userPlan.level = 2;
        }
        if(item.key === 'baoshi'){
            player.hp++;
            if(player.hp>this.userPlan.hp){
                player.hp = this.userPlan.hp;
            }
        }
        item.kill();
    }

}

export default Level_3;