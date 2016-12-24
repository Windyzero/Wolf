cc.Class({
    extends: cc.Component,

    properties: {
        loginPnl: cc.Node,
        mainPnl: cc.Node
    },

    // use this for initialization
    onLoad: function () {
    },

    enterMainPanel: function () {
        this.loginPnl.active = false;
        this.mainPnl.active = true;
    },
});
