/// <reference path="../helpers.js" />
// Rictusempra
// Tickle

var Rictusempra = function () {
    var self = this;

    self.name = "rictusempra";

    self.callback = function () {
        var body = $("body");

        var animator = new Animator();

        var currentRotation = self.rotateAmount;

        var intervalId = setInterval(function () {
            animator.rotate(body, currentRotation, self.interval);

            // Reverse the rotation.
            currentRotation = currentRotation * -1;
        }, self.interval);

        setTimeout(function () {
            clearInterval(intervalId);

            animator.rotate(body, 0, self.rotateTime);
        }, self.showTime);
    }

    self.rotateAmount = 30;
    self.interval = 250;
    self.showTime = 5000;
};