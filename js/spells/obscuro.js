// Obscuro
// Blinfold / go black.

var Obscuro = function () {
    var self = this;

    self.name = "obscuro";

    self.callback = function () {
        $("body").append(self.containerMarkup);

        var container = $(self.containerSelector);

        container.slideUp(0);

        container.slideDown(self.fadeInTime, function () {
            setTimeout(function () {
                container.slideUp(self.fadeOutTime, function () {
                    container.remove();
                });
            }, self.showTime);
        });
    }

    self.containerClass = "obscuro";
    self.containerSelector = "." + self.containerClass;

    self.containerMarkup = '<div style="width:100%; height:100%; background:#000; position:absolute; top:0; left:0; z-index:999;" class="' + self.containerClass + '"></div>';

    self.fadeInTime = 1000;
    self.fadeOutTime = 1000;
    self.showTime = 5000;
};