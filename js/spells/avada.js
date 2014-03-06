/// <reference path="../helpers.js" />

// Avada Kedavra
// Killing curse (possibly green)

var AvadaKedavra = function () {
    var self = this;

    self.name = "avada kedavra";

    self.spellColour = "#5DBA24";
    self.redirectUrl = "/you-are-now-a-ghost";

    self.callback = function () {
        var body = $("body");

        var animator = new Animator();
        var flasher = new ColourFlasher(animator);

        flasher.flashColour(body, self.spellColour, self.flashSpeed, self.flashTime, function () {
            window.location.replace(self.redirectUrl);
        });
    }

    self.flashSpeed = 50;
    self.flashTime = 1000;
};