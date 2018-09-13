/**
 * Created by apple on 2018/8/22.
 *
 * 游戏第二关界面
 */
import Level from '../modules/level';

class Level_2 {
    constructor(){
        this.level = new Level();
    }

    create(){
        this.level.create({
            gameBg:'gameBg_2',
            planeHp:6,
            enemyPlane:[
                {
                    pic:'enemyPlane_3',
                    hp:6
                },
                {
                    pic:'enemyPlane_4',
                    speed:500,
                    loopTime:2000,
                    hp:6
                },
                {
                    pic:'enemyPlane_5',
                    speed:560,
                    loopTime:2800,
                    hp:10
                }
            ],
            setBoss:{
                hp:2000,
                pic:'enemyPlaneBoss_2',
                height:200,
                width:game.world.width/2
            },
            showBossScore:1000,
            nextLevel:'level_3',
            rewardCoins:userData.toConfirmCoins[1]
        });
    }

    update() {
        this.level.update();
    }
}

export default Level_2;