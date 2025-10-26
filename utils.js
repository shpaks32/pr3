export function random (num) {
  return Math.ceil(Math.random() * num)
}

export function showMessage (text) {
  const msg = document.createElement('div')
  msg.className = 'battle-message'
  msg.textContent = text
  document.body.appendChild(msg)
  setTimeout(() => msg.remove(), 3000)
}

export function generateLog (
  firstPerson,
  secondPerson,
  damage,
  hpLeft,
  hpTotal
) {
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

export function renderLog (text) {
  const $logs = document.getElementById('logs')
  const p = document.createElement('p')
  p.innerText = text
  $logs.insertBefore(p, $logs.firstChild)
}
