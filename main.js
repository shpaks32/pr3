const $btnKick = document.getElementById('btn-kick')
const $btnQuick = document.getElementById('btn-quick')

const character = {
  name: 'Pikachu',
  defaultHP: 100,
  damageHP: 100,
  elHP: document.getElementById('health-character'),
  elProgressbar: document.getElementById('progressbar-character')
}

const enemy1 = {
  name: 'Charmander',
  defaultHP: 100,
  damageHP: 100,
  elHP: document.getElementById('health-enemy1'),
  elProgressbar: document.getElementById('progressbar-enemy1')
}

const enemy2 = {
  name: 'Bulbasaur',
  defaultHP: 100,
  damageHP: 100,
  elHP: document.getElementById('health-enemy2'),
  elProgressbar: document.getElementById('progressbar-enemy2')
}

function renderHPLife (person) {
  person.elHP.innerText = person.damageHP + ' / ' + person.defaultHP
}

function renderProgressbarHP (person) {
  person.elProgressbar.style.width = person.damageHP + '%'

  const percent = person.damageHP / 100
  const r = Math.floor(255 * (1 - percent))
  const g = Math.floor(255 * percent)
  const b = 0

  person.elProgressbar.style.background = `rgb(${r},${g},${b})`
}

function renderHP (person) {
  renderHPLife(person)
  renderProgressbarHP(person)
}

function showMessage (text) {
  const msg = document.createElement('div')
  msg.className = 'battle-message'
  msg.textContent = text
  document.body.appendChild(msg)

  setTimeout(() => {
    msg.remove()
  }, 3000)
}

function changeHP (count, person) {
  if (person.damageHP <= count) {
    person.damageHP = 0
    renderHP(person)
    if (!person.lost) {
      showMessage('⚡ ' + person.name + ' вибув з бою!')
      person.lost = true
    }
  } else {
    person.damageHP -= count
    renderHP(person)
  }
}

function random (num) {
  return Math.ceil(Math.random() * num)
}

function attack (person, maxDamage) {
  changeHP(random(maxDamage), person)
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
  renderHP(character)
  renderHP(enemy1)
  renderHP(enemy2)
}

init()
