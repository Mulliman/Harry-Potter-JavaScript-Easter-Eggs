// Stupefy 
// Red flash and stuns

var Stupefy = function (animator, wand, flasher) {
    var self = this;

    self.name = "stupefy";

    self.spellColour = "rgba(200, 0, 0, 0.5)";

    self.callback = function () {
        var body = $("body");

        wand.showWand(function () {
            wand.changeWandTipColour("#E00", function () {
                wand.pulsate();

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

    self.flashSpeed = 33;
    self.flashTime = 500;
    self.freezeTime = 10000;
};