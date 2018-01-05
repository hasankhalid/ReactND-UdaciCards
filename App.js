import React from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import DeckContainer from './components/deckContainer'
import DeckView from './components/deckView'
import {TabNavigator, StackNavigator} from 'react-navigation'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import {purple,white, blue, red, gray} from './utils/colors'
import AddDeck from './components/addDeck'
import {Provider} from 'react-redux'
import reducer from './reducers'
import { createStore } from 'redux'
import AddCard from './components/addCard'
import { Constants } from 'expo'
import Quiz from './components/Quiz'
import { setLocalNotification } from './utils/helpers'

function UpdateStatusBar ({ backgroundColor, ...props}) {
  return (
    <View style = {{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

//The above function was developed with the help of the UdaciFitness application code.


const Tabs = TabNavigator({
  Home: {
    screen: DeckContainer,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards-outline' size={25} color={tintColor}/>
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-add-outline' size={25} color={tintColor}/>
    }
  }
}, {
  tabBarOptions: {
    activeTintColor: white,
    activeBackgroundColor: purple,
    inactiveTintColor: purple,
    inactiveBackgroundColor: white,
    style: {
      height: 60,
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      title: 'Home',
      headerStyle: {
        backgroundColor: purple,
      },
      headerTitleStyle: {
        color: white,
        fontFamily: 'Helvetica'
      }
    }
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: {
      title: 'Deck Detail',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
      headerTitleStyle: {
        color: white,
        fontFamily: 'Helvetica'
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: 'Add Card',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
      headerTitleStyle: {
        color: white,
        fontFamily: 'Helvetica'
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
      headerTitleStyle: {
        color: white,
        fontFamily: 'Helvetica'
      }
    }
  }
})

export default class App extends React.Component {
  componentDidMount () {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <UpdateStatusBar backgroundColor={purple} barStyle="light-content"/>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
