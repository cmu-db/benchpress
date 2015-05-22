game.StageSelectScreen = game.SelectionScreen.extend({
    init: function() {
        var xButton = {db: "TPCC", img: "tpccbutton", targetImgs: {'bg': 'bg1', 'pipe': 'pipe1', 'ground': 'ground1'}}
        var yButton = {db: "YCSB", img: "ycsbbutton", targetImgs: {'bg': 'bg2', 'pipe': 'pipe2', 'ground': 'ground2'}}
        //var buttons = [xButton, yButton];
        var buttons = [yButton, xButton];
        this._super(game.SelectionScreen, 'init', [buttons, StageButton, 'databasebg']);
    },
});
