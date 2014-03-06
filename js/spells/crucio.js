/// <reference path="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js" />
/// <reference path="../helpers.js" />

// Crucio 
// Torture

var Crucio = function (colours, animator, randomColourFlasher, wand) {
    var self = this;

    self.name = "crucio";

    self.spellColours = colours;

    self.callback = function () {
        var body = $("body");

        wand.showWand(function () {
            wand.changeWandTipColour("#5DBA24");
            wand.pulsate(50);

            setTimeout(function () {
                randomColourFlasher.flashColours(body, self.spellColours, self.changeColourDelay, self.changeColourDuration, null);
            }, 1000);
        });
    }

    self.changeColourDelay = 500;
    self.changeColourDuration = 10000;
};