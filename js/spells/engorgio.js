/// <reference path="../helpers.js" />
// Engorgio
// Make bigger

var Engorgio = function (wand, animator) {
    var self = this;

    self.name = "engorgio";

    self.callback = function () {
        var body = $("body");

        wand.showWand(function () {
            wand.changeWandTipColour("#7bF", function () {
                wand.pulsate();

                animator.changeSize(body, 1.5, self.speed);

                setTimeout(function () {
                    animator.changeSize(body, 1, self.speed);
                    wand.hideWand();
                }, self.duration);
            });
        });
    }

    self.speed = 1500;
    self.duration = 10000;
};