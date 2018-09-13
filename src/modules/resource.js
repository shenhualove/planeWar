/**
 * Created by apple on 2018/8/31.
 *
 * 补给资源
 */
class Resource {
    constructor(){
        this.items = null;
        this.maxWidth = 0;
        this.speed = 900;
    }

    init(options){
        this.items = game.add.group();
        this.items.enableBody = true;
        this.items.createMultiple(10, options.pic);
        this.items.setAll('anchor.x', 0.5);
        this.items.setAll('anchor.y', 0.5);
        this.items.setAll('outOfBoundsKill', true);
        this.items.setAll('checkWorldBounds', true);
        //产生敌人
        this.maxWidth = game.width - game.cache.getImage(options.pic).width;
        if(!options.disableLoop){
            game.time.events.loop(options.loopTime?options.loopTime:Phaser.Timer.SECOND , this.create,this);
        }
        options.speed && (this.speed = options.speed);
    }

    create(){
        let item = this.items.getFirstExists(false);
        if(item){
            item.scale.setTo(2,2);
            item.reset(game.rnd.integerInRange(0, this.maxWidth), 20);
            item.body.velocity.y = this.speed;
        }
    }
}

export default  Resource;