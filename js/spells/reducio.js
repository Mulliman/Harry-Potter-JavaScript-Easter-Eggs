// Reducio
// Make smaller

var Reducio = function () {
    var self = this;

    self.name = "reducio";

    self.callback = function () {
        var body = $("body");

        var animator = new Animator();

        animator.changeSize(body, 0.5, self.speed);

        setTimeout(function () {
            animator.changeSize(body, 1, self.speed);
        }, self.stopAfterNMilliSeconds);
    }

    self.speed = 1500;
    self.stopAfterNMilliSeconds = 10000;
};