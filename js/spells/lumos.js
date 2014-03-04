// Lumos
// Light

var Lumos = function () {
    var self = this;

    self.name = "lumos";

    self.callback = function () {
        $("body").append(self.containerMarkup);

        var container = $(self.containerSelector);

        container.fadeOut(0);

        container.fadeIn(self.speed);
    }

    self.containerClass = "lumos";
    self.containerSelector = "." + self.containerClass;

    self.containerMarkup = '<div style="position:absolute; width:100%; height:100%; top: 0; left:0; box-shadow: inset 0 0 500px white" class="' + self.containerClass + '"></div>';

    self.speed = 1000;
};