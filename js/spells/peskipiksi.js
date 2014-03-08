// Peskipiksi Pesternomi
// This spell doesn't do anything

var PeskipiksiPesternomi = function (wand) {
    var self = this;

    self.name = "peskipiksi pesternomi";

    self.callback = function () {
        wand.showWand(function () {
            setTimeout(function () {
                wand.hideWand();
            }, 5000);
        });
    }
};