import { createPlayer } from './player.js'
import { setupBattle } from './battle.js'

const character = createPlayer({ name: 'Pikachu', id: 'character' })
const enemy1 = createPlayer({ name: 'Charmander', id: 'enemy1' })
const enemy2 = createPlayer({ name: 'Bulbasaur', id: 'enemy2' })

function init () {
  character.renderHP()
  enemy1.renderHP()
  enemy2.renderHP()
  setupBattle(character, [enemy1, enemy2])
  console.log('Start Game!')
}

init()
