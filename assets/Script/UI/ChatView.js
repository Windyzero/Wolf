var StringUtil = require('StringUtil');
var UserData = require('UserData');
var Net = require('Net');

cc.Class({
    extends: cc.Component,

    properties: {
        contentView: cc.Node,
        contentLabel: cc.Label,
        handler: require('NotifyHandler')
    },

    // use this for initialization
    onLoad: function () {
        this.handler.node.on("onChat", this._onChat, this);
    },

    onEditingReturn: function (editbox, customEventData) {
        //这里 editbox 是一个 cc.EditBox 对象
        var text = StringUtil.trim(editbox.string);
        editbox.string = "";
        if (text.length > 0) {
            Net.sendMsg(text, "*", function (data) { });
        }
    },

    _onChat: function (event) {
        var data = event.detail.data;
        var str = this.contentLabel.string;
        str += data.from + " 说： \n" + data.msg + "\n";
        this.contentLabel.string = str;
        if (this.contentLabel.node.height > 540) {
            this.contentView.height = this.contentLabel.node.height + 10;
            this.contentLabel.node.y = this.contentLabel.node.height + 5;
        }
    }
});
