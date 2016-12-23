var StringUtil = require('StringUtil')

cc.Class({
    extends: cc.Component,

    properties: {
        btnConfirm: cc.Button,
        nickEditBox: cc.EditBox
    },

    // use this for initialization
    onLoad: function () {
        this.btnConfirm.interactable = false;
    },

    onTextChanged: function(text, editbox, customEventData){
        text = StringUtil.trim(text);

//        console.log(text);
        if(text.length > 0){
//            console.log("length over 0");
            this.btnConfirm.interactable = true;
        }else{
//            console.log("length less 0");
            this.btnConfirm.interactable = false;
        }
    },

    onBtnClicked: function(event, customEventData){
        var text = this.nickEditBox.string;
        console.log('nickname: ' + text);
    },
});
