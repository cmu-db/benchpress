game.StageSelectScreen = game.SelectionScreen.extend({
    init: function() {
        //var xButton = {db: "TPCC", img: "tpccbutton", targetImgs: {'bg': 'bg1', 'pipe': 'pipe1', 'ground': 'ground1'}}
        //var yButton = {db: "YCSB", img: "ycsbbutton", targetImgs: {'bg': 'bg2', 'pipe': 'pipe2', 'ground': 'ground2'}}
        //var zButton = {db: "TPCC", img: "tpccbutton", targetImgs: {'bg': 'bg3', 'pipe': 'pipe3', 'ground': 'ground3'}}
        //var wButton = {db: "YCSB", img: "ycsbbutton", targetImgs: {'bg': 'bg1', 'pipe': 'pipe1', 'ground': 'ground1'}}
        //var buttons = [xButton, yButton, zButton, wButton];
        //this._super(game.SelectionScreen, 'init', [buttons, StageButton, 'databasebg']);
        var mysqlButton = {db: "MYSQL", img: "mysqlbutton", targetImgs: {'bg': 'bg', 'pipe': 'pipe', 'ground': 'ground'}}
        var postgresButton = {db: "POSTGRES", img: "postgresbutton", targetImgs: {'bg': 'bg1', 'pipe': 'pipe1', 'ground': 'ground1'}}
        var timestenButton = {db: "TIMESTEN", img: "timestenbutton", targetImgs: {'bg': 'bg2', 'pipe': 'pipe2', 'ground': 'ground2'}}
        var nuodbButton = {db: "NUODB", img: "nuodbbutton", targetImgs: {'bg': 'bg3', 'pipe': 'pipe3', 'ground': 'ground3'}}
        var buttons = [mysqlButton, postgresButton, timestenButton, nuodbButton];
        this._super(game.SelectionScreen, 'init', [buttons, StageButton, 'databasebg']);
    },
});
