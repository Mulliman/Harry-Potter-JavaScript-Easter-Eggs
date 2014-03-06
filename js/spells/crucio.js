/// <reference path="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js" />
/// <reference path="../helpers.js" />

// Crucio 
// Torture

var Crucio = function (colours) {
    var self = this;

    self.name = "crucio";

    self.spellColours = colours;

    self.callback = function () {
        var body = $("body");

        var animator = new Animator();
        var randomGenerator = new RandomGenerator();

        var randomColourFlasher = new RandomColourFlasher(animator, randomGenerator);



        randomColourFlasher.flashColours(body, self.spellColours, self.changeColourDelay, self.changeColourDuration, null);
    }

    self.changeColourDelay = 50;
    self.changeColourDuration = 10000;
};