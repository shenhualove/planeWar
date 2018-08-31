/**
 * Created by apple on 2018/8/31.
 *
 * 补给资源
 */
class Resource {
    constructor(){
        this.items = null;
        this.maxWidth = 0;
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
        game.time.events.loop(options.loopTime?options.loopTime:Phaser.Timer.SECOND , this.create,this);
    }

    create(){
        let item = this.items.getFirstExists(false);
        if(item){
            item.scale.setTo(2,2);
            item.reset(game.rnd.integerInRange(0, this.maxWidth), 0);
            item.body.velocity.y = 600;
        }
    }
}

export default  Resource;