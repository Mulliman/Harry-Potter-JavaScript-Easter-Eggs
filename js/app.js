/// <reference path="potter.js" />
/// <reference path="spells/avis.js" />

var animator = new Animator();
var flasher = new ColourFlasher(animator);
var randomGenerator = new RandomGenerator();
var flasher = new ColourFlasher(animator);
var randomColourFlasher = new RandomColourFlasher(animator, randomGenerator);

var wand = new Wand(animator);

var potter = new HarryPotter(wand);

var birds = ["img/blue-bird.png", "img/red-bird.png", "img/yellow-bird.png"];
var avis = new Avis(wand, randomGenerator, birds);
potter.addSpell(avis.name, avis.callback);

var words = "avada kedavra, crucio, engorgio, reducio, evanesco, lumos, nox, flipendo, furnuculus, rictusempra, obscuro, orchideous, petrificus totalus";
var aparecium = new Aparecium(wand, words);
potter.addSpell(aparecium.name, aparecium.callback);

var wingardium = new WingardiumLeviosa(wand);
potter.addSpell(wingardium.name, wingardium.callback);

var avada = new AvadaKedavra(wand, flasher);
potter.addSpell(avada.name, avada.callback);

var crucioColours = ["#5DBA24", "Black", "Green", "Black", "#5DBA24", "#00DD00", "#5DBA24", "Black", "#119905", "Black", "#400", "#100"];
var crucio = new Crucio(crucioColours, animator, randomColourFlasher, wand);
potter.addSpell(crucio.name, crucio.callback);

var mosColours = ["Black", "#111", "#151515", "#050505", "090909"];
var morsmordre = new Morsmordre(mosColours, randomColourFlasher, wand, "img/dark-mark-green.png");
potter.addSpell(morsmordre.name, morsmordre.callback);

var expecto = new ExpectoPatronum(flasher, wand, randomGenerator, ["img/deer.png", "img/fox.png", "img/owl.png"]);
potter.addSpell(expecto.name, expecto.callback);

var engorgio = new Engorgio(wand, animator);
potter.addSpell(engorgio.name, engorgio.callback);

var reducio = new Reducio(wand, animator);
potter.addSpell(reducio.name, reducio.callback);

var evanesco = new Evanesco(wand, flasher);
potter.addSpell(evanesco.name, evanesco.callback);

var lumos = new Lumos(wand);
potter.addSpell(lumos.name, lumos.callback);

var nox = new Nox(wand);
potter.addSpell(nox.name, nox.callback);

var flipendo = new Flipendo(wand, animator);
potter.addSpell(flipendo.name, flipendo.callback);

var furnuculus = new Furnunculus(wand, randomGenerator);
potter.addSpell(furnuculus.name, furnuculus.callback);

var rictusempra = new Rictusempra(wand, animator);
potter.addSpell(rictusempra.name, rictusempra.callback);

var obscuro = new Obscuro(animator, wand, flasher);
potter.addSpell(obscuro.name, obscuro.callback);

var orchideous = new Orchideous(wand, randomGenerator);
potter.addSpell(orchideous.name, orchideous.callback);

var petrificusTotalus = new PetrificusTotalus(wand, flasher);
potter.addSpell(petrificusTotalus.name, petrificusTotalus.callback);

var stupefy = new Stupefy(animator, wand, flasher);
potter.addSpell(stupefy.name, stupefy.callback);

var finite = new FiniteIncantatem(wand);
potter.addSpell(finite.name, finite.callback);

var peskipiksiPesternomi = new PeskipiksiPesternomi(wand);
potter.addSpell(peskipiksiPesternomi.name, peskipiksiPesternomi.callback);


// Objects

var insults = ["You smell!", "If you were a language, you'd be PHP.", "You're so slow, they call you Python.", "Your memory is so leaky, C++ beats you at quizzes"];
//var names = ["Sam", "Harry", "Ron", "Hermione", "Fred", "George"];
var spellNames = getSpellNames(potter);

var maraudersMap = new MaraudersMap(wand, randomGenerator, insults, spellNames);
potter.addSpell(maraudersMap.name, maraudersMap.callback);
potter.addSpell(maraudersMap.upToNoGoodName, maraudersMap.upToNoGood);
potter.addSpell(maraudersMap.mischiefManagedName, maraudersMap.mischiefManaged);

potter.startListening();

var amountOfSpells = potter.spells.length;

for (var i = 0; i < amountOfSpells; i++) {

    var spell = potter.spells[i];

    var element = $("<div style='height:75px;'></div>");
    element.html(spell.code);

    $("body").append(element);
}

function getSpellNames(potterInstance) {
    var amountOfSpells = potterInstance.spells.length;

    var spellNames = [];

    for (var i = 0; i < amountOfSpells; i++) {

        var spell = potterInstance.spells[i];
        
        spellNames.push(spell.name);
    }

    return spellNames;
}

