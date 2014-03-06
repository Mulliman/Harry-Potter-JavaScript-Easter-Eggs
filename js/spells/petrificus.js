/// <reference path="../helpers.js" />
// Petrificus Totalus 
// Stops the user from moving.

var PetrificusTotalus = function () {
    var self = this;

    self.name = "petrificus totalus";

    self.callback = function () {
        var body = $("body");

        var elementFreezer = new ElementFreezer();

        elementFreezer.freezeElement(body, self.time);
    }

    self.time = 10000;
};