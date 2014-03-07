/// <reference path="../helpers.js" />
// Furnunculus 
// Covered in boils

var Furnunculus = function (wand, randomGenerator) {
    var self = this;

    self.name = "furnunculus";

    self.boilClass = "boil";
    self.boilSelector = "." + self.boilClass;

    self.callback = function () {
        var body = $("body");

        wand.showWand(function () {
            wand.changeWandTipColour("#FF6421", function () {
                wand.pulsate();

                var intervalId = setInterval(function () {
                    self.addBoil(body, randomGenerator);
                }, self.addDelay);

                setTimeout(function () {
                    clearInterval(intervalId);
                }, self.showTime * 2);

                setTimeout(function () {
                    wand.hideWand();
                }, self.showTime * 3);
            });
        });
        
    }

    self.addBoil = function (element, randomGenerator) {
        var left = randomGenerator.getRandomNumber(0, 100);
        var top = randomGenerator.getRandomNumber(0, 100);
        var diameter = randomGenerator.getRandomNumber(25, 250);
        var margin = diameter / 2 * -1;

        var id = left + "-" + top + "-" + diameter;

        var boil = '<div id="' + id + '" class="' + self.boilClass + '" style="left:' + left + '%; top:' + top + '%; width:' + diameter + 'px; height:' + diameter + 'px; margin-left:' + margin + 'px"></div>';

        element.append(boil);

        var boilElement = $("#" + id);

        boilElement.fadeOut(0);
        boilElement.fadeIn(self.fadeInSpeed);

        setTimeout(function () {
            boilElement.fadeOut(self.fadeOutSpeed);
            boilElement.remove();
        }, self.showTime);
    }

    self.fadeInSpeed = 500;
    self.fadeOutSpeed = 500;
    self.addDelay = 200;
    self.showTime = 5000;
};