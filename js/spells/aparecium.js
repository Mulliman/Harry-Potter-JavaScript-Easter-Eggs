/// <reference path="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js" />

// Aparecium
// Show invisible ink

var Aparecium = function (textToAppear) {
    var self = this;

    self.text = textToAppear ? textToAppear : "Tom Marvolo Riddle";

    self.name = "aparecium";

    self.callback = function () {
        $("body").append(self.containerMarkup);

        var container = $(self.containerSelector);

        container.fadeOut(0);

        container.fadeIn(self.fadeInTime, function () {
            setTimeout(function () {
                container.fadeOut(self.fadeOutTime);
            }, self.fadeOutTime);
        });

        $("body").remove(self.containerSelector);
    }

    self.containerClass = "aparecium";
    self.containerSelector = "." + self.containerClass;

    self.containerMarkup = '<div class="' + self.containerClass + '">' + self.text + '</div>';

    self.fadeInTime = 2000;
    self.fadeOutTime = 2000;
    self.showTime = 10000;
};