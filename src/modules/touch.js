/**
 * Created by apple on 2018/9/10.
 *
 * 手势触摸类
 */
class Swipe {
    constructor(){
        this.model =  null;
        this.x = 0;
        this.y = 0;
        this.swipe = false;
    }

    init(model){
        this.model = model;
        game.input.onDown.add(this.down,this);
        game.input.onUp.add(this.up,this);
        game.input.addMoveCallback(this.move,this)
    }

    down(){
        this.swipe = true;
        this.x = parseInt(game.input.pointer1.x);
        this.y = parseInt(game.input.pointer1.y);
    }

    up(){
        this.swipe = false;
        this.x = 0;
        this.y = 0;
    }

    move(){
        if(this.swipe){
            let point = game.input.pointer1;
            let x = parseInt(point.x)-this.x;
            let y = parseInt(point.y)-this.y;
            this.model.move({x,y});
            this.x = parseInt(point.x);
            this.y = parseInt(point.y);
        }
    }
}

export default Swipe;