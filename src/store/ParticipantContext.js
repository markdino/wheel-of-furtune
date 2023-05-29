import { createContext, useState } from 'react'
import { v4 as uuid } from 'uuid'

const ParticipantContext = createContext({
  all: [],
  add: () => {},
  remove: () => {},
  update: () => {},
  nextPlayer: () => {},
  selectPlayer: () => {},
  player: {},
  addPlayerPrize: () => {},
  resetPlayerPrize: () => {},
})

export const ParticipantContextProvider = ({ children }) => {
  const [participants, setParticipants] = useState([])
  const [playerIndex, setPlayerIndex] = useState(0)

  const addParticipant = (name) => {
    const participant = {
      id: uuid(),
      name,
      prizes: [],
      hasJackpot: false,
      getTotalPrizes(){
        let total = 0
        this.prizes.forEach(prize => {
            this.hasJackpot = false
            if (typeof prize === 'number') {
                total += prize
            }else if (prize === 'Jackpot') {
                this.hasJackpot = true
            }
        })
        return total
      }
    }
    setParticipants([...participants, participant])
  }

  const removeParticipant = (id) => {
    const remainingParticipants = participants.filter((e) => e.id !== id)
    setParticipants(remainingParticipants)
  }

  const updateParticipant = (index, data) => {
    const mutableParticipants = [...participants]
    mutableParticipants[index] = data
    setParticipants(mutableParticipants)
  }

  const nextPlayer = () => {
    if (participants.length - 1 === playerIndex) {
      setPlayerIndex(0)
    } else {
      setPlayerIndex(playerIndex + 1)
    }
  }

  const selectPlayer = (id) => {
    setPlayerIndex(participants.findIndex((player) => player.id === id))
  }

  const addPlayerPrize = (prize) => {
    const updatedPlayer = { ...participants[playerIndex] }
    updatedPlayer.prizes.push(prize)
    updateParticipant(playerIndex, updatedPlayer)
  }

  const resetPlayerPrize = () => {
    const updatedPlayer = { ...participants[playerIndex] }
    updatedPlayer.prizes = []
    updateParticipant(playerIndex, updatedPlayer)
  }

  const context = {
    all: participants,
    add: addParticipant,
    remove: removeParticipant,
    update: updateParticipant,
    nextPlayer,
    player: participants[playerIndex],
    selectPlayer,
    addPlayerPrize,
    resetPlayerPrize,
  }

  return (
    <ParticipantContext.Provider value={context}>
      {children}
    </ParticipantContext.Provider>
  )
}

export default ParticipantContext