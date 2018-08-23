/**
 * Created by apple on 2018/8/23.
 *
 * 爆炸动画类
 */

class Explosion {
    constructor(){
        this.exp = null;
    }

    init(options){
        this.exp = game.add.group();
        this.exp.createMultiple(20,options.pic);
        this.exp.forEach(this.create);
    }

    create(expOne){
        expOne.anchor.x = 0.5;
        expOne.anchor.y = 0.5;
        expOne.animations.add('boom');
    }

    play(enemy){
        let e = this.exp.getFirstExists(false);
        e.scale.setTo(2,2)
        e.reset(enemy.x,enemy.y);
        e.play('boom', 10, false, true);
    }
}

export default Explosion;