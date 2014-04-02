// Marauders Map
// Shows where everyone is.

var MaraudersMap = function (wand, randomGenerator, insults, names) {

    var self = this;

    self.name = "map";
    self.upToNoGoodName = "no good";
    self.mischiefManagedName = "mischief managed";

    self.mapClass = "marauders-map";
    self.mapInnerClass = "inner";
    self.insultClass = "insult";
    self.dotClass = "dot";

    self.map = {};
    self.mapInner = {};

    self.scrollEndWidths = 100;

    self.fadeSpeed = 500;
    self.unravelSpeed = 500;
    self.startInsultingDelay = 2000;
    self.insultTime = 5000;
    self.insultDelay = 5000;
    self.moveLength = 10000;

    self.mapIsVisible = false;
    self.isInsulting = false;
    self.isUpToNoGood = false;

    self.insultInterval = null;
    self.insultTimeout = null;

    self.dots = [];

    //
    // Map
    //
    // Shows the map
    //
    self.callback = function () {
        var body = $("body");

        $('.' + self.mapClass).remove();
        $('.' + self.mapInnerClass).remove();

        wand.showWand(function () {
            self.map = $('<div class="' + self.mapClass + '"></div>');
            self.mapInner = $('<div class="' + self.mapInnerClass + '"></div>');

            self.map.append(self.mapInner);
            body.append(self.map);

            self.map.fadeOut(0);
            self.map.fadeIn(self.fadeSpeed, function () {

                var mapWidth = self.map.width();

                var widthToScrollTo = mapWidth - self.scrollEndWidths * 2;

                self.mapInner.animate({ width: widthToScrollTo }, self.unravelSpeed, "", function () {
                    self.mapIsVisible = true;

                    self.insultTimeout = setTimeout(function () {
                        self.throwInsults(self.mapInner);
                    }, self.startInsultingDelay);
                });
            });

            self.map.click(function () {
                self.mischiefManaged();
            });
        });
    }

    //
    // Up to no good
    //
    // Shows all the dots 
    //
    self.upToNoGood = function () {

        if (self.isUpToNoGood) {
            return;
        }

        self.stopThrowingInsults();

        var container = $('.' + self.mapInnerClass);

        var amountOfNames = names.length;
        var addDotDelay = self.moveLength / amountOfNames;

        // This is basically a for loop, with delays.
        var i = 0;
        var interval = setInterval(function () {
            var currentName = names[i];

            var dot = new Dot(currentName, self.dotClass, self.moveLength, randomGenerator);

            container.append(dot.element);
            dot.element.fadeOut(0);
            dot.startAnimation();

            self.dots.push(dot);

            i++;
            if (i >= amountOfNames) clearInterval(interval);
        }, addDotDelay);

        self.isInsulting = false;
        self.isUpToNoGood = true;
    };

    //
    // Mischief Managed
    //
    // Hides the map. 
    //
    self.mischiefManaged = function () {
        var amountOfDots = self.dots.length;

        for (var i = 0; i < amountOfDots; i++) {
            var currentDot = self.dots[i];

            currentDot.stopAnimation();
            currentDot.element.fadeOut(250, function () { currentDot.element.remove() });
        }

        self.mapInner.animate({ width: 0 }, self.unravelSpeed, "", function () {
            self.map.fadeOut(self.fadeSpeed, function () {
                self.map.remove();

                self.mapIsVisible = false;
                self.isInsulting = false;
                self.isUpToNoGood = false;
            });
        });

        wand.hideWand();
    };

    //
    // Throw insults
    //
    // Throws insults at the user if they don't know what they are doing
    //
    self.throwInsults = function (mapInner) {

        if (!mapInner.children("." + self.insultClass).length) {
            var insultWrapper = $('<div class="' + self.insultClass + '"></div>');
            mapInner.append(insultWrapper);
        }

        var insultElement = mapInner.children("." + self.insultClass);
        insultElement.fadeOut(0);

        var amountOfInsults = insults.length;

        self.insultInterval = setInterval(function () {

            var randomI = randomGenerator.getRandomNumber(0, amountOfInsults - 1);
            var randomInsult = insults[randomI];

            insultElement.text(randomInsult);

            insultElement.fadeIn(self.fadeSpeed, function () {
                setTimeout(function () {
                    insultElement.fadeOut(self.fadeSpeed);
                }, self.insultTime);
            });
        }, self.insultDelay + self.insultTime);

        self.isInsulting = true;
    };

    self.stopThrowingInsults = function () {

        var insultElement = $("." + self.insultClass);

        insultElement.fadeOut(self.fadeSpeed, function () { insultElement.remove() });

        clearInterval(self.insultInterval);
        clearTimeout(self.insultTimeout);

        self.isInsulting = false;
    };
};

//
// Dot
//
// This is a dot that can buzz around the screen.
//
var Dot = function (name, dotClassName, moveInterval, randomGenerator) {
    var self = this;

    self.intervalId = "";
    self.intervalDelay = moveInterval;
    self.dotClass = dotClassName;
    self.id = self.dotClass + "-" + randomGenerator.getRandomNumber(0, 100000);
    self.element = $('<div id="' + self.id + '" class="' + self.dotClass + '">' + name + '</div>');

    self.minTop = 5;
    self.maxTop = 90;
    self.minLeft = 5;
    self.maxLeft = 85;

    self.startAnimation = function () {
        var startY = randomGenerator.getRandomNumber(self.minTop, self.maxTop);
        var startX = randomGenerator.getRandomNumber(self.minLeft, self.maxLeft);

        self.element.animate({
            top: startY + "%",
            left: startX + "%"
        }, 0);

        self.element.fadeIn(1500);

        var randomY = randomGenerator.getRandomNumber(self.minTop, self.maxTop);
        var randomX = randomGenerator.getRandomNumber(self.minLeft, self.maxLeft);

        self.element.animate({
            top: randomY + "%",
            left: randomX + "%"
        }, self.intervalDelay);

        self.intervalId = setInterval(function () {

            randomY = randomGenerator.getRandomNumber(self.minTop, self.maxTop);
            randomX = randomGenerator.getRandomNumber(self.minLeft, self.maxLeft);

            self.element.animate({
                top: randomY + "%",
                left: randomX + "%"
            }, self.intervalDelay);

        }, self.intervalDelay);
    };

    self.stopAnimation = function () {
        clearInterval(self.intervalId);
        self.intervalId = "";
    };
};