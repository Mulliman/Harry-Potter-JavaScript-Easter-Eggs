/// <reference path="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js" />

// Crucio 
// Torture

var Crucio = function (colours) {
    var self = this;

    self.name = "crucio";

    console.log(colours);
    self.spellColours = colours;
    console.log(self.spellColours);

    self.callback = function () {
        $("body").append(self.containerMarkup);

        var container = $(self.containerSelector);

        var amountOfColours = self.spellColours.length;

        var intervalId = setInterval(function () {
            var i = getRandomNumber(0, amountOfColours);

            var colour = self.spellColours[i];

            container.css("background", colour);
        }, self.changeColourDelay);

        setTimeout(function () {
            clearInterval(intervalId);
            container.remove();
        }, self.stopAfterNMilliSeconds);
    }

    self.containerClass = "crucio";
    self.containerSelector = "." + self.containerClass;

    self.containerMarkup = '<div style="position:absolute; width:100%; height:100%; top: 0; left: 0;" class="' + self.containerClass + '"></div>';

    self.changeColourDelay = 50;
    self.stopAfterNMilliSeconds = 10000;
};

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}