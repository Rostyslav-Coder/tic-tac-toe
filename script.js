// Tic Tac Toe Game

const content = document.querySelector('#container');
const weaponBoard = `
  <div class="weaponBx" id="weapon-1"></div>
  <div class="weaponBx" id="weapon-2"></div>
`;
const playingBoard = `
  <div class="board" id="board">
    <div class="hero" id="logo"></div>
    <div class="game">
      <div class="dropBox" pos="1"></div>
      <div class="dropBox" pos="2"></div>
      <div class="dropBox" pos="3"></div>
      <div class="dropBox" pos="4"></div>
      <div class="dropBox" pos="5"></div>
      <div class="dropBox" pos="6"></div>
      <div class="dropBox" pos="7"></div>
      <div class="dropBox" pos="8"></div>
      <div class="dropBox" pos="9"></div>
    </div>  
    <div class="hero"><img src="images/orc.png"/></div>
  </div>
`;
const resetButton = '<button class="reset" onclick="location.reload();">Return</button>';
const userWeapon = document.querySelector('#weapon-choise');
let weaponBox1;
let weaponBox2;
let heroLogo;
const title = document.querySelector('#description');
const data = [];
// eslint-disable-next-line no-unused-vars
const vinIndex = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

const WIZARD = {
  card: document.querySelector('#wizard-card'),
  name: 'Wizard',
  weaponList: ['<img src="images/wizard-x.png"/>', '<img src="images/wizard-o.png"/>'],
  activeWeapon: userWeapon,
  info: 'A master of magic, wielding the forces of the elements',
  logo: '<img src="images/wizard-logo.png"/>',
  color: '#8521FF',
  active: false,
  firstMove: false,
};

const BARBARIAN = {
  card: document.querySelector('#barbarian-card'),
  name: 'Barbarian',
  weaponList: ['<img src="images/barbarian-x.png"/>', '<img src="images/barbarian-o.png"/>'],
  activeWeapon: userWeapon,
  info: 'A fearless strongman, wild and untamed',
  logo: '<img src="images/barbarian-logo.png"/>',
  color: '#E9A643',
  active: false,
  firstMove: false,
};

const ARCHER = {
  card: document.querySelector('#archer-card'),
  name: 'Archer',
  weaponList: ['<img src="images/archer-x.png"/>', '<img src="images/archer-o.png"/>'],
  activeWeapon: userWeapon,
  info: 'Quick and precise, she never misses a shot',
  logo: '<img src="images/archer-logo.png"/>',
  color: '#AD4A9D',
  active: false,
  firstMove: false,
};

const ASSASSIN = {
  card: document.querySelector('#assassin-card'),
  name: 'Assassin',
  weaponList: ['<img src="images/assassin-x.png"/>', '<img src="images/assassin-o.png"/>'],
  activeWeapon: userWeapon,
  info: 'A silent killer, disappearing into the shadows',
  logo: '<img src="images/assassin-logo.png"/>',
  color: '#A4FF06',
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

const cells = document.querySelectorAll('.dropBox');

function handleWeaponBox(activeHero) {
  content.innerHTML = playingBoard;
  heroLogo = document.querySelector('#logo');
  heroLogo.innerHTML = activeHero.logo;
  const { color } = activeHero;
  heroLogo.style.boxShadow = `0 0 24px 2px ${color}`;
}

HERO_LIST.forEach((hero) => {
  hero.card.addEventListener('mouseover', () => {
    title.style.opacity = '0';
    setTimeout(() => {
      title.textContent = hero.info;
      title.style.opacity = '1';
    }, 500);
  });
  hero.card.addEventListener('mouseout', () => {
    title.style.opacity = '0';
    setTimeout(() => {
      title.textContent = 'Choose your hero';
      title.style.opacity = '1';
    }, 500);
  });

  hero.card.addEventListener('click', () => {
    const activeHero = hero;
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
      handleWeaponBox(activeHero);
    });

    weaponBox2.addEventListener('click', () => {
      activeHero.activeWeapon = weapon2;
      activeHero.firstMove = false;
      handleWeaponBox(activeHero);
    });
  });
});

cells.forEach((cell) => {
  cell.addEventListener('click', () => {
    if (!cell.innerHTML) {
      data.push(cell.getAttribute('pos'));
    } else { /* empty */ }
  });
});
