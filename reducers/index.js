import {INSERT_DECK,
        RECIEVE_DECKS,
        GET_DECKS,
        ADD_CARD_TO_DECK,
        REMOVE_DECK}
        from '../actions/index'

function deck (state={}, action) {
  switch (action.type) {
    case INSERT_DECK:
      const newDeck = {
        [action.deck] : {
          title: action.deck,
          questions: []
        }
      }
      return {
        ...state,
        ...newDeck
      }
    case RECIEVE_DECKS:
      return {
        ...state,
        ...action.decks
      }
    case ADD_CARD_TO_DECK:
      const {questions, answer, deck} = action.card
      return {
        ...state,
        [deck]: {
          ...state[deck],
          questions: [...state[deck].questions, {questions, answer}]
        }
      }
    default:
      return state
  }
}

export default deck
