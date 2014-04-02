var HarryPotter = function () {

    var self = this;

    self.spells = [];

    self.pressedKeys = [];

    self.addSpell = function (name, callback) {
        var spell = {
            name: name,
            code: getCodes(name),
            callback: callback
        };

        console.log(spell);

        self.spells.push(spell);
    };

    self.clearKeys = function () {
        self.pressedKeys = [];
    };

    self.startListening = function () {
        window.addEventListener("keyup", self.eventHandler);
    };

    self.stopListening = function () {
        window.removeEventListener('keyup', self.eventHandler);
    };

    self.eventHandler = function (e) {
        self.pressedKeys.push(e.keyCode);
        self.getCastSpell();
    };

    self.getCastSpell = function () {
        var codes = self.pressedKeys.toString();

        var amountOfRegisteredSpells = self.spells.length;

        for (var i = 0; i < amountOfRegisteredSpells; i++) {
            var spell = self.spells[i];

            if (codes.indexOf(spell.code) >= 0) {
                spell.callback();
                self.clearKeys();
            }
        }
    };

    var getCodes = function (name) {
        var codes = [];

        var upperName = name.toUpperCase();

        for (var i = 0; i < name.length; i++){
            codes[i] = upperName.charCodeAt(i);
        }
         
        return codes.toString();
    }

    // Stop the page moving when space is pressed
    window.onkeydown = function (e) {
        return !(e.keyCode == 32);
    };
};