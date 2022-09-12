import {
  createNativeStackNavigator,
  NativeStackScreenProps
} from '@react-navigation/native-stack'
import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { RootAppParamList } from '../../../App'

type OptimizedWebViewProps = NativeStackScreenProps<
  RootAppParamList,
  'Optimized'
>

type OptimizedNavigationParamList = {
  Welcome: undefined
}

const OptimizedStack =
  createNativeStackNavigator<OptimizedNavigationParamList>()

type WelcomeProps = NativeStackScreenProps<
  OptimizedNavigationParamList,
  'Welcome'
>

const Welcome = ({}: WelcomeProps) => {
  const handleNavigate = () => {
    // navigation.navigate('Welcome')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Hey! Would you like to start the Digital Human?
      </Text>
      <TouchableOpacity onPress={handleNavigate} style={styles.button}>
        <Text style={styles.text}>Tap here</Text>
      </TouchableOpacity>
    </View>
  )
}

export const OptimizedNavigator = ({}: OptimizedWebViewProps) => {
  return (
    <OptimizedStack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false }}
    >
      <OptimizedStack.Screen component={Welcome} name="Welcome" />
    </OptimizedStack.Navigator>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#0C6291',
    padding: 10
  },
  home: {
    flex: 1
  },
  title: {
    padding: 10,
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20
  },
  text: {
    color: '#FFF'
  },
  container: {
    alignItems: 'center'
  }
})
