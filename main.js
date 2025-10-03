const $btnKick = document.getElementById('btn-kick')
const $btnQuick = document.getElementById('btn-quick')

function showMessage (text) {
  const msg = document.createElement('div')
  msg.className = 'battle-message'
  msg.textContent = text
  document.body.appendChild(msg)

  setTimeout(() => {
    msg.remove()
  }, 3000)
}

const character = {
  name: 'Pikachu',
  defaultHP: 100,
  damageHP: 100,
  elHP: document.getElementById('health-character'),
  elProgressbar: document.getElementById('progressbar-character'),

  renderHPLife () {
    this.elHP.innerText = this.damageHP + ' / ' + this.defaultHP
  },

  renderProgressbarHP () {
    this.elProgressbar.style.width = this.damageHP + '%'

    const percent = this.damageHP / 100
    const r = Math.floor(255 * (1 - percent))
    const g = Math.floor(255 * percent)
    const b = 0

    this.elProgressbar.style.background = `rgb(${r},${g},${b})`
  },

  renderHP () {
    this.renderHPLife()
    this.renderProgressbarHP()
  },

  changeHP (count) {
    if (this.damageHP <= count) {
      this.damageHP = 0
      this.renderHP()
      if (!this.lost) {
        showMessage('⚡ ' + this.name + ' вибув з бою!')
        this.lost = true
      }
    } else {
      this.damageHP -= count
      this.renderHP()
    }
  }
}

const enemy1 = {
  name: 'Charmander',
  defaultHP: 100,
  damageHP: 100,
  elHP: document.getElementById('health-enemy1'),
  elProgressbar: document.getElementById('progressbar-enemy1'),

  renderHPLife: character.renderHPLife,
  renderProgressbarHP: character.renderProgressbarHP,
  renderHP: character.renderHP,
  changeHP: character.changeHP
}

const enemy2 = {
  name: 'Bulbasaur',
  defaultHP: 100,
  damageHP: 100,
  elHP: document.getElementById('health-enemy2'),
  elProgressbar: document.getElementById('progressbar-enemy2'),

  renderHPLife: character.renderHPLife,
  renderProgressbarHP: character.renderProgressbarHP,
  renderHP: character.renderHP,
  changeHP: character.changeHP
}

function random (num) {
  return Math.ceil(Math.random() * num)
}

function attack (person, maxDamage) {
  person.changeHP(random(maxDamage))
}

$btnKick.addEventListener('click', function () {
  attack(enemy1, 20)
  attack(enemy2, 20)
})

$btnQuick.addEventListener('click', function () {
  attack(enemy1, 10)
  attack(enemy2, 10)
})

function init () {
  character.renderHP()
  enemy1.renderHP()
  enemy2.renderHP()
}

init()
