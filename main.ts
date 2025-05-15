import {  createInterface } from "readline";
const menuItems = [
  '1. Transférer argent',
  '2. SOS Crédit',
  '3. Paiement marchand',
  '4. Recharger crédit',
  '5. Payer facture',
  '6. Historique',
  '7. Paramètres',
  '8. Aide'
];

const subMenus: Record<number, string[]> = {
  1: ['1. Vers MVola', '2. Vers banque', '3. Vers carte'],
  2: ['1. Demander SOS', '2. Envoyer SOS'],
  3: ['1. Scanner QR', '2. Saisir ID marchand'],
  4: ['1. Tel perso', '2. Tel autre'],
  5: ['1. Jirama', '2. Telma', '3. Canal+'],
  6: ['1. Derniers transferts', '2. Tout voir'],
  7: ['1. Modifier code', '2. Langue', '3. Notifications'],
  8: ['1. Contacter support', '2. FAQ']
};

const rl =createInterface({
  input: process.stdin,
  output: process.stdout
});

let currentPage = 0;
let inSubMenu = false;
let selectedMenu = 0;
const pageSize = 4;
const totalPages = Math.ceil(menuItems.length / pageSize);

function showMenu() {
  console.clear();
  if (inSubMenu && selectedMenu) {
    console.log(`Menu ${selectedMenu}:\n`);
    subMenus[selectedMenu].forEach(line => console.log(line));
    console.log('\n*:Retour');
  } else {
    const start = currentPage * pageSize;
    const end = start + pageSize;
    menuItems.slice(start, end).forEach(line => console.log(line));
    console.log('\n*:Précédent   #:Suivant');
  }
  rl.question('\nVotre choix: ', handleInput);
}


showMenu();
