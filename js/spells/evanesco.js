// Evanesco 
// Vanish

var Evanesco = function (wand, flasher) {
    var self = this;

    self.name = "evanesco";

    self.callback = function () {
        var body = $("body");
        var elements = $("body *");

        wand.showWand(function () {
            setTimeout(function () {
                wand.hideWand(function () { elements.remove() });
                flasher.flashColour(body, self.spellColour, self.flashSpeed, self.flashTime);
            }, 1000);
        });
    }

    self.spellColour = "#000";
    self.flashSpeed = 50;
    self.flashTime = 500;
};