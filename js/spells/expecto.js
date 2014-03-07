// Expecto Patronum 
// Makes a patronus / white light

var ExpectoPatronum  = function (flasher, wand, randomGenerator, imageSrcs) {
    var self = this;

    self.name = "expecto patronum";

    self.spellColour = "#eee";

    self.callback = function () {
        var body = $("body");

        body.append(self.containerMarkup);
        var container = $(self.containerSelector);

        var amountOfImages = imageSrcs.length;

        var i = randomGenerator.getRandomNumber(0, amountOfImages - 1);
        var imageUrl = imageSrcs[i];

        var imageElement = $(self.imageMarkup);
        imageElement.attr("src", imageUrl);

        console.log(imageElement);

        container.append(imageElement);

        container.fadeOut(0);

        wand.showWand(function () {
            wand.changeWandTipColour(self.spellColour);
            wand.shine();

            setTimeout(function () {
                wand.hideWand();

                flasher.fadeColour(body,
                    self.spellColour,
                    self.flashSpeed,
                    self.flashDuration,
                    function () {
                        container.fadeIn(1000, function () {
                            setTimeout(function () {
                                container.fadeOut(2000, function () {
                                    container.remove();
                                });
                            }, self.imageDuration);
                        });
                    });
            }, 1000);
        });
    }

    self.containerClass = "expecto";
    self.containerSelector = "." + self.containerClass;

    self.containerMarkup = '<div style="width:100%; height:100%; line-height:100%; position:fixed; top:0; left:0; text-align:center; z-index:1999;" class="' + self.containerClass + '"></div>';

    self.imageClass = "expecto-image";
    self.imageSelector = "." + self.imageClass;

    self.imageMarkup = '<img class="' + self.imageClass + '" style="opacity:0.75; display:block; margin:100px auto;" />';

    self.flashSpeed = 1000;
    self.flashDuration = 1500;
    self.imageDuration = 5000;
};