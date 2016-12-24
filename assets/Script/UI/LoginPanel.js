var StringUtil = require('StringUtil')
var Connection = require('Connection')
var UserData = require('UserData')

cc.Class({
    extends: cc.Component,

    properties: {
        btnConfirm: cc.Button,
        nickEditBox: cc.EditBox,
        conn: Connection
    },

    // use this for initialization
    onLoad: function () {
        this.btnConfirm.interactable = false;
    },

    onTextChanged: function(text, editbox, customEventData){
        text = StringUtil.trim(text);

        if(text.length > 0){
            this.btnConfirm.interactable = true;
        }else{
            this.btnConfirm.interactable = false;
        }
    },

    onBtnClicked: function(event, customEventData){
        var text = StringUtil.trim(this.nickEditBox.string);
        this.nickEditBox.string = text;
        UserData.nickName = text;
        this.conn.startConnection();
    },
});
