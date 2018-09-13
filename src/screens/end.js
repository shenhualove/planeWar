/**
 * Created by apple on 2018/8/22.
 *
 * 游戏结束界面
 */
import UserScore  from '../modules/score';

class End {
    constructor(){
        this.bg = null;
    }

    create(){
        let width = game.world.width,height = game.world.height;
        this.bg = game.add.sprite(0,0,'gameEnd');
        this.bg.width = width;
        this.bg.height = height;

        //创建计分牌
        this.userScore = new UserScore();
        this.userScore.scoreNum = userData.source;
        this.userScore.init({
            str:'最终游戏分数: ',
            y:200,
            style:{
                font: '88px Arial',
                fill: 'red'
            }
        });

        this.userShoot = new UserScore();
        this.userShoot.scoreNum = userData.shootPlane;
        this.userShoot.init({
            y:400,
            str:'最终击落敌机: ',
            style:{
                font: '88px Arial',
                fill: 'red'
            }
        });

        this.userCoins = new UserScore();
        this.userCoins.scoreNum = userData.coinsNum;
        this.userCoins.init({
            y:600,
            str:'获得闯关金币: ',
            style:{
                font: '88px Arial',
                fill: 'red'
            }
        });

        this.userRandCoins = new UserScore();
        this.userRandCoins.scoreNum = Math.floor(Math.random()*(userData.randCoins[1]-userData.randCoins[0]+1)+userData.randCoins[0]);
        this.userRandCoins.init({
            y:800,
            str:'获得随机金币: ',
            style:{
                font: '88px Arial',
                fill: 'red'
            }
        });

        //重新试玩按钮
        let replayButton = game.add.button(game.world.centerX, 1200, 'replayButton', this.replay);
        replayButton.anchor.setTo(0.5, 0.5);
        replayButton.scale.x = 3;
        replayButton.scale.y = 3;

    }

    replay(){
        window.location.reload();
        //game.time.events.start();
        //userData = {};
        //game.state.start('start',false,true);
    }
}

export default End;