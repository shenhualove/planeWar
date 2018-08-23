/**
 * Created by apple on 2018/8/22.
 *
 * 游戏第一关界面
 */
import UserPlane  from './modules/userPlane';
import EnemyPlane from './modules/enemyPlane';
import Bullet     from './modules/bullet';

class Level_1 {
    constructor(){
        this.bg = null;
        this.userPlan = null;
    }

    create(game){
        let width = game.world.width,height = game.world.height;
        //添加背景
        this.bg = game.add.tileSprite(0,0,width,height,'gameBg_1');

        //创建自己的战机
        new UserPlane.init(game);
        this.userPlan = game.add.sprite(width/2,height-120, userData.sex === 'man'?'userPlane_1':'userPlane_2');
        this.userPlan.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(this.userPlan);

    }

    update(){
        this.bg.tilePosition.y += 4;
    }
}

export default Level_1;