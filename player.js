import { generateLog, renderLog, showMessage } from './utils.js'

export function createPlayer ({ name, id }) {
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
      this.elHP.innerText = `${this.damageHP} / ${this.defaultHP}`
    },
    renderProgressbarHP () {
      this.elProgressbar.style.width = `${this.damageHP}%`
      this.elProgressbar.style.background =
        this.damageHP > 60
          ? '#4CAF50'
          : this.damageHP > 30
          ? '#FF9800'
          : '#F44336'
    },
    renderHP () {
      this.renderHPLife()
      this.renderProgressbarHP()
    },
    changeHP (count, enemy) {
      if (this.damageHP <= count) {
        this.damageHP = 0
        this.renderHP()
        if (!this.lost) {
          showMessage(`${this.name} вибув з бою!`)
          this.lost = true
        }
      } else {
        this.damageHP -= count
        this.renderHP()
        const log = generateLog(
          enemy,
          this,
          count,
          this.damageHP,
          this.defaultHP
        )
        renderLog(log)
      }
    }
  }
  return player
}
