import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, Platform } from 'react-native'
import {purple, white, orange, black, pink} from '../utils/colors'
import DeckView from './deckView'
import { connect } from 'react-redux'
import { getDecks } from '../utils/api'
import { recieveDecks } from '../actions/index'

class DeckContainer extends React.Component {
  componentDidMount(){
    getDecks()
    .then(decks => this.props.receiveDecks(decks))
  }

  render () {
    const { decks } = this.props
    const { navigation } = this.props
    return (
      <ScrollView style={styles.container}>
        {Object.keys(decks).map((deck) => {
          const { title,questions } = decks[deck]
          return (
            <View key={deck} style={styles.card}>
              <View style={styles.cardHead}>
                <Text style={styles.cardHeading}>{title}</Text>
                <Text style={styles.cardText}>{questions.length} Cards</Text>
              </View>
              <View style={styles.cardBottom}>
                <TouchableOpacity style={styles.cardButton} onPress={() => navigation.navigate('DeckView', {deck: deck})}>
                  <Text style={styles.buttonText}>View Deck</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        })}
      </ScrollView>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonText: {
    textAlign: 'center',
    color: white,
    padding: 8
  },
  card: {
    flex: 1,
    margin: 9,
    height: 195,
    borderRadius: 8,
  },
  cardHead: {
    flex: 3,
    justifyContent: 'flex-end',
    backgroundColor: pink,
    borderRadius: 2,
    shadowRadius: 2,
    shadowOffset: {
      width: -0.5,
      height: -0.5
    },
    shadowColor: black,
    shadowOpacity: 3
  },
  cardBottom: {
    flex: 1,
    height: 10,
    alignItems: 'flex-end',
    backgroundColor: white,
    borderRadius: 2,
    shadowRadius: 1,
    shadowOffset: {
      width: -0.5,
    },
    shadowColor: black,
    shadowOpacity: 3
  },
  cardText: {
    fontSize: 15,
    color: white,
    fontFamily: 'Helvetica',
    padding: 6
  },
  cardHeading: {
    fontSize: 30,
    color: white,
    fontFamily:'Helvetica',
    padding: 6
  },
  cardButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: purple,
    margin: 6,
    borderRadius: 2,
    shadowRadius: 1,
    shadowOffset: {
      width: -0.5,
    },
    shadowColor: black,
    shadowOpacity: 3
  }
})

function mapStateToProps(decks) {
  return {
    decks,
  }
}

function mapDispatchtoProps (dispatch) {
  return {
    receiveDecks: (decks) => dispatch(recieveDecks(decks))
  }
}

export default connect(mapStateToProps, mapDispatchtoProps)(DeckContainer);
