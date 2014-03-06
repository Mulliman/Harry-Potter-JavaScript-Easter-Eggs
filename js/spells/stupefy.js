// Stupefy 
// Red flash and stuns

var Stupefy = function () {
    var self = this;

    self.name = "stupefy";

    self.spellColour = "#D00";

    self.callback = function () {
        var body = $("body");

        var animator = new Animator();
        var flasher = new ColourFlasher(animator);

        flasher.flashColour(body, self.spellColour, self.flashSpeed, self.flashTime, function () {
            var elementFreezer = new ElementFreezer();
            elementFreezer.freezeElement(body, self.freezeTime);
        });
    }

    self.flashSpeed = 33;
    self.flashTime = 500;
    self.freezeTime = 10000;
};