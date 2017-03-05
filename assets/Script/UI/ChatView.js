var StringUtil = require('StringUtil');
var UserData = require('UserData');
var Net = require('Net');

cc.Class({
    extends: cc.Component,

    properties: {
        contentView: cc.Node,
        contentLabel: cc.Label,
    },

    // use this for initialization
    onLoad: function () {

    },

    onEditingReturn: function(editbox,  customEventData) {
        //这里 editbox 是一个 cc.EditBox 对象
        var text = StringUtil.trim(editbox.string);
        editbox.string = "";
        if(text.length > 0){
            var self = this;
            Net.sendMsg(text, "*", function(data) {
                var str = self.contentLabel.string;
                str +=  UserData.nickName + " 说： \n" + text + "\n";
                self.contentLabel.string = str;
                if(self.contentLabel.node.height > 540){
                    self.contentView.height = self.contentLabel.node.height + 10;
                    self.contentLabel.node.y = self.contentLabel.node.height + 5;
                }
	        });
        }
    }
});
