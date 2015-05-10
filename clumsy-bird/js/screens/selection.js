game.SelectionScreen = me.ScreenObject.extend({
    init: function(buttons, buttonFactory, bgimg, shape) {
        this.buttons = buttons;
        this.buttonFactory = buttonFactory;
        this.bgimg = bgimg;
        this.savedData = null;
        this.handler = null;
        this.cursor = [0, 0];
        this.buttonGrid = [];
        this.shape = shape;
        if (this.shape == null) {
            this.shape = [2, 2];
        }
        while (this.buttons.length < this.shape[0] * this.shape[1]) {
            this.buttons.push(this.buttons[0]);
        }
    },
    
    getHighlightedButton: function() {
        var mod = function(x, n) {
            return ((x % n) + n) % n;
        }
        return this.buttonGrid[mod(this.cursor[0], this.buttonGrid.length)][mod(this.cursor[1], this.buttonGrid[0].length)];
    },

    onResetEvent: function() {
        me.input.bindKey(me.input.KEY.RIGHT, "right", true);
        me.input.bindKey(me.input.KEY.LEFT, "left", true);
        me.input.bindKey(me.input.KEY.UP, "up", true);
        me.input.bindKey(me.input.KEY.DOWN, "down", true);
        me.input.bindKey(me.input.KEY.SPACE, "select", true);
        
        // tile buttons
        this.buttonGrid = [];
        this.cursor = [0, 0];
        for (var i = 0; i < this.shape[0]; i++) {
            this.buttonGrid.push([]);
            for (var j = 0; j < this.shape[1]; j++) {
                this.buttonGrid[i].push(null);
            }
        }
        var margin = 10;
        var fullWidth = -1;
        var fullHeight = -1;
        var centerX = me.video.renderer.getWidth() / 2;
        var centerY = me.video.renderer.getHeight() / 2;
        for (var i = 0; i < this.buttons.length; i++) {
            var gImage = me.loader.getImage(this.buttons[i].img);
            // figure out where the place the button
            if (fullWidth == -1) {
                fullWidth = (gImage.width + margin) * this.shape[0];
                fullHeight = (gImage.height + margin) * this.shape[1];
            }
            var row = Math.floor(i / this.shape[0]);
            var col = i % this.shape[0];
            var x = centerX - fullWidth / 2 + (gImage.width + margin) * col// - gImage.width / 2;
            var y = centerY - fullHeight / 2 + (gImage.height + margin) * row// - gImage.height / 2;
            var button = new this.buttonFactory(x, y, gImage, this.buttons[i].db, this.buttons[i].targetImgs);
            this.buttonGrid[row][col] = button;
            me.game.world.addChild(button, 12);
        }
        
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

        me.game.world.addChild(new BackgroundLayer(this.bgimg, 1));
    },
    
    onDestroyEvent: function() {
        // unregister the event
        me.event.unsubscribe(this.handler);
        me.input.unbindKey(me.input.KEY.UP);
        me.input.unbindKey(me.input.KEY.DOWN);
        me.input.unbindKey(me.input.KEY.LEFT);
        me.input.unbindKey(me.input.KEY.RIGHT);
        me.input.unbindKey(me.input.KEY.SPACE);
    }
});
