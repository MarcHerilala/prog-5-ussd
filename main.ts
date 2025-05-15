import {  createInterface} from "readline";
import { menuItems ,subMenus} from "./menu-list";

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

function handleInput(input: string) {
  input = input.trim();
  if (inSubMenu) {
    if (input === '*') {
      inSubMenu = false;
      selectedMenu = 0;
    }
  } else {
    if (input === '#') {
      currentPage = (currentPage + 1) % totalPages;
    } else if (input === '*') {
      currentPage = (currentPage - 1 + totalPages) % totalPages;
    } else {
      const choice = parseInt(input);
      if (!isNaN(choice) && subMenus[choice]) {
        inSubMenu = true;
        selectedMenu = choice;
      }
    }
  }
  showMenu();
}

showMenu();
