game.GameOverScreen = me.ScreenObject.extend({
    init: function() {
        this.savedData = null;
        this.handler = null;
        this.cursor = [0, 0];
        this.buttonGrid = [];
    },

    onResetEvent: function() {
        //save section
        this.savedData = {
            score: game.data.score,
            steps: game.data.steps
        };
        me.save.add(this.savedData);

        if (!me.save.topSteps) me.save.add({topSteps: game.data.steps});
        if (game.data.steps > me.save.topSteps) {
            me.save.topSteps = game.data.steps;
            game.data.newHiScore = true;
        }

        var gImage = me.loader.getImage('gameover');
        me.game.world.addChild(new me.Sprite(
                me.video.renderer.getWidth()/2 - gImage.width/2,
                me.video.renderer.getHeight()/2 - gImage.height/2 - 100,
                gImage
        ), 12);

        var gImageBoard = me.loader.getImage('gameoverbg');
        me.game.world.addChild(new me.Sprite(
            me.video.renderer.getWidth()/2 - gImageBoard.width/2,
            me.video.renderer.getHeight()/2 - gImageBoard.height/2,
            gImageBoard
        ), 10);

        me.game.world.addChild(new BackgroundLayer('bg', 1));

        // ground
        this.ground1 = me.pool.pull('ground', 0, me.video.renderer.getHeight() - 96);
        this.ground2 = me.pool.pull('ground', me.video.renderer.getWidth(),
                                    me.video.renderer.getHeight() - 96);
        me.game.world.addChild(this.ground1, 11);
        me.game.world.addChild(this.ground2, 11);
        
        // retry button
        this.retry = new RetryButton(me.video.renderer.getWidth()/2 - 180, me.video.renderer.getHeight() - 200);
        me.game.world.addChild(this.retry, 12);
        
        // new config button
        this.newConfig = new NewConfigButton(me.video.renderer.getWidth()/2, me.video.renderer.getHeight() - 200);
        me.game.world.addChild(this.newConfig, 12);

        // add the dialog witht he game information
        if (game.data.newHiScore) {
            var newRect = new me.Sprite(
                    235,
                    355,
                    me.loader.getImage('new')
            );
            me.game.world.addChild(newRect, 12);
        }

        this.dialog = new (me.Renderable.extend({
            // constructor
            init: function() {
                // size does not matter, it's just to avoid having a
                // zero size
                // renderable
                this._super(me.Renderable, 'init', [0, 0, 100, 100]);
                this.font = new me.Font('gamefont', 40, 'black', 'left');
                this.steps = 'Steps: ' + game.data.steps.toString();
                this.topSteps= 'Higher Step: ' + me.save.topSteps.toString();
            },

            draw: function (renderer) {
                var context = renderer.getContext();
                var stepsText = this.font.measureText(context, this.steps);
                var topStepsText = this.font.measureText(context, this.topSteps);
                var scoreText = this.font.measureText(context, this.score);

                //steps
                this.font.draw(
                    context,
                    this.steps,
                    me.game.viewport.width/2 - stepsText.width/2 - 60,
                    me.game.viewport.height/2
                );

                //top score
                this.font.draw(
                    context,
                    this.topSteps,
                    me.game.viewport.width/2 - stepsText.width/2 - 60,
                    me.game.viewport.height/2 + 50
                );
            }
        }));
        me.game.world.addChild(this.dialog, 12);
        
        this.buttonGrid = [[this.retry, this.newConfig]];
        
        me.input.bindKey(me.input.KEY.RIGHT, "right", true);
        me.input.bindKey(me.input.KEY.LEFT, "left", true);
        me.input.bindKey(me.input.KEY.UP, "up", true);
        me.input.bindKey(me.input.KEY.DOWN, "down", true);
        me.input.bindKey(me.input.KEY.SPACE, "select", true);
        // deal with button grid scrolling
        this.getHighlightedButton().alpha = 0.5;
        var _this = this;
        this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
            if (action === "select") {
                _this.getHighlightedButton().onClick();
            } else {
                _this.getHighlightedButton().alpha = 1.0;
                if (action === "left") {
                    _this.cursor = [_this.cursor[0], _this.cursor[1] - 1];
                } else if (action === "right") {
                    _this.cursor = [_this.cursor[0], _this.cursor[1] + 1];
                } else if (action === "up") {
                    _this.cursor = [_this.cursor[0] - 1, _this.cursor[1]];
                } else if (action === "down") {
                    _this.cursor = [_this.cursor[0] + 1, _this.cursor[1]];
                }
                _this.getHighlightedButton().alpha = 0.5;
            }
        });
    },
    
    getHighlightedButton: function() {
        var mod = function(x, n) {
            return ((x % n) + n) % n;
        }
        return this.buttonGrid[mod(this.cursor[0], this.buttonGrid.length)][mod(this.cursor[1], this.buttonGrid[0].length)];
    },

    onDestroyEvent: function() {
        // unregister the event
        this.ground1 = null;
        this.ground2 = null;
        this.font = null;
        me.audio.stop("theme");
        me.event.unsubscribe(this.handler);
        me.input.unbindKey(me.input.KEY.UP);
        me.input.unbindKey(me.input.KEY.DOWN);
        me.input.unbindKey(me.input.KEY.LEFT);
        me.input.unbindKey(me.input.KEY.RIGHT);
        me.input.unbindKey(me.input.KEY.SPACE);
    }
});
