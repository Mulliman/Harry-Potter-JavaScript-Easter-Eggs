/// <reference path="../helpers.js" />
// Flipendo
// Knocks object backwords

var Flipendo = function () {
    var self = this;

    self.name = "flipendo";

    self.callback = function () {
        var body = $("body");

        var animator = new Animator();

        animator.rotate(body, 360, self.rotateTime);
    }

    self.rotateTime = 500;
    self.showTime = 5000;
};