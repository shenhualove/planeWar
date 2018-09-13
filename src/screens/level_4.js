/**
 * Created by apple on 2018/8/22.
 *
 * 游戏第四关界面
 */
import Level from '../modules/level';

class Level_4 {
    constructor(){
        this.level = new Level();
    }

    create(){
        this.level.create({
            gameBg:'gameBg_4',
            planeHp:6,
            enemyPlane:[
                {
                    pic:'enemyPlane_5',
                    hp:12
                },
                {
                    pic:'enemyPlane_6',
                    speed:500,
                    loopTime:1800,
                    hp:15
                },
                {
                    pic:'enemyPlane_7',
                    speed:560,
                    loopTime:2500,
                    hp:16
                }
            ],
            setBoss:{
                hp:4000,
                pic:'enemyPlaneBoss_4',
                height:200,
                width:game.world.width/2
            },
            showBossScore:3000,
            nextLevel:'end',
            rewardCoins:userData.toConfirmCoins[3]
        });
    }

    update() {
        this.level.update();
    }
}

export default Level_4;