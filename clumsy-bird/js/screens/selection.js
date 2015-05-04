game.SelectionScreen = me.ScreenObject.extend({
    init: function(buttons, buttonFactory) {
        this.buttons = buttons;
        this.buttonFactory = buttonFactory
        this.savedData = null;
        this.handler = null;
    },

    onResetEvent: function() {
        var margin = 10;
        for (var i = 0; i < this.buttons.length; i++) {
            var gImage = me.loader.getImage(this.buttons[i].img);
            // figure out where the place the button
            var centerX = me.video.renderer.getWidth()/2;
            var fullRowWidth =  (margin + gImage.width) * this.buttons.length;
            var occupiedWidth =  (margin + gImage.width) * i;
            var x = centerX - fullRowWidth / 2 + occupiedWidth - gImage.width/2;
            var y = me.video.renderer.getHeight()/2 - gImage.height/2 - 100;
            me.game.world.addChild(new this.buttonFactory(x, y, gImage, this.buttons[i].db, this.buttons[i].playerImg), 12);
        }

        me.game.world.addChild(new BackgroundLayer('bg', 1));

        // ground
        this.ground1 = me.pool.pull('ground', 0, me.video.renderer.getHeight() - 96);
        this.ground2 = me.pool.pull('ground', me.video.renderer.getWidth(),
                                    me.video.renderer.getHeight() - 96);
        me.game.world.addChild(this.ground1, 11);
        me.game.world.addChild(this.ground2, 11);

        // share button
        var buttonsHeight = me.video.renderer.getHeight() / 2 + 200;
        this.share = new Share(me.video.renderer.getWidth()/2 - 180, buttonsHeight);
        me.game.world.addChild(this.share, 12);
    },

    onDestroyEvent: function() {
        // unregister the event
        this.ground1 = null;
        this.ground2 = null;
    }
});
