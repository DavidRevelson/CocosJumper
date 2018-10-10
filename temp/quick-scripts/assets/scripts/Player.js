(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Player.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1797c6mB/pDsoiH3I0K5TAL', 'Player', __filename);
// scripts/Player.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {

        jumpHeight: 0,
        jumpDuration: 0,
        maxMoveSpeed: 0,
        accel: 0,

        jumpAudio: {
            default: null,
            type: cc.AudioClip
        },

        leftButton: {
            default: null,
            type: cc.Node
        },

        rightButton: {
            default: null,
            type: cc.Node
        }

    },

    colorfulPlayer: function colorfulPlayer() {

        this.node.runAction(cc.sequence(cc.tintTo(2, 255, 0, 0), cc.delayTime(0.5), cc.tintTo(2, 255, 255, 255)).repeatForever());
    },


    setJumpAction: function setJumpAction() {
        var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());

        // sound: add a callback function to invoke other defined methods after the action is finished
        var callback = cc.callFunc(this.playJumpSound, this);

        return cc.repeatForever(cc.sequence(jumpUp, jumpDown, callback));
    },

    playJumpSound: function playJumpSound() {
        // invoke sound engine to play the sound
        var id = cc.audioEngine.playEffect(this.jumpAudio, false);
        cc.audioEngine.setVolume(id, 0.1);
    },

    onKeyDown: function onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
                this.accLeft = true;
                break;
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                this.accRight = true;
                break;

            default:
                break;
        }
    },
    onKeyUp: function onKeyUp(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
                this.accLeft = false;
                break;
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                this.accRight = false;
                break;
            default:
                break;
        }
    },


    // LIFE-CYCLE CALLBACKS:


    onLoad: function onLoad() {
        this.jumpAction = this.setJumpAction();
        this.node.runAction(this.jumpAction);

        this.colorfulPlayer();

        this.accLeft = false;
        this.accRight = false;

        this.xSpeed = 0;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onDestroy: function onDestroy() {
        // Cancel keyboard input monitoring
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
    start: function start() {},


    update: function update(dt) {
        var _this = this;

        // update speed of each frame according to the current acceleration direction

        if (this.leftButton) {
            this.leftButton.on(cc.Node.EventType.TOUCH_START, function (event) {
                _this.accLeft = true;
            });
            this.leftButton.on(cc.Node.EventType.TOUCH_END, function (event) {
                _this.accLeft = false;
            });
            this.leftButton.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
                _this.accLeft = false;
            });
        }

        if (this.rightButton) {
            this.rightButton.on(cc.Node.EventType.TOUCH_START, function (event) {
                _this.accRight = true;
            });
            this.rightButton.on(cc.Node.EventType.TOUCH_END, function (event) {
                _this.accRight = false;
            });
            this.rightButton.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
                _this.accRight = false;
            });
        }

        if (this.accLeft) {
            this.xSpeed -= this.accel * dt;
            this.node.scaleX = -1;
        } else if (this.accRight) {
            this.node.scaleX = 1;
            this.xSpeed += this.accel * dt;
        }
        // restrict the movement speed of the main character to the maximum movement speed
        if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
            // if speed reach limit, use max speed with current direction
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }

        // update the position of the main character according to the current speed
        this.node.x += this.xSpeed * dt;
    }

});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Player.js.map
        