"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline_1 = require("readline");
var menuItems = [
    '1. Transférer argent',
    '2. SOS Crédit',
    '3. Paiement marchand',
    '4. Recharger crédit',
    '5. Payer facture',
    '6. Historique',
    '7. Paramètres',
    '8. Aide'
];
var subMenus = {
    1: ['1. Vers MVola', '2. Vers banque', '3. Vers carte'],
    2: ['1. Demander SOS', '2. Envoyer SOS'],
    3: ['1. Scanner QR', '2. Saisir ID marchand'],
    4: ['1. Tel perso', '2. Tel autre'],
    5: ['1. Jirama', '2. Telma', '3. Canal+'],
    6: ['1. Derniers transferts', '2. Tout voir'],
    7: ['1. Modifier code', '2. Langue', '3. Notifications'],
    8: ['1. Contacter support', '2. FAQ']
};
var rl = (0, readline_1.createInterface)({
    input: process.stdin,
    output: process.stdout
});
var currentPage = 0;
var inSubMenu = false;
var selectedMenu = 0;
var pageSize = 4;
var totalPages = Math.ceil(menuItems.length / pageSize);
function showMenu() {
    console.clear();
    if (inSubMenu && selectedMenu) {
        console.log("Menu ".concat(selectedMenu, ":\n"));
        subMenus[selectedMenu].forEach(function (line) { return console.log(line); });
        console.log('\n*:Retour');
    }
    else {
        var start = currentPage * pageSize;
        var end = start + pageSize;
        menuItems.slice(start, end).forEach(function (line) { return console.log(line); });
        console.log('\n*:Précédent   #:Suivant');
    }
    rl.question('\nVotre choix: ', handleInput);
}
function handleInput(input) {
    input = input.trim();
    if (inSubMenu) {
        if (input === '*') {
            inSubMenu = false;
            selectedMenu = 0;
        }
    }
    else {
        if (input === '#') {
            currentPage = (currentPage + 1) % totalPages;
        }
        else if (input === '*') {
            currentPage = (currentPage - 1 + totalPages) % totalPages;
        }
        else {
            var choice = parseInt(input);
            if (!isNaN(choice) && subMenus[choice]) {
                inSubMenu = true;
                selectedMenu = choice;
            }
        }
    }
    showMenu();
}
showMenu();
