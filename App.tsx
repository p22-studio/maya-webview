/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react'
import {
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import {
  createNativeStackNavigator,
  NativeStackScreenProps
} from '@react-navigation/native-stack'

import { Webview } from './app/views/Webview'
import { OptimizedNavigator } from './app/views/OptimizedWebView'

export type RootAppParamList = {
  Home: undefined
  Webview: {}
  Optimized: {}
}

const AppNavigator = createNativeStackNavigator<RootAppParamList>()

type HomeProps = NativeStackScreenProps<RootAppParamList, 'Home'>

const Home = ({ navigation }: HomeProps) => {
  const handleNavigate = (screen: 'Webview' | 'Optimized') => {
    navigation.navigate(screen, {})
  }

  return (
    <View>
      <TouchableOpacity
        onPress={() => handleNavigate('Webview')}
        style={styles.button}
      >
        <Text style={styles.text}>Navigate to Maya Webview</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleNavigate('Optimized')}
        style={styles.button}
      >
        <Text style={styles.text}>Navigate to Optimized Maya Webview</Text>
      </TouchableOpacity>
    </View>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar />
      <AppNavigator.Navigator initialRouteName="Home">
        <AppNavigator.Screen component={Home} name="Home" />
        <AppNavigator.Screen component={Webview} name="Webview" />
        <AppNavigator.Screen component={OptimizedNavigator} name="Optimized" />
      </AppNavigator.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#0C6291',
    marginBottom: 20,
    padding: 10
  },
  home: {
    flex: 1
  },
  text: {
    color: '#FFF'
  }
})

export default App
