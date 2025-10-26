import { random, showMessage } from './utils.js'

export function attack (attacker, defender, maxDamage) {
  const damage = random(maxDamage)
  defender.changeHP(damage, attacker)
}

export function createClickCounter (button, maxClicks) {
  let clicks = 0
  const originalText = button.innerText
  return () => {
    if (clicks < maxClicks) {
      clicks++
      const remaining = maxClicks - clicks
      button.innerText = `${originalText} (${remaining} залишилось)`
      if (clicks === maxClicks) {
        button.disabled = true
        button.style.opacity = '0.6'
        button.innerText = `${originalText} (0 залишилось)`
      }
      return true
    }
    return false
  }
}

export function setupBattle (character, enemies) {
  const $btnKick = document.getElementById('btn-kick')
  const $btnQuick = document.getElementById('btn-quick')

  const kickCounter = createClickCounter($btnKick, 7)
  const quickCounter = createClickCounter($btnQuick, 7)

  $btnKick.addEventListener('click', () => {
    if (kickCounter()) {
      showMessage('Thunder Jolt!')
      enemies.forEach(e => attack(character, e, 20))
    }
  })

  $btnQuick.addEventListener('click', () => {
    if (quickCounter()) {
      showMessage('Quick Attack!')
      enemies.forEach(e => attack(character, e, 10))
    }
  })
}
