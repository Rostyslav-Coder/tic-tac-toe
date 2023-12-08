// Tic Tac Toe Game

const content = document.querySelector('#container');
const weaponBoard = `
  <div class="weaponBx" id="weapon-1"></div>
  <div class="weaponBx" id="weapon-2"></div>
`;

const ENEMY = {
  name: 'Orc',
  weaponList: [],
  activeWeapon: '',
  logo: '<img src="images/orc.png"/>',
  color: '#736550',
  enemyData: [],
  firstMove: false,
};

const playingBoard = `
  <div class="board" id="board">
    <div class="hero" id="logo"></div>
    <div class="game">
      <div class="gameBx" id="1"></div>
      <div class="gameBx" id="2"></div>
      <div class="gameBx" id="3"></div>
      <div class="gameBx" id="4"></div>
      <div class="gameBx" id="5"></div>
      <div class="gameBx" id="6"></div>
      <div class="gameBx" id="7"></div>
      <div class="gameBx" id="8"></div>
      <div class="gameBx" id="9"></div>
    </div>  
    <div class="hero">${ENEMY.logo}</div>
  </div>
`;
const resetButton = '<button class="reset" onclick="location.reload();">Return</button>';
let activeHero;
const title = document.querySelector('#description');
// const data = [];
const emptyCells = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
const winList = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['1', '4', '7'],
  ['2', '5', '8'],
  ['3', '6', '9'],
  ['1', '5', '9'],
  ['3', '5', '7'],
];

let weaponBox1;
let weaponBox2;
let heroLogo;

const WIZARD = {
  card: document.querySelector('#wizard-card'),
  name: 'Wizard',
  weaponList: ['<img src="images/wizard-x.png"/>', '<img src="images/wizard-o.png"/>'],
  activeWeapon: '',
  info: 'A master of magic, wielding the forces of the elements',
  logo: '<img src="images/wizard-logo.png"/>',
  color: '#9252DF',
  data: [],
  active: false,
  firstMove: false,
};

const BARBARIAN = {
  card: document.querySelector('#barbarian-card'),
  name: 'Barbarian',
  weaponList: ['<img src="images/barbarian-x.png"/>', '<img src="images/barbarian-o.png"/>'],
  activeWeapon: '',
  info: 'A fearless strongman, wild and untamed',
  logo: '<img src="images/barbarian-logo.png"/>',
  color: '#E9A643',
  data: [],
  active: false,
  firstMove: false,
};

const ARCHER = {
  card: document.querySelector('#archer-card'),
  name: 'Archer',
  weaponList: ['<img src="images/archer-x.png"/>', '<img src="images/archer-o.png"/>'],
  activeWeapon: '',
  info: 'Quick and precise, she never misses a shot',
  logo: '<img src="images/archer-logo.png"/>',
  color: '#3078E4',
  data: [],
  active: false,
  firstMove: false,
};

const ASSASSIN = {
  card: document.querySelector('#assassin-card'),
  name: 'Assassin',
  weaponList: ['<img src="images/assassin-x.png"/>', '<img src="images/assassin-o.png"/>'],
  activeWeapon: '',
  info: 'A silent killer, disappearing into the shadows',
  logo: '<img src="images/assassin-logo.png"/>',
  color: '#6FFC50',
  data: [],
  active: false,
  firstMove: false,
};

const HERO_LIST = [
  WIZARD,
  BARBARIAN,
  ARCHER,
  ASSASSIN,
];

title.style.transition = 'opacity 1s';

let cells = [];

function checkForWin() {
  const { data } = activeHero;
  const { enemyData } = ENEMY;
  let isGameOver = false;

  for (let i = 0; i < winList.length; i += 1) {
    if (winList[i].every((num) => data.includes(num))) {
      alert(`${activeHero.name} Won!`);
      isGameOver = true;
      break;
    } else if (winList[i].every((num) => enemyData.includes(num))) {
      alert(`${ENEMY.name} Won!`);
      isGameOver = true;
      break;
    }
  }

  if (!isGameOver && emptyCells.length === 0) {
    alert('Game draw');
  }
}

function emptyCellsCounter(cell) {
  const index = emptyCells.indexOf(cell);
  if (index !== -1) {
    emptyCells.splice(index, 1);
  }
}

function enemyStep() {
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const cellId = emptyCells[randomIndex];
  emptyCellsCounter(cellId);

  const cellElement = document.getElementById(cellId);

  cellElement.innerHTML = activeHero.activeWeapon;
  const { color } = ENEMY;
  cellElement.style.transition = '1s';
  cellElement.style.background = color;
  cellElement.style.boxShadow = `0 0 24px 2px ${color}`;

  // Добавьте cellId в данные компьютера
  ENEMY.enemyData.push(cellId);
  checkForWin();
}

function updateContent() {
  cells = document.querySelectorAll('.gameBx');

  cells.forEach((cell) => {
    cell.addEventListener('click', () => {
      const partition = cell;
      if (!partition.innerHTML) {
        partition.innerHTML = activeHero.activeWeapon;
        const { color } = activeHero;
        partition.style.transition = '1s';
        partition.style.background = color;
        partition.style.boxShadow = `0 0 24px 2px ${color}`;
        emptyCellsCounter(partition.getAttribute('id'));
        activeHero.data.push(partition.getAttribute('id'));
        setTimeout(enemyStep, 2000);
        checkForWin();
      }
    });
  });
}

function handleWeaponBox() {
  content.innerHTML = playingBoard;
  heroLogo = document.querySelector('#logo');
  heroLogo.innerHTML = activeHero.logo;
  const { color } = activeHero;
  heroLogo.style.boxShadow = `0 0 24px 2px ${color}`;
  updateContent();
}

function processText(text) {
  let result = '';
  for (let i = 0; i < text.length; i += 1) {
    if (text[i] === ' ') {
      result += '<span>&nbsp;</span>';
    } else {
      result += `<span style="transition-delay:${i + 1}s">${text[i]}</span>`;
    }
  }
  return result;
}

HERO_LIST.forEach((hero) => {
  hero.card.addEventListener('mouseover', () => {
    title.innerHTML = processText(hero.info);
    // title.style.opacity = '1';
  });
  hero.card.addEventListener('mouseout', () => {
    title.innerHTML = processText('Choose your hero');
    // title.style.opacity = '1';
  });

  hero.card.addEventListener('click', () => {
    activeHero = hero;
    activeHero.active = true;
    content.innerHTML = weaponBoard;
    title.innerHTML = resetButton;
    weaponBox1 = document.querySelector('#weapon-1');
    weaponBox2 = document.querySelector('#weapon-2');
    const [weapon1, weapon2] = activeHero.weaponList;
    weaponBox1.innerHTML = weapon1;
    weaponBox2.innerHTML = weapon2;
    weaponBox1.style.boxShadow = `0 0 42px 2px ${activeHero.color}`;
    weaponBox2.style.boxShadow = `0 0 42px 2px ${activeHero.color}`;

    weaponBox1.addEventListener('click', () => {
      activeHero.activeWeapon = weapon1;
      activeHero.firstMove = true;
      handleWeaponBox();
    });

    weaponBox2.addEventListener('click', () => {
      activeHero.activeWeapon = weapon2;
      activeHero.firstMove = false;
      handleWeaponBox();
    });
  });
});
