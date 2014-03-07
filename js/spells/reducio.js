// Reducio
// Make smaller

var Reducio = function (wand, animator) {
    var self = this;

    self.name = "reducio";

    self.callback = function () {
        var body = $("body");

        wand.showWand(function () {
            wand.changeWandTipColour("#CCF", function () {
                wand.pulsate();

                animator.changeSize(body, 0.5, self.speed);

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