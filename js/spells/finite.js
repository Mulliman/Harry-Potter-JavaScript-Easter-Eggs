// Finite Incantatem
// Stops spells.

var FiniteIncantatem = function (wand) {
    var self = this;

    self.name = "finite";

    self.callback = function () {
        var body = $("body");

        wand.showWand(function () {
            wand.changeWandTipColour(self.spellColour, function () {
                wand.pulsate();

                setTimeout(function () {
                    flasher.flashColour(body, self.spellColour, self.flashSpeed, self.flashTime, function () {
                        location.reload();
                    });

                    wand.hideWand();
                }, 333);
            });
        });
    }

    self.spellColour = "#500";

    self.flashSpeed = 33;
    self.flashTime = 250;
};