/// <reference path="../wand.js" />
// Nox
// Stops lumos

var Nox = function (wand) {
    var self = this;

    self.name = "nox";

    self.callback = function () {
        wand.dim();
    }
};