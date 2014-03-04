/// <reference path="../helpers.js" />

// Avada Kedavra
// Killing curse (possibly green)

var AvadaKedavra = function (colour) {
    var self = this;

    self.name = "avada kedavra";

    self.spellColour = colour ? colour : "Lime";
    self.redirectUrl = "/jsdkjbsdakjb";

    self.callback = function () {
        $("body").append(self.containerMarkup);

        var container = $(self.containerSelector);

        container.fadeOut(0);

        var animator = new Animator();
        animator.flash(container, self.flashSpeed, self.flashTime, function () {
            window.location.replace(self.redirectUrl);
        });
    }

    self.containerClass = "avada";
    self.containerSelector = "." + self.containerClass;

    self.containerMarkup = '<div style="position:absolute; width:100%; height:100%; top: 0; left: 0; background-color:' + self.spellColour + '" class="' + self.containerClass + '"></div>';

    self.flashSpeed = 50;
    self.flashTime = 1000;
};