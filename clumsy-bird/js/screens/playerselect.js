game.PlayerSelectScreen = game.SelectionScreen.extend({
    init: function() {
        //var mysqlButton = {db: "MySQL", img: "mysqlbutton", targetImgs: "clumsy1"}
        //var postgresButton = {db: "Postgres", img: "postgresbutton", targetImgs: "clumsy2"}
        //var timestenButton = {db: "TimesTen", img: "mysqlbutton", targetImgs: "clumsy3"}
        //var nuodbButton = {db: "NuoDB", img: "postgresbutton", targetImgs: "clumsy"}
        //var buttons = [mysqlButton, postgresButton, timestenButton, nuodbButton];
        //this._super(game.SelectionScreen, 'init', [buttons, PlayerButton, 'benchmarkbg']);
        var ycsbButton = {db: "YCSB", img: "ycsbbutton", targetImgs: "clumsy1"}
        var tpccButton = {db: "TPCC", img: "tpccbutton", targetImgs: "clumsy2"}
        //var ycsbButton = {db: "YCSB", img: "ycsbbutton", targetImgs: "clumsy3"}
        //var nuodbButton = {db: "NuoDB", img: "postgresbutton", targetImgs: "clumsy"}
        var buttons = [ycsbButton, tpccButton]; //, tpccButton, ycsbButton];
        this._super(game.SelectionScreen, 'init', [buttons, PlayerButton, 'benchmarkbg', [2,1]]);
    },
});
