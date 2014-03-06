// Obscuro
// Blinfold / go black.

var Obscuro = function (animator, wand, flasher) {
    var self = this;

    self.name = "obscuro";

    self.callback = function () {
        var body = $("body");

        body.append(self.containerMarkup);

        var container = $(self.containerSelector);

        wand.showWand(function () {
            setTimeout(function () {
                flasher.flashColour(container, self.spellColour, self.flashSpeed, self.flashTime, function () {
                    container.slideUp(0);

                    container.css("background", self.spellColour);

                    container.slideDown(self.fadeInTime, function () {
                        setTimeout(function () {
                            container.slideUp(self.fadeOutTime, function () {
                                container.remove();
                            });
                        }, self.showTime);
                    });
                });
            }, 1000);
        });        
    }

    self.containerClass = "obscuro";
    self.containerSelector = "." + self.containerClass;

    self.containerMarkup = '<div style="width:100%; height:100%; position:absolute; top:0; left:0; z-index:999;" class="' + self.containerClass + '"></div>';

    self.spellColour = "#000";
    self.flashSpeed = 100;
    self.flashTime = 1000;

    self.fadeInTime = 1000;
    self.fadeOutTime = 1000;
    self.showTime = 5000;
};