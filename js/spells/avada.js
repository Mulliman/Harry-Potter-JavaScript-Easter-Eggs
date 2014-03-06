/// <reference path="../helpers.js" />

// Avada Kedavra
// Killing curse (possibly green)

var AvadaKedavra = function (wand, randomColourFlasher) {
    var self = this;

    self.name = "avada kedavra";

    self.spellColour = "#5DBA24";
    self.redirectUrl = "/you-are-now-a-ghost";

    self.callback = function () {
        var body = $("body");

        wand.showWand(function () {
            wand.changeWandTipColour("#5DBA24");
            wand.pulsate(50);

            setTimeout(function () {
                flasher.flashColour(body, self.spellColour, self.flashSpeed, self.flashTime, function () {
                    window.location.replace(self.redirectUrl);
                });
            }, 1000);
        });
    }

    self.flashSpeed = 50;
    self.flashTime = 1000;
};