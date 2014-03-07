/// <reference path="../helpers.js" />
// Petrificus Totalus 
// Stops the user from moving.

var PetrificusTotalus = function (wand, flasher) {
    var self = this;

    self.name = "petrificus totalus";

    self.callback = function () {
        var body = $("body");

        wand.showWand(function () {
            wand.changeWandTipColour("#FFF", function () {
                wand.pulsate(250);

                setTimeout(function () {
                    flasher.flashColour(body, self.spellColour, self.flashSpeed, self.flashTime, function () {
                        var elementFreezer = new ElementFreezer();
                        elementFreezer.freezeElement(body, self.freezeTime);
                        wand.hideWand();
                    });
                }, 1000);
            });
        });
    }

    self.spellColour = "#DDD";

    self.flashSpeed = 33;
    self.flashTime = 250;
    self.freezeTime = 10000;
};