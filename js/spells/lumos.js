/// <reference path="../wand.js" />
/// <reference path="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js" />
/// <reference path="../helpers.js" />

// Lumos
// Light

var Lumos = function (wand) {
    var self = this;

    self.name = "lumos";

    self.callback = function () {
        wand.showWand(function () {
            wand.changeWandTipColour("#FFF", function () {
                wand.pulsate();
            });
        });
    };
};