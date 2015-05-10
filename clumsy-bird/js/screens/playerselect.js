game.PlayerSelectScreen = game.SelectionScreen.extend({
    init: function() {
        var mysqlButton = {db: "MySQL", img: "mysqlbutton", targetImgs: "clumsy1"}
        var oracleButton = {db: "Oracle", img: "oraclebutton", targetImgs: "clumsy2"}
        var buttons = [mysqlButton, oracleButton];
        this._super(game.SelectionScreen, 'init', [buttons, PlayerButton, 'benchmarkbg']);
    },
});
