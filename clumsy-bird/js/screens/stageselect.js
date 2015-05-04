game.StageSelectScreen = game.SelectionScreen.extend({
    init: function() {
        var xButton = {db: "X", img: "clumsy2", stageImgs: {'bg': 'greenbg', 'pipe': 'greenpipe', 'ground': 'greenground'}}
        var yButton = {db: "Y", img: "clumsy", stageImgs: {'bg': 'icebg', 'pipe': 'icepipe', 'ground': 'iceground'}}
        var buttons = [xButton, yButton];
        this._super(game.SelectionScreen, 'init', [buttons, StageButton]);
    },
});
