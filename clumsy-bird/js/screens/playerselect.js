game.PlayerSelectScreen = game.SelectionScreen.extend({
    init: function() {
        var mysqlButton = {db: "MySQL", img: "mysqlbutton", targetImgs: "clumsy1"}
        var postgresButton = {db: "Postgres", img: "postgresbutton", targetImgs: "clumsy2"}
        var buttons = [mysqlButton, postgresButton];
        this._super(game.SelectionScreen, 'init', [buttons, PlayerButton, 'benchmarkbg']);
    },
});
