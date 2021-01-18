import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    // resolve the promise with the winner when fight is over
    firstFighter.curHealth = firstFighter.health;
    secondFighter.curHealth = secondFighter.health;
    let pressedSet = new Map();
    document.addEventListener('keydown', (event) => {
      pressedSet.set(event.code, true);
      fighting(firstFighter, secondFighter, pressedSet);
      if (firstFighter.curHealth <= 0 || secondFighter.curHealth <= 0) {
        const winner = firstFighter.curHealth <= 0 ? secondFighter : firstFighter;
        resolve(winner);
      };
    });
    document.addEventListener('keyup', (event) => {
      pressedSet.delete(event.code);
    });
  });
}

function fighting(firstFighter, secondFighter, pressedSet) {
  let leftLifeFighterIndikator = document.getElementById('left-fighter-indicator');
  let rightLifeFighterIndikator = document.getElementById('right-fighter-indicator');

  let damageCur = getDamage(firstFighter, secondFighter);
  if (pressedSet.has(controls.PlayerOneAttack) && damageCur && !pressedSet.has(controls.PlayerTwoBlock)) {
    secondFighter.curHealth -= damageCur;
    let proportion = secondFighter.curHealth * 100 / secondFighter.health;
    rightLifeFighterIndikator.style.width = proportion + '%';
    if (secondFighter.curHealth < 0) {
      rightLifeFighterIndikator.style.width = 0 + '%';
    }
  }

  if (pressedSet.has(controls.PlayerTwoAttack) && damageCur && !pressedSet.has(controls.PlayerOneBlock)) {
    firstFighter.curHealth -= damageCur;
    let proportion = firstFighter.curHealth * 100 / firstFighter.health;
    leftLifeFighterIndikator.style.width = proportion + '%';
    if (firstFighter.curHealth < 0) {
      leftLifeFighterIndikator.style.width = 0 + '%';
    }
  }
}

export function getDamage(attacker, defender) {
  // return damage
  return ((getHitPower(attacker) - getBlockPower(defender)) > 0 ? (getHitPower(attacker) - getBlockPower(defender)) : 0);
}

export function getHitPower(fighter) {
  // return hit power
  let criticalHitChance = getRandomIntInclusive(1,2);
  return fighter.attack * criticalHitChance;
}

export function getBlockPower(fighter) {
  // return block power
  let dodgeChance = getRandomIntInclusive(1,2);
  return fighter.defense * dodgeChance;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; 
}