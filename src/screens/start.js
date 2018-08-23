/**
 * Created by apple on 2018/8/22.
 *
 * 游戏开始界面
 */
class Start {
    create(game){
        let startPlane_1 = game.add.image(0,0,'startPlayer_1');
        let startPlane_2 = game.add.image(0,game.world.height/3,'startPlayer_2');
        let startPlane_3 = game.add.image(0,game.world.height/3*2,'startPlayer_3');

        //设置宽高
        startPlane_1.width = startPlane_2.width = startPlane_3.width =game.world.width;
        startPlane_1.height = startPlane_2.height = startPlane_3.height = game.world.height/3;

        //绑定按下事件
        startPlane_1.inputEnabled = startPlane_2.inputEnabled = startPlane_3.inputEnabled = true;
        startPlane_1.events.onInputDown.add(()=>this.jumpNextScreen('userPlane_1'));
        startPlane_2.events.onInputDown.add(()=>this.jumpNextScreen('userPlane_2'));
        startPlane_3.events.onInputDown.add(()=>this.jumpNextScreen('userPlane_3'));
    }

    jumpNextScreen(name){
        //设置不同战机
        userData.plane = name;

        //开启第一关
        game.state.start('level_1');
    }
}

export default  Start;