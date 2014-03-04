// Nox
// Stops lumos

var Nox = function () {
    var self = this;

    self.name = "nox";

    self.callback = function () {
        var container = $(self.containerSelector);

        container.fadeOut(self.speed, function(){
            $(self.containerSelector).remove();
        });
    }

    self.containerClass = "lumos";
    self.containerSelector = "." + self.containerClass;

    self.speed = 1000;
};