/// <reference path="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js" />

// Aparecium
// Show invisible ink

var Aparecium = function (wand, textToAppear) {
    var self = this;

    self.text = textToAppear || "Tom Marvolo Riddle";

    self.name = "aparecium";

    self.callback = function () {
        $("body").append(self.containerMarkup);

        var container = $(self.containerSelector);
        container.fadeOut(0);

        wand.showWand(function () {

            wand.changeWandTipColour("#715", function () {
                wand.pulsate();

                container.fadeIn(self.fadeInTime, function () {
                    setTimeout(function () {
                        container.fadeOut(self.fadeOutTime, function(){
                            $(self.containerSelector).remove();
                            wand.hideWand();
                        });
                    }, self.showTime);
                });

            });
        });
    }

    self.containerClass = "aparecium";
    self.containerSelector = "." + self.containerClass;

    self.containerMarkup = '<div class="' + self.containerClass + '">' + self.text + '</div>';

    self.fadeInTime = 2000;
    self.fadeOutTime = 2000;
    self.showTime = 10000;
};