game.PlayerSelectScreen = game.SelectionScreen.extend({
    init: function() {
        var mysqlButton = {db: "MySQL", img: "clumsy", playerImg: "clumsy"}
        var oracleButton = {db: "Oracle", img: "clumsy2", playerImg: "clumsy2"}
        var buttons = [mysqlButton, oracleButton];
        this._super(game.SelectionScreen, 'init', [buttons, PlayerButton]);
    },
});
