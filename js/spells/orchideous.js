// Orchideous
// Makes flowers

var Orchideous = function (wand, randomGenerator) {
    var self = this;

    self.name = "orchideous";

    self.flowerClass = "flower";
    self.flowerSelector = "." + self.flowerClass;

    self.petalClass = "petal";
    self.middleClass = "middle";
    self.amountOfPetals = 4;

    self.callback = function () {
        var body = $("body");

        wand.showWand(function () {
            wand.changeWandTipColour("pink", function () {
                wand.pulsate();

                setTimeout(function () {
                    var intervalId = setInterval(function () {
                        self.addFlower(body, randomGenerator);
                    }, self.addDelay);

                    setTimeout(function () {
                        clearInterval(intervalId);
                    }, self.showTime * 2);

                    setTimeout(function () {
                        wand.hideWand();
                    }, self.showTime * 3);
                }, 1000);
            });
        });
    }

    self.addFlower = function (element, randomGenerator) {
        var left = randomGenerator.getRandomNumber(0, 100);
        var top = randomGenerator.getRandomNumber(0, 100);
        var diameter = randomGenerator.getRandomNumber(25, 250);
        var margin = diameter / 2 * -1;

        var id = left + "-" + top + "-" + diameter;

        var flower = '<div id="' + id + '" class="' + self.flowerClass + '" style="left:' + left + '%; top:' + top + '%; width:' + diameter + 'px; height:' + diameter + 'px; margin-left:' + margin + 'px"></div>';
        element.append(flower);
        var flowerElement = $("#" + id);

        flowerElement.append('<div class="' + self.middleClass + '"></div>');

        for (var i = 1; i <= self.amountOfPetals; i++) {
            var specificPetalClass = self.petalClass + '-' + i;

            flowerElement.append('<div class="' + self.petalClass + ' ' + specificPetalClass + '"></div>');
        }

        flowerElement.fadeOut(0);
        flowerElement.fadeIn(self.fadeInSpeed);

        setTimeout(function () {
            flowerElement.fadeOut(self.fadeOutSpeed);
            flowerElement.remove();
        }, self.showTime);
    }

    self.fadeInSpeed = 500;
    self.fadeOutSpeed = 500;
    self.addDelay = 200;
    self.showTime = 5000;
};