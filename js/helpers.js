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

    self.flash = function (element, interval, time, callback) {
        var intervalId = setInterval(function () {
            element.fadeToggle(10);
        }, interval);

        setTimeout(function () {
            clearInterval(intervalId);
            callback();
        }, time);
    }
}

var RandomGenerator = function () {
    var self = this;

    self.getRandomNumber = function(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}