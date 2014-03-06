/// <reference path="potter.js" />
/// <reference path="spells/avis.js" />
var potter = new HarryPotter();

var avis = new Avis();
potter.addSpell(avis.name, avis.callback);

var aparecium = new Aparecium("avada kedavra, crucio, engorgio, reducio, evanesco, lumos, nox, flipendo, furnuculus, rictusempra, obscuro, orchideous, petrificus totalus");
potter.addSpell(aparecium.name, aparecium.callback);

var avada = new AvadaKedavra();
potter.addSpell(avada.name, avada.callback);

var crucio = new Crucio(["#5DBA24", "Black", "Green", "Black", "#5DBA24", "#00DD00", "#5DBA24", "Black", "#119905", "Black", "#400", "#100"]);
potter.addSpell(crucio.name, crucio.callback);

var engorgio = new Engorgio();
potter.addSpell(engorgio.name, engorgio.callback);

var reducio = new Reducio();
potter.addSpell(reducio.name, reducio.callback);

var evanesco = new Evanesco();
potter.addSpell(evanesco.name, evanesco.callback);

var lumos = new Lumos();
potter.addSpell(lumos.name, lumos.callback);

var nox = new Nox();
potter.addSpell(nox.name, nox.callback);

var flipendo = new Flipendo();
potter.addSpell(flipendo.name, flipendo.callback);

var furnuculus = new Furnunculus();
potter.addSpell(furnuculus.name, furnuculus.callback);

var rictusempra = new Rictusempra();
potter.addSpell(rictusempra.name, rictusempra.callback);

var obscuro = new Obscuro();
potter.addSpell(obscuro.name, obscuro.callback);

var orchideous = new Orchideous();
potter.addSpell(orchideous.name, orchideous.callback);

var petrificusTotalus = new PetrificusTotalus();
potter.addSpell(petrificusTotalus.name, petrificusTotalus.callback);

var stupefy = new Stupefy();
potter.addSpell(stupefy.name, stupefy.callback);

potter.startListening();

var amountOfSpells = potter.spells.length;

for (var i = 0; i < amountOfSpells; i++) {

    var spell = potter.spells[i];

    var element = $("<div style='height:75px;'></div>");
    element.html(spell.code);

    $("body").append(element);
}

