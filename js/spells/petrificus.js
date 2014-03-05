// Petrificus Totalus 
// Stops the user from moving.

var PetrificusTotalus = function () {
    var self = this;

    self.name = "petrificus totalus";

    self.callback = function () {
        $("body").css("overflow", "hidden");

        var pane = $(self.containerMarkup);

        pane.css("position", "fixed");
        pane.css("width", "100%");
        pane.css("height", "100%");
        pane.css("top", "0");
        pane.css("left", "0");
        pane.css("overflow", "scroll");
        pane.css("opacity", "0");
        pane.css("z-index", "1000");

        $("body").append(pane);

        setTimeout(function () {
            $(self.containerSelector).remove();
            $("body").css("overflow", "auto");
        }, self.time);
    }

    self.containerClass = "petriPane";
    self.containerSelector = "." + self.containerClass;

    self.containerMarkup = '<div class="' + self.containerClass + '"><div style="height:10000px"></div></div>';

    self.time = 10000;
};