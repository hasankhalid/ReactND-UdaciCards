import React, { Component } from 'react'
import { NavigationActions } from 'react-navigation'
import { addCardToDeck } from '../utils/api'
import { connect } from 'react-redux'
import { addCard } from '../actions/index'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import { white, blue, purple, black, orange, teal, pink } from '../utils/colors'
import Modal from 'react-native-modal'

class AddCard extends Component {

  state = {
    question: '',
    answer: '',
    visibleModal: null
  }

  _renderButton = (text, onPress) => (
    <TouchableOpacity onPress={this.setModaltoNull}>
      <View style={styles.close}>
        <Text style={styles.modalText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  setModaltoNull = () => {
    this.setState({
      visibleModal: null
    })
  }

  _renderModalContent = () => (
    <View style={styles.modalContent}>
      <Text style={styles.modalText}>Please enter a value</Text>
      {this._renderButton('Close')}
    </View>
  );

  submitCard = (deck) => {
    const { question, answer } = this.state
    const { navigation } = this.props
    if (question.length != 0 && answer.length !=0){
      this.props.addCard({ question, answer, deck})
      addCardToDeck(deck, {question, answer})
      this.setState({
        question: '',
        answer: ''
      })
      navigation.dispatch(NavigationActions.back({ key: null }))
    }
    else {
      this.setState({
        visibleModal: 1
      })
    }
  }

  render(){
    const deck = this.props.navigation.state.params.deck
    return(
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <View style={styles.subContain}>
          <Text style={styles.title}>What is the question?</Text>
          <TextInput
            style={styles.input}
            onChangeText={(input) => this.setState({question: input})}
            value={this.state.question}
          ></TextInput>

          <Text style={styles.title}>What is the answer?</Text>
          <TextInput
            style={styles.input}
            onChangeText={(input) => this.setState({answer: input})}
            value={this.state.answer}
          ></TextInput>

          <TouchableOpacity style={styles.submitBtn} onPress={() => this.submitCard(deck)}>
            <Text style={styles.submitBtnText}>Submit</Text>
          </TouchableOpacity>
          <Modal isVisible={this.state.visibleModal === 1}>
            {this._renderModalContent()}
          </Modal>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: blue,
    margin: 8,
    borderRadius: 6,
    shadowRadius: 2,
    shadowOffset: {
      width: -0.5,
      height: -0.5
    },
    shadowColor: black,
    shadowOpacity: 5,
    alignSelf: 'stretch'
  },
  subContain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8
  },
  submitBtnText: {
    color: white,
    fontSize: 15,
    textAlign: 'center',
    color: white
  },
  title: {
    fontSize: 20,
    color: white
  },
  submitBtn: {
    borderWidth: 0.5,
    padding: 10,
    backgroundColor: pink,
    borderRadius: 4,
    overflow: 'hidden',
    width: 75,
    shadowRadius: 2,
    shadowOffset: {
      width: -0.5,
      height: -0.5
    },
    shadowColor: black,
    shadowOpacity: 5
  },
  input: {
    width: 200,
    height: 44,
    padding: 4,
    borderWidth: 1,
    borderColor: purple,
    backgroundColor: white,
    color: blue,
    margin: 20,
    borderRadius: 5,
    fontFamily: 'Helvetica',
    shadowRadius: 2,
    shadowOffset: {
      width: -0.5,
      height: -0.5
    },
    shadowColor: black,
    shadowOpacity: 5
  },
  close: {
    backgroundColor: purple,
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    shadowRadius: 2,
    shadowOffset: {
      width: 0.5,
      height: 0.5
    },
    shadowColor: black,
    shadowOpacity: 5
  },
  modalContent: {
    backgroundColor: pink,
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    shadowRadius: 2,
    shadowOffset: {
      width: -0.5,
      height: -0.5
    },
    shadowColor: black,
    shadowOpacity: 5,
  },
  modalText: {
    color: white,
    fontSize: 12
  }
})

function mapDispatchtoProps (dispatch) {
  return {
    addCard: (object) => dispatch(addCard(object))
  }
}

export default connect(null, mapDispatchtoProps)(AddCard)
