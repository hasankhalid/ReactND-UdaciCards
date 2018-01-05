export const INSERT_DECK = 'INSERT_DECK'
export const RECIEVE_DECKS = 'RECIEVE_DECKS'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'

export function insertDeck (deck) {
  return {
    type: INSERT_DECK,
    deck
  }
}

export function recieveDecks (decks) {
  return {
    type: RECIEVE_DECKS,
    decks
  }
}

export function addCard (card) {
  return {
    type: ADD_CARD_TO_DECK,
    card
  }
}
