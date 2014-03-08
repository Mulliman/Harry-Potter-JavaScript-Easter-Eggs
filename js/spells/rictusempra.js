/// <reference path="../helpers.js" />
// Rictusempra
// Tickle

var Rictusempra = function (wand, animator) {
    var self = this;

    self.name = "rictusempra";

    self.callback = function () {
        var body = $("body");

        var currentRotation = self.rotateAmount;

        wand.showWand(function () {
            wand.changeWandTipColour("#DDD", function () {
                wand.pulsate(250);

                var intervalId = setInterval(function () {
                    animator.rotate(body, currentRotation, self.interval);

                    // Reverse the rotation.
                    currentRotation = currentRotation * -1;
                }, self.interval);

                setTimeout(function () {
                    clearInterval(intervalId);

                    wand.hideWand();

                    animator.rotate(body, 0, self.rotateTime);
                }, self.showTime);
            });
        });
    }

    self.rotateAmount = 5;
    self.interval = 100;
    self.showTime = 5000;
};