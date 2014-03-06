/// <reference path="helpers.js" />
/// <reference path="jQuery-1.9.0.js" />

var Wand = function (animator) {
    var self = this;

    // Properties
    // ===================================

    self.isShown = false;
    self.isShining = false;
    self.isPulsating = false;

    self.wandTipX = $(window).width() / 2;
    self.wandTipY = $(window).height() / 2;;

    self.rootElement = $("body");

    self.wandClass = "wand";
    self.wandSelector = "." + self.wandClass;
    self.wandElement;

    self.wandTipClass = "wand-tip";
    self.wandTipSelector = "." + self.wandTipClass;
    self.wandTipElement;

    self.wandTipColour = "#FFF";
    self.wandTipFadeSpeed = 250;
    self.wandTipPulsateSpeed = 1000;
    self.wandTipPulsateDuration = 50000;
    self.wandTipPulsateMinOpactity = 0.75;
    self.wandTipPulsateId;

    self.wandTipDiameter = 30;
    self.wandTipGlowDiameter = 130;

    // Functions
    // ===================================

    // Wand
    // -------

    self.showWand = function (callback) {

        if (self.wandElement) {
            callback();
            return;
        }

        var wand = self.createWandElement();
        self.rootElement.append(wand);
        self.wandElement = $(self.wandSelector);

        self.wandElement.fadeOut(0);
        self.wandElement.fadeIn(500, function () {
            self.trackWandMovement(self.moveWand);
            self.isShown = true;
            callback();
        });
    }

    self.hideWand = function () {
        if (self.wandElement === undefined) {
            return;
        }

        self.dim(function () {
            self.destroyWandTipElement(function () {
                self.destroyWandElement(function () {
                    self.stopTrackingWandMovement();
                    self.isShown = false;
                    self.isShining = false;
                    self.isPulsating = false;

                    self.wandElement = null;
                    self.wandTipElement = null;
                });
            });
        });
    }

    self.moveWand = function (x, y) {
        self.wandTipX = x;
        self.wandTipY = y;

        var wandLeft = x - (10 / 2);
        var wandTop = y + (self.wandTipDiameter / 2);

        var wandTipLeft = x - (self.wandTipDiameter / 2);
        var wandTipTop = y - (self.wandTipDiameter / 2);

        if (self.wandElement instanceof jQuery) {
            self.wandElement.css("left", wandLeft + "px");
            self.wandElement.css("top", wandTop + "px");
        }

        if (self.wandTipElement instanceof jQuery) {
            self.wandTipElement.css("left", wandTipLeft + "px");
            self.wandTipElement.css("top", wandTipTop + "px");
        }
    }

    self.trackWandMovement = function (callback) {
        self.rootElement.off("mousemove");
        self.rootElement.mousemove(function (event) {
            var x = event.pageX;
            var y = event.pageY;

            if (callback instanceof Function) { callback(x, y); }
        });
    }

    self.stopTrackingWandMovement = function (callback) {
        self.rootElement.off("mousemove");
    }

    self.createWandElement = function(){
        var newWand = $('<div class="' + self.wandClass + '"></div>');

        newWand.css("position", "absolute");
        //newWand.css("background-color", "#531");
        newWand.css("border-radius", "2px");
        newWand.css("width", "10px");
        //newWand.css("height", "200px");
        newWand.css("z-index", "1990");
        newWand.css("box-shadow", "inset #210 0 0 3px");

        newWand.css("height", "0");
        newWand.css("border-bottom", "150px solid #531");
        newWand.css("border-left", "2px solid transparent");
        newWand.css("border-right", "5px solid transparent");

        if (self.wandTipX !== 0) {
            var wandLeft = self.wandTipX - (10 / 2);
            newWand.css("left", wandLeft + "px");
        }

        if (self.wandTipY !== 0) {
            var wandTop = self.wandTipY + (self.wandTipDiameter / 2);
            newWand.css("top", wandTop + "px");
        }

        return newWand;
    }

    self.destroyWandElement = function (callback) {
        if (self.wandElement === undefined) {
            return;
        }

        self.wandElement.fadeOut(1000, function () {
            self.wandElement.remove();
            if (callback instanceof Function) { callback(); }
        });
    }

    // Wand Light
    // -------------

    self.shine = function () {
        if (self.isShining) {
            return;
        }

        if (self.wandTipElement) {
            return;
        }

        // And create a new one.
        var wandTip = self.createWandTipElement(self.wandTipColour, self.wandTipDiameter, self.wandTipGlowDiameter)
        self.rootElement.append(wandTip);
        self.wandTipElement = $(self.wandTipSelector);

        wandTip.fadeOut(0);
        wandTip.fadeIn(self.wandTipFadeSpeed, function () {
            self.isShining = true;
        });
    }

    self.pulsate = function (overrideSpeed) {
        if (self.isPulsating) {
            return;
        }

        if (self.wandTipElement) {
            return;
        }

        overrideSpeed = overrideSpeed || self.wandTipPulsateSpeed;

        // Get rid of an old tip
        self.destroyWandTipElement();

        // And create a new one.
        var wandTip = self.createWandTipElement(self.wandTipColour, self.wandTipDiameter, self.wandTipGlowDiameter)
        self.rootElement.append(wandTip);
        self.wandTipElement = $(self.wandTipSelector);

        wandTip.fadeOut(0);
        wandTip.fadeIn(self.wandTipFadeSpeed, function () {
            self.wandTipPulsateId = animator.pulsate(self.wandTipElement, overrideSpeed, self.wandTipPulsateDuration, self.wandTipPulsateMinOpactity, null);
            self.isPulsating = true;
        });
    }

    self.dim = function (callback) {
        if (!self.isPulsating && !self.isShining) {
            return;
        }

        if (self.wandTipPulsateId !== null) {
            clearTimeout(self.wandTipPulsateId);
            self.wandTipPulsateId = null;
        }

        self.destroyWandTipElement(function () {

            self.isShining = false;
            self.isPulsating = false;
            self.wandTipElement = null;

            if (callback instanceof Function) { callback(); }
        });
    }

    self.changeWandTipColour = function (newColour) {
        self.wandTipColour = newColour;

        if (self.isPulsating) {
            self.dim(self.pulsate);
        }

        if (self.isShining) {
            self.dim(self.shine);
        }
    }

    self.createWandTipElement = function (colour, lightDiameter, glowDiameter) {
        var newWandTip = $('<div class="' + self.wandTipClass + '"></div>');

        newWandTip.css("position", "absolute");
        newWandTip.css("background-color", colour);
        newWandTip.css("border-radius", "1000px");
        newWandTip.css("width", lightDiameter);
        newWandTip.css("height", lightDiameter);
        newWandTip.css("z-index", "1991");

        if (self.wandTipX !== 0) {
            var wandLeft = self.wandTipX - (self.wandTipDiameter / 2);
            newWandTip.css("left", wandLeft + "px");
        }

        if (self.wandTipY !== 0) {
            var wandTop = self.wandTipY - (self.wandTipDiameter / 2);
            newWandTip.css("top", wandTop + "px");
        }

        var shadowWidths = [];

        // Lets Fibonacci this!
        for (var i = 0, j = 1, k = 0; i < glowDiameter; i = j, j = x, k++) {
            x = i + j;
            shadowWidths.push(x);
        }

        var amountOfShadowWidths = shadowWidths.length;
        var shadowString = "";

        for (var l = 0; l < amountOfShadowWidths; l++) {
            if (l > 0) {
                shadowString += ",";
            }

            var width = shadowWidths[l];

            shadowString += "0 0 " + width + "px " + colour;
        }

        newWandTip.css("box-shadow", shadowString);

        return newWandTip;
    }

    self.destroyWandTipElement = function (callback) {
        if (typeof self.wandTipElement === 'undefined' || !self.wandTipElement) {
            if (callback instanceof Function) { callback(); }
            return;
        }

        self.wandTipElement.fadeOut(1000, function () {
            self.wandTipElement.remove();
            if (callback instanceof Function) { callback(); }
        });
    }
}