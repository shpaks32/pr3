const $btnKick = document.getElementById('btn-kick')
const $btnQuick = document.getElementById('btn-quick')
const $logs = document.getElementById('logs')

function showMessage (text) {
  const msg = document.createElement('div')
  msg.className = 'battle-message'
  msg.textContent = text
  document.body.appendChild(msg)

  setTimeout(() => msg.remove(), 3000)
}

function random (num) {
  return Math.ceil(Math.random() * num)
}

function generateLog (firstPerson, secondPerson, damage, hpLeft, hpTotal) {
  const { name: name1 } = firstPerson
  const { name: name2 } = secondPerson

  const logs = [
    `${name1} вагався, але ${name2} не зволікав і вдарив!`,
    `${name1} зробив помилку, а ${name2} скористався моментом.`,
    `${name1} намагався ухилитися, проте ${name2} провів точну атаку.`,
    `${name1} розгубився, і ${name2} скористався слабкістю.`,
    `${name1} занадто довго думав — ${name2} уже встиг атакувати.`,
    `${name1} зробив випад, але ${name2} контратакував блискавично.`,
    `${name1} крикнув, але ${name2} наніс нищівний удар.`,
    `${name1} послизнувся, а ${name2} скористався нагодою.`,
    `${name1} втратив рівновагу, і ${name2} атакував!`,
    `${name1} не очікував — ${name2} ударив раптово.`
  ]

  const text = logs[random(logs.length) - 1]
  return `${text}  -${damage} HP [${hpLeft}/${hpTotal}]`
}

function renderLog (text) {
  const p = document.createElement('p')
  p.innerText = text
  $logs.insertBefore(p, $logs.firstChild)
}

function createPlayer ({ name, id }) {
  const elHP = document.getElementById(`health-${id}`)
  const elProgressbar = document.getElementById(`progressbar-${id}`)

  const player = {
    name,
    defaultHP: 100,
    damageHP: 100,
    lost: false,
    elHP,
    elProgressbar,

    renderHPLife () {
      const { damageHP, defaultHP, elHP } = this
      elHP.innerText = `${damageHP} / ${defaultHP}`
    },

    renderProgressbarHP () {
      const { damageHP, elProgressbar } = this
      elProgressbar.style.width = `${damageHP}%`
      elProgressbar.style.background =
        damageHP > 60 ? '#4CAF50' : damageHP > 30 ? '#FF9800' : '#F44336'
    },

    renderHP () {
      this.renderHPLife()
      this.renderProgressbarHP()
    },

    changeHP (count, enemy) {
      const { name, defaultHP } = this

      if (this.damageHP <= count) {
        this.damageHP = 0
        this.renderHP()
        if (!this.lost) {
          showMessage(`⚡ ${name} вибув з бою!`)
          this.lost = true
        }
      } else {
        this.damageHP -= count
        this.renderHP()

        const log = generateLog(enemy, this, count, this.damageHP, defaultHP)
        renderLog(log)
      }
    }
  }

  return player
}

const character = createPlayer({ name: 'Pikachu', id: 'character' })
const enemy1 = createPlayer({ name: 'Charmander', id: 'enemy1' })
const enemy2 = createPlayer({ name: 'Bulbasaur', id: 'enemy2' })

function attack (attacker, defender, maxDamage) {
  const damage = random(maxDamage)
  defender.changeHP(damage, attacker)
}

$btnKick.addEventListener('click', () => {
  showMessage('⚡ Thunder Jolt!')
  attack(character, enemy1, 20)
  attack(character, enemy2, 20)
})

$btnQuick.addEventListener('click', () => {
  showMessage('💨 Quick Attack!')
  attack(character, enemy1, 10)
  attack(character, enemy2, 10)
})

function init () {
  character.renderHP()
  enemy1.renderHP()
  enemy2.renderHP()
}

init()
