var StringUtil = require('StringUtil');
var UserData = require('UserData');

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
            var str = this.contentLabel.string;
            str +=  UserData.nickName + " 说： \n" + text + "\n";
            this.contentLabel.string = str;
            if(this.contentLabel.node.height > 540){
                this.contentView.height = this.contentLabel.node.height + 10;
                this.contentLabel.node.y = this.contentLabel.node.height + 5;
            }
        }
    }
});
