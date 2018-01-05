import React, {Component} from 'react'
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity } from 'react-native'
import {createDeck} from '../utils/api'
import {insertDeck} from '../actions/index'
import { connect } from 'react-redux'
import { purple, orange, white, blue, black, pink } from '../utils/colors'
import Modal from 'react-native-modal'

class AddDeck extends Component {
  state = {
    text: "",
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

  submitName = () => {
    const { text } = this.state
    if (text.length != 0){
      this.props.dispatch(insertDeck(text))
      this.props.navigation.navigate('DeckView', {deck: this.state.text})
      this.setState({
        text: ""
      })
    }
    else {
      this.setState({
        visibleModal: 1
      })
    }

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>What is the new decks name?</Text>
        <TextInput style={styles.input} onChangeText= {(text) => this.setState({text: text})}
          value={this.state.text}>
        </TextInput>
        <TouchableOpacity style={styles.submitBtn} onPress={this.submitName}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <Modal isVisible={this.state.visibleModal === 1}>
          {this._renderModalContent()}
        </Modal>
      </View>
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
  title: {
    fontSize: 25,
    textAlign: 'center',
    fontFamily: 'Helvetica',
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
  buttonText: {
    fontSize: 15,
    color: white,
    textAlign: 'center'
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
    shadowOpacity: 5
  },
  modalText: {
    color: white,
    fontSize: 12
  }
})

export default connect()(AddDeck);
