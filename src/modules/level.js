/**
 * Created by apple on 2018/9/11.
 *
 * 关卡类
 */
import UserPlane  from '../modules/userPlane';
import EnemyPlane from '../modules/enemyPlane';
import Bullet     from '../modules/bullet';
import Explosion  from '../modules/explosion';
import UserScore  from '../modules/score';
import BossPlane  from '../modules/bossPlane';
import Resource   from '../modules/resource';
import Touch      from '../modules/touch';

class Level {
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
        this.yCoins = null;
        this.rCoins = null;
        this.setBoss = {};
        this.nextLevel = '';
        this.showBossScore = 1000;
        this.yArr=[];
        this.rArr=[];
        this.rewardCoins = 0;
    }

    create(options){
        let width = game.world.width,height = game.world.height;
        //添加背景
        this.bg = game.add.tileSprite(0,0,width,height,options.gameBg);
        game.sound.play('gameBg',0.5,true);

        //创建战机血条
        let userBlood = game.add.sprite(20,60, 'bloodEmpty');
        userBlood.scale.x = 1.5;
        this.userBlood = game.add.sprite(20,60, 'bloodFull');
        this.userBlood.scale.x = 1.5;
        let userBloodText = game.add.text(100,140,'战机生命值',{
            font: '28px Arial',
            fill: 'red'
        });
        userBloodText.anchor.setTo(0.5,0.5);

        //创建BOSS血条
        let bossBlood = game.add.sprite(width-220,60, 'bloodEmpty');
        bossBlood.scale.x = 1.5;
        this.bossBlood = game.add.sprite(width-220,60, 'bloodFull');
        this.bossBlood.scale.x = 1.5;
        let bossBloodText = game.add.text(width-140,140,'BOSS生命值',{
            font: '28px Arial',
            fill: 'red'
        });
        bossBloodText.anchor.setTo(0.5,0.5);

        //创建自己的战机
        this.userPlan = new UserPlane();
        this.userPlan.init({
            width,
            height,
            pic:userData.plane,
            hp:options.planeHp
        });
        this.showBossScore = options.showBossScore;

        //创建敌机
        for(let i = 1;i <= options.enemyPlane.length;i++){
            this['enemyPlane_'+i] = new EnemyPlane();
            this['enemyPlane_'+i].init(options.enemyPlane[i-1]);
        }

        //创建资源
        this.gem = new Resource();
        this.gem.init({
            pic:'baoshi',
            loopTime:10000
        });
        this.gasoline = new Resource();
        this.gasoline.init({
            pic:'gasoline',
            loopTime:18000
        });

        //创建金币 yCoins黄色金币 = 1个金币 rCoins红色金币 = 2个金币
        this.yCoins = new Resource();
        this.yCoins.init({
            pic:'yellowCoins',
            disableLoop:true,
            speed:900
        });
        this.rCoins = new Resource();
        this.rCoins.init({
            pic:'redCoins',
            disableLoop:true,
            speed:1050
        });
        this.rewardCoins = options.rewardCoins;

        //显示BOSS
        this.boss = new BossPlane();
        this.setBoss = options.setBoss;

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

        //加入手势
        this.touchMove = new Touch();
        this.touchMove.init({
            move:(position)=>this.userPlan.setPosition(position)
        });

        //下一关卡名字
        this.nextLevel = options.nextLevel;

        //计算投放金币
        let y = this.showBossScore/20;
        let r = this.showBossScore/5;
        for(let i = y;i <=this.showBossScore;i++){
            (i%y === 0) && this.yArr.push(i);
        }
        for(let i = r;i <=this.showBossScore;i++){
            (i%r === 0) && this.rArr.push(i);
        }
    }

    update(){
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
        game.physics.arcade.overlap([this.gem.items,this.gasoline.items,this.yCoins.items,this.rCoins.items], this.userPlan.plan, this.getResource, null, this);

        //是否出现BOSS
        this.checkShowBoss();

        //检测血条
        this.checkBlood();

        //消灭BOSS
        this.killBoss();

        //根据分数创建金币
        this.createCoins();
    }

    hitEnemy(bullet,enemy){
        let score = this.getPlaneScore(enemy.key);
        bullet.kill();
        if(this.enemyIsKill(enemy)){
            enemy.kill();
            this.explosion.play(enemy);
            game.sound.play('planeBoom');
            this.userScore.add(score);
            this.userShoot.add();
            this.theScore+=score;
        }

    }

    crashPlayer(player,enemy){
        this.planLevel(false);
        this.enemyIsKill(enemy) && enemy.kill();
        this.enemyIsKill(player) && this.playerDead(player);
    }

    hitPlayer(player,enemyBullet){
        enemyBullet.kill();
        this.planLevel(false);
        if(this.enemyIsKill(player)){
            this.explosion.play(player);
            this.playerDead(player);
        }
    }

    playerDead(player){
        player.kill();
        game.sound.play('planeBoom');
        userData.source += this.userScore.scoreNum;
        userData.shootPlane += this.userShoot.scoreNum;
        this.showBoss = false;
        game.state.start('end',false,true);

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
        if(this.userScore.scoreNum>=this.showBossScore&&!this.showBoss){
            //清除定时产生敌机
            game.time.events.stop();
            this.showBoss = true;
            game.sound.play('waring');
            this.boss.init(this.setBoss);
        }
    }

    enemyIsKill(enemy){
        enemy.hp--;
        if(enemy.key === this.setBoss.pic){
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

    killBoss(){
        if(this.boss.blood === 0){
            game.time.events.start();
            this.showBoss = false;
            userData.coinsNum += this.rewardCoins;
            userData.source += this.userScore.scoreNum;
            userData.shootPlane += this.userShoot.scoreNum;
            game.state.start(this.nextLevel);
        }
    }

    getResource(player,item){
        switch (item.key){
            case 'gasoline':
                this.planLevel(true);
                break;
            case 'baoshi':
                player.hp++;
                if(player.hp>this.userPlan.hp){
                    player.hp = this.userPlan.hp;
                }
                break;
            case 'yellowCoins':
                userData.coinsNum++;
                break;
            case 'redCoins':
                userData.coinsNum+=2;
                break;
            default :
                break;
        }
        item.kill();
    }

    planLevel(bool){
        let lv = this.userPlan.level;
        if(bool){
            if(lv+1>3){
                lv = 3
            }else{
                lv++;
            }
        }else{
            if(lv-1<1){
                lv = 1
            }else{
                lv--;
            }
        }
        this.userPlan.level = lv;
    }

    createCoins(){
        this.yArr.find((value, index) => {
            if(value && this.userScore.scoreNum >= value && this.userScore.scoreNum < this.yArr[index+1]) {
                this.yArr[index] = null;
                this.yCoins.create();
            }
        });
        this.rArr.find((value, index) => {
            if(value && this.userScore.scoreNum >= value && this.userScore.scoreNum < this.rArr[index+1]){
                this.rArr[index] = null;
                this.rCoins.create();
            }
        });
    }
}

export default Level;