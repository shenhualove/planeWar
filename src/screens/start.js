/**
 * Created by apple on 2018/8/22.
 *
 * 游戏开始界面
 */
class Start {
    create(game){
        let start_man = game.add.image(0,0,'start_man');
        let start_women = game.add.image(0,game.world.height/2,'start_women');

        //设置宽高
        start_man.width = start_women.width = game.world.width;
        start_man.height = start_women.height = game.world.height/2;

        //绑定按下事件
        start_man.inputEnabled = true;
        start_women.inputEnabled = true;
        start_man.events.onInputDown.add(()=>this.jumpNextScreen('man',game));
        start_women.events.onInputDown.add(()=>this.jumpNextScreen('women',game));
    }

    jumpNextScreen(sex,game){
        //设置不同战机
        userData.sex = sex;

        //开启第一关
        game.state.start('level_1');
    }
}

export default  Start;