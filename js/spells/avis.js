/// <reference path="../helpers.js" />

// Avis
// Birds

var Avis = function (wand, randomGenerator, birds) {
    var self = this;

    self.name = "avis";

    self.birdClass = "bird";
    self.birdSelector = "." + self.birdClass;

    self.fadeInSpeed = 500;
    self.addDelay = 100;
    self.addTime = 3000;
    self.animateTime = 1000;

    self.callback = function () {
        var body = $("body");

        wand.showWand(function () {
            wand.changeWandTipColour("#37C", function () {
                wand.pulsate();

                body.css("overflow-x", "hidden");

                var intervalId = setInterval(function () {
                    var wandLocation = wand.getWandLocationsForPoint(wand.mouseLocationX, wand.mouseLocationY);
                    self.addBird(body, randomGenerator, wandLocation.wandCenter, wandLocation.wandTop);
                }, self.addDelay);

                setTimeout(function () {
                    clearInterval(intervalId);

                    setTimeout(function () {
                        body.css("overflow-x", "");
                        wand.hideWand();
                    }, self.animateTime);
                }, self.addTime);
            });
        });
    };

    self.addBird = function (rootElement, randomGenerator, x, y) {
        var useBottom = randomGenerator.getRandomNumber(0, 10) % 2 == 0;
        var useRight = randomGenerator.getRandomNumber(0, 10) % 2 == 0;

        var birdElement = self.createBirdElement(x, y, useRight, useBottom);

        rootElement.append(birdElement);
        birdElement.fadeOut(0);
        birdElement.fadeIn(self.fadeInSpeed);

        var options = self.getRandomAnimationOptions(useRight, useBottom);

        birdElement.animate(options, self.showTime, function () {
            // Animation complete.
            birdElement.remove();
        });
    };

    self.createBirdElement = function (x, y, useRight, useBottom) {
        var diameter = randomGenerator.getRandomNumber(33, 66);
        var margin = diameter / 2 * -1;

        y = y - diameter;

        var id = randomGenerator.getRandomNumber(0, 999999);

        var birdElement = $('<div id="' + id + '"></div>');
        birdElement.addClass(self.birdClass);

        if (useRight) {
            var bodyWidth = $(window).width();

            birdElement.css("right", bodyWidth - x);
        } else {
            birdElement.css("left", x);
        }

        if (useBottom) {
            var bodyHeight = $(window).height();

            birdElement.css("bottom", bodyHeight - y);
        } else {
            birdElement.css("top", y);
        }

        birdElement.css("height", diameter);
        birdElement.css("width", diameter);

        birdElement.append(self.getRandomBirdImage());

        return birdElement;
    };

    self.getRandomAnimationOptions = function (useRight, useBottom) {
        var randomX = randomGenerator.getRandomNumber(0, 3000);
        var randomY = randomGenerator.getRandomNumber(0, 3000);

        var options = {
            height: '+=100px',
            width: '+=100px'
        };

        if (useRight) {
            options.right = randomX * -1;
        } else {
            options.left = randomX * -1;
        }

        if (useBottom) {
            options.bottom = randomY * -1;
        } else {
            options.top = randomY * -1;
        }

        return options;
    };

    self.getRandomBirdImage = function () {
        var amountOfBirds = birds.length;

        var i = randomGenerator.getRandomNumber(0, amountOfBirds - 1);

        var birdSrc = birds[i];

        return '<img src="' + birdSrc + '" />';
    };
};