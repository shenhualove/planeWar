/**
 * Created by apple on 2018/8/22.
 *
 * 游戏第一关界面
 */
import Level from '../modules/level';

class Level_1 {
    constructor(){
        this.level = new Level();
    }

    create(){
        this.level.create({
            gameBg:'gameBg_1',
            planeHp:6,
            enemyPlane:[
                {
                    pic:'enemyPlane_1',
                    hp:4
                },
                {
                    pic:'enemyPlane_2',
                    speed:500,
                    loopTime:2500,
                    hp:2
                },
                {
                    pic:'enemyPlane_3',
                    speed:560,
                    loopTime:4000,
                    hp:3
                }
            ],
            setBoss:{
                hp:1000,
                pic:'enemyPlaneBoss_1',
                height:200,
                width:game.world.width/2
            },
            showBossScore:400,
            nextLevel:'level_2',
            rewardCoins:userData.toConfirmCoins[0]
        });
    }

    update() {
        this.level.update();
    }

}

export default Level_1;