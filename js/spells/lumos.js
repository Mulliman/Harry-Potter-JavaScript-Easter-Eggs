/// <reference path="../wand.js" />
/// <reference path="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js" />
/// <reference path="../helpers.js" />

// Lumos
// Light

var Lumos = function () {
    var self = this;

    self.name = "lumos";

    self.x = 0;
    self.y = 0;

    (function () {
        // On instatiation we need to set a listener up to keep track of
        // the mouse so that lumos appears in the right place when triggered.
        // When the trigger is called these will be replaced with a different callback.

        $("body").mousemove(function (event) {
            var x = event.pageX;
            var y = event.pageY;

            self.x = x;
            self.y = y;
        });
    })();

    self.callback = function () {
        var animator = new Animator();
        var wand = new Wand(animator);

        wand.showWand(function () {
            wand.wandTipX = self.x;
            wand.wandTipY = self.y;

            wand.pulsate();
        });
    };
};