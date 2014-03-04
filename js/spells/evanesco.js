// Evanesco 
// Vanish

var Evanesco = function () {
    var self = this;

    self.name = "evanesco";

    self.callback = function () {
        var elements = $("body *");

        elements.css("overflow", "hidden");

        elements.animate({ height: 0 }, self.disappearSpeed);
    }

    self.disappearSpeed = 100;
};