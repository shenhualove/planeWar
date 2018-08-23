/**
 * Created by apple on 2018/8/22.
 *
 * 游戏主体逻辑
 */
import 'pixi';
import 'p2';
import Phaser from 'phaser';
import Start from './screens/start';
import Level_1 from './screens/level_1';

class GameMain {
    //加载游戏资源
    preload(game){
        //选择不同角色开始游戏
        game.load.image('start_man',require('./assets/sprites/start_man.jpg'));
        game.load.image('start_women',require('./assets/sprites/start_women.jpg'));

        //游戏地图不同关卡背景
        game.load.image('gameBg_1',require('./assets/sprites/gameBg_1.jpg'));
        game.load.image('gameBg_2',require('./assets/sprites/gameBg_2.jpg'));
        game.load.image('gameBg_3',require('./assets/sprites/gameBg_3.jpg'));
        game.load.image('gameBg_4',require('./assets/sprites/gameBg_4.jpg'));

        //敌人不同战机
        game.load.image('enemyPlane_1',require('./assets/sprites/enemyPlane_1.png'));
        game.load.image('enemyPlane_2',require('./assets/sprites/enemyPlane_2.png'));
        game.load.image('enemyPlane_3',require('./assets/sprites/enemyPlane_3.png'));
        game.load.image('enemyPlane_4',require('./assets/sprites/enemyPlane_4.png'));
        game.load.image('enemyPlane_5',require('./assets/sprites/enemyPlane_5.png'));
        game.load.image('enemyPlane_6',require('./assets/sprites/enemyPlane_6.png'));
        game.load.image('enemyPlane_7',require('./assets/sprites/enemyPlane_7.png'));

        //我的不同战机
        game.load.image('userPlane_1',require('./assets/sprites/userPlane_1.png'));
        game.load.image('userPlane_2',require('./assets/sprites/userPlane_2.png'));

        //BOSS
        game.load.image('enemyPlaneBoss_1',require('./assets/sprites/enemyPlaneBoss_1.png'));
        game.load.image('enemyPlaneBoss_2',require('./assets/sprites/enemyPlaneBoss_2.png'));
        game.load.image('enemyPlaneBoss_3',require('./assets/sprites/enemyPlaneBoss_3.png'));
        game.load.image('enemyPlaneBoss_4',require('./assets/sprites/enemyPlaneBoss_4.png'));

        //我的子弹
        game.load.image('gameBg_1',require('./assets/sprites/gameBg_1.jpg'));
        game.load.image('gameBg_1',require('./assets/sprites/gameBg_1.jpg'));

        //敌人子弹
        game.load.image('userBullet_1',require('./assets/sprites/userBullet_1.png'));
        game.load.image('userBullet_2',require('./assets/sprites/userBullet_2.png'));

        //战机爆炸动画
        game.load.image('planeBoom',require('./assets/sprites/planeBoom.png'));

        //加载资源进度条
        let progressText = game.add.text(game.world.centerX, game.world.centerY, '0%', {
            fontSize: '60px',
            fill: '#ffffff'
        });
        progressText.anchor.setTo(0.5, 0.5); //设置锚点，用于居中
        game.load.onFileComplete.add(function(progress) {
            progressText.text = progress + '%';
        });
    }

    //创建场景
    create(game){
        //开启物理系统 选择碰撞检测模式ARCADE
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //游戏适配模式
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //进入开始界面
        game.state.start('start');
    }

    //初始化
    init(width,height){
       return new Phaser.Game(width, height, Phaser.CANVAS, '', { preload: this.preload, create:this.create});
    }
}

window.onload = ()=>{
    window.userData = {};
    //创建游戏
    let game = new GameMain().init(1024,1536);
    game.state.add('start', new Start());
    game.state.add('level_1', new Level_1());
}