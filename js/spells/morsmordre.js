// Morsmordre
// Dark mark

var Morsmordre = function (colours, randomColourFlasher, wand, imageSrc) {
    var self = this;

    self.name = "morsmordre";

    self.spellColours = colours;

    self.callback = function () {
        var body = $("body");

        body.append(self.containerMarkup);
        var container = $(self.containerSelector);
        container.append(self.imageMarkup);

        container.fadeOut(0);

        wand.showWand(function () {
            wand.changeWandTipColour("#5DBA24");
            wand.pulsate(50);

            setTimeout(function () {
                randomColourFlasher.flashColours(body, self.spellColours, self.changeColourDelay, self.changeColourDuration);

                wand.hideWand();

                container.fadeIn(1000, function () {
                    setTimeout(function () {
                        container.fadeOut(1000);
                    }, self.changeColourDuration - 2000);
                });
            }, 1000);
        });
    }

    self.containerClass = "morsmordre";
    self.containerSelector = "." + self.containerClass;

    self.containerMarkup = '<div style="width:100%; height:100%; line-height:100%; position:absolute; top:0; left:0; text-align:center; z-index:1999;" class="' + self.containerClass + '"></div>';

    self.imageClass = "morsmordre-image";
    self.imageSelector = "." + self.imageClass;
    self.imageMarkup = '<img src="' + imageSrc + '" class="' + self.imageClass + '" style="opacity:0.75; display:block; margin:100px auto;" />';

    self.changeColourDelay = 100;
    self.changeColourDuration = 10000;
};