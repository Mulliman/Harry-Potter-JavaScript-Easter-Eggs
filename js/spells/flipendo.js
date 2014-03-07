/// <reference path="../helpers.js" />
// Flipendo
// Knocks object backwords

var Flipendo = function (wand, animator) {
    var self = this;

    self.name = "flipendo";

    self.callback = function () {
        var body = $("body");

        wand.showWand(function () {
            wand.changeWandTipColour("#27F", function () {
                wand.pulsate();

                setTimeout(function () {
                    animator.rotateAndZoom(body, 1080, 0.25, self.rotateTime, function () {

                        body.css("transform", "rotate(0deg)");

                        setTimeout(function () {
                            animator.rotateAndZoom(body, 360, 1, self.rotateTime, function () {
                                body.css("transform", "rotate(0deg)");
                            });
                        }, 500);
                    });
                }, 1000);

                setTimeout(wand.hideWand, self.rotateTime * 3);
            });
        });
    }

    self.rotateTime = 500;
};