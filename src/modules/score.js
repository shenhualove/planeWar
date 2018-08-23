/**
 * Created by apple on 2018/8/23.
 *
 * 计算分数
 */

class UserScore {
    constructor(){
        this.scoreText = null;
        this.scoreNum = 0;
        this.str = '';
    }

    init(options = {x:0,y:0,str:'',style:{}}){
        let opt = {
            x:game.world.centerX,
            y:80,
            str:'',
            style:{
                font: '38px Arial',
                fill: '#fff'
            }
        }
        options = Object.assign(opt,options,{});
        this.str = options.str;
        this.scoreText = game.add.text(options.x,options.y,this.str + this.scoreNum,options.style);
        this.scoreText.anchor.setTo(0.5,0.5);
    }

    add(n = 1){
        this.scoreNum += n;
        this.scoreText.text = this.str + this.scoreNum;
    }
}

export default  UserScore;