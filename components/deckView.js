import React, {Component} from 'react'
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import {getData} from '../utils/api'
import { connect } from 'react-redux'
import { white, gray, red, purple, pink, black, tealBlue, rose } from '../utils/colors'
import { clearLocalNotifications, setLocalNotification } from '../utils/helpers'

function Button({ onPress, style, text, color}) {
  return (
    <TouchableOpacity onPress={onPress} style={[style.button, {backgroundColor: color}]}>
      <Text style={style.submitBtnText}>{text}</Text>
    </TouchableOpacity>
  )
}

class DeckView extends Component {




  render () {
    const { decks, navigation } = this.props
    const deck = navigation.state.params.deck

    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.textWrapper}>
            <Text style={styles.titleText}>{decks[deck].title}</Text>
            <Text style={styles.titleText}>{decks[deck].questions.length}</Text>
          </View>
          <View style={styles.buttonWrapper}>
            <Button style={styles} text={'Add Card'} color={tealBlue} onPress={() => navigation.navigate('AddCard', { deck: deck })}/>
            <Button style={styles} text={'Start Quiz'} color={purple} onPress={() => navigation.navigate('Quiz', { deck: deck })}/>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    fontFamily: 'Helvetica',
    fontSize: 40,
    color: white,
  },
  text: {
    fontFamily: 'Helvetica',
    fontSize: 20,
    color: white
  },
  textWrapper: {
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: pink,
    alignSelf: 'stretch'
  },
  buttonWrapper: {
    flexDirection: 'row',
    flex: 2,
    justifyContent: 'space-around',
    backgroundColor: white,
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  button: {
    padding: 10,
    height: 45,
    margin: 5,
    width: 125,
    margin: 6,
    borderRadius: 6,
    shadowRadius: 2,
    shadowOffset: {
      width: -0.5,
      height: -0.5
    },
    shadowColor: black,
    shadowOpacity: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitBtnText: {
    color: white,
    fontSize: 15,
    textAlign: 'center'
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    margin: 5,
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

export default connect(mapStateToProps)(DeckView);
