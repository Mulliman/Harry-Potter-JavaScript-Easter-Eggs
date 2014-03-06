/// <reference path="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js" />

var BrowserDetails = function () {
    var self = this;

    self.isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
    self.isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
    self.isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    // At least Safari 3+: "[object HTMLElementConstructor]"
    self.isChrome = !!window.chrome && !self.isOpera;              // Chrome 1+
    self.isIE = /*@cc_on!@*/false || !!document.documentMode;
}

var Animator = function () {
    var self = this;

    self.changeSize = function (element, zoom, speed) {
        var browserDetails = new BrowserDetails();

        if (browserDetails.isFirefox) {
            self.changeTextSize(element, zoom, speed)
        }
        else {
            self.zoom(element, zoom, speed);
        }
    }

    self.zoom = function (element, zoom, speed) {
        element.animate({
            zoom: zoom
        }, speed);
    }

    self.changeTextSize = function (element, zoom, speed) {
        element.animate({
            fontSize: zoom + "em"
        }, speed);
    }

    self.rotate = function (element, rotateTo, speed) {
        element.stop().animate(
          { rotation: rotateTo },
          {
              duration: speed,
              step: function (now, fx) {
                  $(this).css({ "transform": "rotate(" + now + "deg)" });
              }
          }
        );
    }

    self.pulsate = function (element, interval, time, minOpacity, callback) {
        var stepTime = interval / 2;

        var intervalId = setInterval(function () {
            element.fadeTo(stepTime, minOpacity, function () {
                element.fadeTo(stepTime, 1);
            });
        }, interval);

        setTimeout(function () {
            clearInterval(intervalId);
            if (callback instanceof Function) { callback(); }
        }, time);
    }

    self.flash = function (element, interval, time, callback) {
        var intervalId = setInterval(function () {
            element.fadeToggle(10);
        }, interval);

        setTimeout(function () {
            clearInterval(intervalId);
            if (callback instanceof Function) { callback(); }
        }, time);
    }
}

var RandomGenerator = function () {
    var self = this;

    self.getRandomNumber = function(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}

var ElementFreezer = function () {
    var self = this;

    self.containerClass = "freeze-pane";
    self.containerSelector = "." + self.containerClass;
    self.containerMarkup = '<div class="' + self.containerClass + '"><div style="height:10000px"></div></div>';

    self.freezeElement = function (element, freezeTime) {
        element.css("overflow", "hidden");

        var pane = $(self.containerMarkup);

        pane.css("position", "fixed");
        pane.css("width", "100%");
        pane.css("height", "100%");
        pane.css("top", "0");
        pane.css("left", "0");
        pane.css("overflow", "scroll");
        pane.css("opacity", "0");
        pane.css("z-index", "1000");

        element.append(pane);

        setTimeout(function () {
            $(self.containerSelector).remove();
            element.css("overflow", "");
        }, freezeTime);
    }
};

var ColourFlasher = function (animator) {
    var self = this;

    self.flashColour = function (parentElement, colour, flashSpeed, flashDuration, callback) {
        parentElement.append(self.containerMarkup);

        var container = $(self.containerSelector);
        container.fadeOut(0);

        container.css("background", colour);

        animator.flash(container, flashSpeed, flashDuration, function () {
            container.remove();
            callback();
        });
    }

    self.containerClass = "flash-aaahhh";
    self.containerSelector = "." + self.containerClass;
    self.containerMarkup = '<div style="position:fixed; width:100%; height:100%; top: 0; left: 0; z-index:1000;" class="' + self.containerClass + '"></div>';
}

var RandomColourFlasher = function (animator, randomGenerator) {
    var self = this;

    self.flashColours = function (parentElement, colours, flashSpeed, flashDuration, callback) {
        parentElement.append(self.containerMarkup);

        var container = $(self.containerSelector);

        var amountOfColours = colours.length;

        var intervalId = setInterval(function () {
            var i = randomGenerator.getRandomNumber(0, amountOfColours);
            var colour = colours[i];

            container.css("background", colour);
        }, flashSpeed);

        setTimeout(function () {
            clearInterval(intervalId);
            container.remove();

            if (callback !== null) {
                callback();
            }
        }, flashDuration);
    }

    self.containerClass = "random-flash";
    self.containerSelector = "." + self.containerClass;
    self.containerMarkup = '<div style="position:fixed; width:100%; height:100%; top: 0; left: 0; z-index:1000;" class="' + self.containerClass + '"></div>';
}