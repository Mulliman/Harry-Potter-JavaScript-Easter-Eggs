/// <reference path="../jQuery-1.9.0.js" />
// Wingardium Leviosa
// Floater

var WingardiumLeviosa = function (wand) {
    var self = this;

    self.name = "wingardium leviosa";

    self.callback = function () {
        var ancestorSelector = ".pod";

        wand.showWand(function () {

            var elementToMove;

            $(window).click(function (e) {
                var x = e.clientX;
                var y = e.clientY;
                var elementMouseIsOver = document.elementFromPoint(x, y);

                elementToMove = $(elementMouseIsOver).closest(ancestorSelector);
                var clonedElement = elementToMove.clone().appendTo("body");

                var elementWidth = elementToMove.width();
                var elementHeight = elementToMove.height();
                var elementLeft = elementToMove.position().left;
                var elementTop = elementToMove.position().top;

                elementToMove.css("opacity", "0");

                clonedElement.css("position", "absolute");
                clonedElement.css("width", (elementWidth) + "px");
                clonedElement.css("height", (elementHeight) + "px");
                clonedElement.css("left", elementLeft + "px");
                clonedElement.css("top", elementTop + "px");

                clonedElement.animate({
                    top: "-1000px"
                }, 5000, function () {
                    clonedElement.remove();
                });
            });

            setTimeout(function () {
                wand.hideWand();
                $(window).off("click");

                var elements = $(ancestorSelector);
                elements.fadeTo(1000, 1);

            }, 20000);
        });

        var clearElementStyles = function (elements) {
            if (elements !== null) {
                elements.css("width", "");
                elements.css("left", "");
                elements.css("top", "");
                elements.css("position", "");
            }
        }
    }
};