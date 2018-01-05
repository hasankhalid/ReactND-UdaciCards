import {AsyncStorage} from 'react-native'

//Key identifier for storing data in local storage
const KEY_FOR_STORAGE = 'Project_Mobile_FlashCards: decks'


const Data = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

export function getDecks () {
  return AsyncStorage.getItem(KEY_FOR_STORAGE)
  .then(results => {
    if (results === null) {
      AsyncStorage.setItem(KEY_FOR_STORAGE, JSON.stringify(Data))
      return Data
    }
    else {
      return JSON.parse(results)
    }
  })
}


// The following function will create a deck with a title given and an empty array of questions
export function createDeck(title){
    return AsyncStorage.mergeItem(KEY_FOR_STORAGE, JSON.stringify({
    	[title]: {
    		title: title,
    		questions: []
    	}
    }))
  }

//Retrieves items from local storage and pushes a new card to the deck passed in. The method updates the local storage after adding the card
export function addCardToDeck (deck, card) {
    return AsyncStorage.getItem(KEY_FOR_STORAGE)
    .then(results => JSON.parse(results))
    .then(results => {
      results[deck].questions.push(card)
      AsyncStorage.setItem(KEY_FOR_STORAGE, JSON.stringify(results))
        return results
    })
  }
