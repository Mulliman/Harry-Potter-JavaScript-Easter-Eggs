/// <reference path="helpers.js" />
/// <reference path="jQuery-1.9.0.js" />

var Wand = function (animator) {
    var self = this;

    // Properties
    // ===================================

    self.isShown = false;
    self.isShining = false;
    self.isPulsating = false;

    self.mouseLocationX = $(window).width() / 2;
    self.mouseLocationY = $(window).height() / 2;;

    self.rootElement = $("body");

    self.wandClass = "wand";
    self.wandSelector = "." + self.wandClass;
    self.wandElement;

    self.wandWidth = 10;
    self.wandLength = 130;

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

        var wandLocation = self.getWandLocationsForPoint(self.mouseLocationX, self.mouseLocationY);
        self.updateWandLocation(wandLocation);

        self.wandElement.fadeIn(500, function () {
            self.trackWandMovement(self.moveWand);
            self.isShown = true;

            self.rootElement.css("cursor", "pointer");

            if (callback instanceof Function) { callback(); }
        });
    }

    self.hideWand = function (callback) {
        if (self.wandElement === undefined) {
            if (callback instanceof Function) { callback(); }
            return;
        }

        self.dim(function () {
            self.destroyWandTipElement(function () {
                self.destroyWandElement(function () {
                    self.stopTrackingWandMovement();
                    self.isShown = false;
                    self.isShining = false;
                    self.isPulsating = false;

                    self.rootElement.css("cursor", "");

                    self.wandElement = null;
                    self.wandTipElement = null;

                    if (callback instanceof Function) { callback(); }
                });
            });
        });
    }

    self.moveWand = function (x, y) {
        self.mouseLocationX = x;
        self.mouseLocationY = y;

        var wandLocation = self.getWandLocationsForPoint(x, y);
        self.updateWandLocation(wandLocation);
    }

    self.updateWandLocation = function(wandLocation){
        if (self.wandElement instanceof jQuery) {
            self.wandElement.css("left", wandLocation.wandLeft + "px");
            self.wandElement.css("top", wandLocation.wandTop + "px");
        }

        self.updateWandTipLocation(wandLocation);
    }

    self.updateWandTipLocation = function (wandLocation) {
        if (self.wandTipElement instanceof jQuery) {
            self.wandTipElement.css("left", wandLocation.wandTipLeft + "px");
            self.wandTipElement.css("top", wandLocation.wandTipTop + "px");
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
        newWand.css("background-color", "#531");
        newWand.css("border-radius", "2px");
        newWand.css("width", self.wandWidth + "px");
        newWand.css("height", self.wandLength + "px");
        newWand.css("z-index", "1990");
        newWand.css("box-shadow", "inset #210 0 0 3px");

        newWand.css("height", "0");
        newWand.css("border-bottom", self.wandLength + "px solid #531");

        //var taper = self.wandWidth / 2;
        //newWand.css("border-left", taper + "px solid transparent");
        //newWand.css("border-right", taper + "px solid transparent");

        return newWand;
    }

    self.destroyWandElement = function (callback) {
        if (self.wandElement === undefined) {
            if (callback instanceof Function) { callback(); }
            return;
        }

        self.wandElement.fadeOut(500, function () {
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

        var wandLocation = self.getWandLocationsForPoint(self.mouseLocationX, self.mouseLocationY);
        self.updateWandLocation(wandLocation);

        wandTip.fadeOut(0);
        wandTip.fadeIn(self.wandTipFadeSpeed, function () {
            self.wandTipPulsateId = animator.pulsate(self.wandTipElement, overrideSpeed, self.wandTipPulsateDuration, self.wandTipPulsateMinOpactity, null);
            self.isPulsating = true;
        });
    }

    self.dim = function (callback) {
        if (!self.isPulsating && !self.isShining) {
            if (callback instanceof Function) { callback(); }
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

    self.changeWandTipColour = function (newColour, callback) {
        self.wandTipColour = newColour;

        if (!self.isPulsating && !self.isShining)
        {
            if (callback instanceof Function) { callback(); }
            return;
        }

        if (self.isPulsating) {
            self.dim(function () {
                self.pulsate();
                if (callback instanceof Function) { callback(); }
            });
        }

        if (self.isShining) {
            self.dim(function(){
                self.shine();
                if (callback instanceof Function) { callback(); }
            });
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

    // Size and Location Data
    // ----------------------

    self.getWandLocationsForPoint = function (x, y) {
        var data = {};

        data.wandCenter = x;
        data.wandLeft = data.wandCenter - self.wandWidth / 2;
        data.wandRight = data.wandCenter + self.wandWidth / 2;

        // We add a little gap above the wand so that the user can still select bits.
        data.wandBottom =  y - 1;
        data.wandTop = data.wandBottom - self.wandLength;

        var tipRadius = self.wandTipDiameter / 2;
        data.wandTipTop = data.wandTop - self.wandTipDiameter;
        data.wandTipLeft = data.wandCenter - tipRadius;

        return data;
    }
}