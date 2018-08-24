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
            str:'最终分数: ',
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
            str:'最终击落战机: ',
            style:{
                font: '88px Arial',
                fill: 'red'
            }
        });

        //重新试玩按钮
        let replayButton = game.add.button(game.world.centerX, 900, 'replayButton', this.replay);
        replayButton.anchor.setTo(0.5, 0.5);
        replayButton.scale.x = 3;
        replayButton.scale.y = 3;

    }

    replay(){
        game.time.events.start();
        game.state.start('start',false,true);
    }
}

export default End;