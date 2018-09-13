/**
 * Created by apple on 2018/8/22.
 *
 * 游戏第三关界面
 */
import Level from '../modules/level';

class Level_3 {
    constructor(){
        this.level = new Level();
    }

    create(){
        this.level.create({
            gameBg:'gameBg_3',
            planeHp:6,
            enemyPlane:[
                {
                    pic:'enemyPlane_4',
                    hp:9
                },
                {
                    pic:'enemyPlane_5',
                    speed:500,
                    loopTime:1900,
                    hp:10
                },
                {
                    pic:'enemyPlane_6',
                    speed:560,
                    loopTime:2800,
                    hp:15
                }
            ],
            setBoss:{
                hp:3000,
                pic:'enemyPlaneBoss_3',
                height:200,
                width:game.world.width/2
            },
            showBossScore:2000,
            nextLevel:'level_4',
            rewardCoins:userData.toConfirmCoins[3]
        });
    }

    update() {
        this.level.update();
    }
}

export default Level_3;