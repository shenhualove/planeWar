/**
 * Created by apple on 2018/8/22.
 *
 * 子弹类
 */

class Bullet {
    constructor(){
        this.bullets = null;
    }

    init(options){
        this.bullets = game.add.group();
        this.bullets.enableBody = true;
        this.bullets.createMultiple(50, options.pic);
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 1);
        this.bullets.setAll('outOfBoundsKill', true);
        this.bullets.setAll('checkWorldBounds', true);

        return this.bullets;
    }


}

export default  Bullet;