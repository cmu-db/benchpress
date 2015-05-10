var game = {
    states: {
        PLAYER_SELECT: me.state.USER,
        STAGE_SELECT: me.state.USER + 1
    },
    
    data: {
        score : 0,
        steps: 0,
        start: false,
        newHiScore: false,
        muted: false,
        paused: false,
        text: "latency: 10",
        level: 200,
        playerImg: 'clumsy',
        stageImgs: {bg: 'bg', pipe: 'pipe1', ground: 'ground'},
        db: null,
        benchmark: null,
        targetHeight: 200,
        trueHeight: 200
    },

    "onload": function() {
        if (!me.video.init("screen", me.video.CANVAS, 900, 600, true, 'auto')) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }
        me.audio.init("mp3,ogg");

        me.loader.onload = this.loaded.bind(this);
        me.loader.preload(game.resources);
        me.state.change(me.state.LOADING);

        // add "#debug" to the URL to enable the debug Panel
        if (document.location.hash.match("debug")) {
            window.onReady(function () {
                me.plugin.register.defer(this, me.debug.Panel, "debug", me.input.KEY.V);
            });
        }
        
        socket.on('setup', function(msg) {
            if (msg == 'ready') {
                me.state.change(me.state.PLAY);
            } else {
                alert("Error loading configuration: " + msg);
            }
        });
        
        socket.on('height', function(msg) {
            game.data.trueHeight = parseInt(msg);
        });
    },

    "loaded": function() {
        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(game.states.PLAYER_SELECT, new game.PlayerSelectScreen());
        me.state.set(game.states.STAGE_SELECT, new game.StageSelectScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());
        me.state.set(me.state.GAME_OVER, new game.GameOverScreen());

        me.input.bindKey(me.input.KEY.UP, "up", true);
        me.input.bindKey(me.input.KEY.DOWN, "down", true);
        me.input.bindKey(me.input.KEY.P, "pause", true);
        me.input.bindKey(me.input.KEY.M, "mute", true);

        me.pool.register("clumsy", BirdEntity);
        me.pool.register("clumsyIndicator", BirdIndicatorEntity);
        me.pool.register("pipe", PipeEntity, true);
        me.pool.register("hit", HitEntity, true);
        me.pool.register("ground", Ground, true);

        // in melonJS 1.0.0, viewport size is set to Infinity by default
        me.game.viewport.setBounds(0, 0, 900, 600);
        me.state.change(me.state.MENU);
    }
};
