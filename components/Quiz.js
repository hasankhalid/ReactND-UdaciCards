import React, {Component} from 'react'
import { NavigationActions, Text, View, TouchableOpacity, KeyboardAvoidingView, StyleSheet } from 'react-native'
import { orange, white, red, purple, gray, silver,blue, pink, black } from '../utils/colors'
import { connect } from 'react-redux'
import { clearLocalNotifications, setLocalNotification } from '../utils/helpers'

function Toggle({ onPress, style, text }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={style}>{text}</Text>
    </TouchableOpacity>
  )
}

function Button({ onPress, style, text, color}) {
  return (
    <TouchableOpacity onPress={onPress} style={[style.button, {backgroundColor: color}]}>
      <Text style={style.submitBtnText}>{text}</Text>
    </TouchableOpacity>
  )
}

class Quiz extends Component {
  componentDidMount(){
    clearLocalNotifications()
      .then(setLocalNotification)
  }
  state = {
    questionNo: 0,
    correct: 0,
    incorrect: 0,
    showQuestion: true,
    showScore: false
  }

  showAnswer = () => {
    this.state.showQuestion ? this.setState({ showQuestion: false })
    : this.setState({ showQuestion: true })
  }

  submitAnswer = (answer) => {
    const { questionNo } = this.state
    const deck = this.props.navigation.state.params.deck
    const decks = this.props.decks

    if (answer === 'true'){
      this.setState({
        correct: this.state.correct + 1
      })
    }
    else {
      this.setState({
        incorrect: this.state.incorrect + 1
      })
    }
    this.setState({
      questionNo: this.state.questionNo + 1,
      showQuestion: true
    })
  }

  calculatePercentage = (a,b) => {
    return (
      (a/b)*100
    )
  }

  resetQuiz = () => {
    this.setState({
      questionNo: 0,
      correct: 0,
      incorrect: 0,
      showQuestion: true,
      showScore: false
    })
  }

  render(){
    const questionNo = this.state.questionNo
    const decks = this.props.decks
    const deck = this.props.navigation.state.params.deck
    const number = this.state.questionNo + 1
    const correct = this.state.correct
    const incorrect = this.state.incorrect

    return (
      <View style={styles.container}>
          {decks[deck].questions.length === 0 ?
            <View style={styles.card}>
              <View style={styles.textWrapper}>
                <Text style={styles.answer}>There are no cards to quiz you from</Text>
              </View>
              <View style={styles.buttonWrapper}>
                <Button style={styles} color={blue} text={'Back to Deck'} onPress={() =>  this.props.navigation.goBack({ deck: deck })}/>
              </View>
            </View>
          :
          this.state.questionNo/decks[deck].questions.length === 1 ?
            <View style={styles.card}>
              <View style={styles.textWrapper}>
                <Text style={styles.answer}>Score is {this.calculatePercentage(correct, incorrect+correct)} % correct answers</Text>
              </View>
              <View style={styles.buttonWrapper}>
                <Button style={styles} text={'Restart Quiz'} color={orange} onPress={() => this.resetQuiz()}/>
                <Button style={styles} color={purple} text={'Back to Deck'} onPress={() =>  this.props.navigation.navigate('DeckView', { deck: deck })}/>
              </View>
            </View>
          :
          <View style={styles.card}>
            <View style={styles.textWrapper}>
              <Text style={styles.questions}> {number} / {decks[deck].questions.length}</Text>

              {this.state.showQuestion ? <Text style={styles.questionText}>{decks[deck].questions[questionNo].question}</Text>
              : <Text style={styles.questionText}>{decks[deck].questions[questionNo].answer}</Text>}

              {this.state.showQuestion ? <Toggle style={styles.answer} text = {'Show Answer'} onPress={this.showAnswer}></Toggle>
              : <Toggle style={styles.answer} text = {'Show Question'} onPress={this.showAnswer}></Toggle>}
            </View>
            <View style={styles.buttonWrapper}>
              <Button style={styles} text={'Correct'} color={blue} onPress={() => this.submitAnswer('true')}/>
              <Button style={styles} color={purple} text={'InCorrect'} onPress={() => this.submitAnswer('false')}/>
            </View>
          </View>

            }

      </View>
    )
  }
}

const styles= StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
  questions: {
    top: 0,
    alignSelf: 'flex-start',
    left: 0,
    top: 0,
    color: white,
    fontSize: 20,
    margin: 5,
    position: 'absolute',
  },
  answer: {
    color: white,
    fontSize: 20,
    margin: 20
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    alignSelf: 'stretch',
    margin: 5,
    borderRadius: 2,
    shadowRadius: 1,
    shadowOffset: {
      width: -0.5,
    },
    shadowColor: black,
    shadowOpacity: 3
  },
  questionText: {
    fontSize: 40,
    color: white,
    marginTop: 40,
    textAlign: 'center'
  }
})

function mapStateToProps(decks){
  return {
    decks,
  }
}

export default connect(mapStateToProps)(Quiz)
