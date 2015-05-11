game.TitleScreen = me.ScreenObject.extend({
    init: function(){
        this._super(me.ScreenObject, 'init');
        this.font = null;
        this.ground1 = null;
        this.ground2 = null;
        this.logo = null;
        this.bird = null;
    },

    onResetEvent: function() {
        me.audio.stop("theme");
        if (!game.data.muted){
            me.audio.play("theme", true);  // commenting out this very annoying soundtrack
        }
        game.data.newHiScore = false;

        me.game.world.addChild(new BackgroundLayer('bg', 1));
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
        me.input.bindKey(me.input.KEY.SPACE, "enter", true);
        me.input.bindPointer(me.input.mouse.LEFT, me.input.KEY.ENTER);

        this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
            if (action === "enter") {
                me.state.change(game.states.PLAYER_SELECT);
            }
        });

        //logo
        var logoImg = me.loader.getImage("logo");
        this.logo = new me.Sprite(
            me.game.viewport.width/2 - 250,
            -logoImg,
            logoImg
        );
        me.game.world.addChild(this.logo, 10);

        this.bird = new me.AnimationSheet(me.game.viewport.width/2 - 40, -60, {
            image : me.loader.getImage('clumsy'),
            framewidth: 85,
            frameheight: 60,
            spritewidth: 85,
            spriteheight: 60
        });
        this.bird.addAnimation("fly", [0, 1, 2]);
        this.bird.setCurrentAnimation("fly");
        me.game.world.addChild(this.bird, 11);

        var that = this;
        var birdTween = me.pool.pull("me.Tween", this.bird.pos)
            .to({y: me.game.viewport.height/2 - 100}, 1000)
            .easing(me.Tween.Easing.Exponential.InOut).start();

        this.ground1 = me.pool.pull("ground", 0, me.video.renderer.getHeight() - 96);
        this.ground2 = me.pool.pull("ground", me.video.renderer.getWidth(),
                                    me.video.renderer.getHeight() - 96);
        me.game.world.addChild(this.ground1, 11);
        me.game.world.addChild(this.ground2, 11);

        /*
        me.game.world.addChild(new (me.Renderable.extend ({
            // constructor
            init: function() {
                // size does not matter, it's just to avoid having a zero size
                // renderable
                this._super(me.Renderable, 'init', [0, 0, 100, 100]);
                this.text = me.device.touch ? 'Tap to start' : 'PRESS SPACE OR CLICK LEFT MOUSE BUTTON TO START \n\t\t\t\t\t\t\t\t\t\t\tPRESS "M" TO MUTE SOUND';
                this.font = new me.Font('gamefont', 20, '#000');
            },
            draw: function (renderer) {
                var context = renderer.getContext();
                var measure = this.font.measureText(context, this.text);
                var xpos = me.game.viewport.width/2 - measure.width/2;
                var ypos = me.game.viewport.height/2 + 50;
                this.font.draw(context, this.text, xpos, ypos);
            }
        })), 12);
        */
    },

    onDestroyEvent: function() {
        // unregister the event
        me.event.unsubscribe(this.handler);
        me.input.unbindKey(me.input.KEY.ENTER);
        me.input.unbindKey(me.input.KEY.SPACE);
        me.input.unbindPointer(me.input.mouse.LEFT);
        this.ground1 = null;
        this.ground2 = null;
        me.game.world.removeChild(this.bird);
        me.game.world.removeChild(this.logo);
        this.bird = null;
        this.logo = null;
    }
});
