import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { OptimizedNavigationParamList } from './OptimizedNavigator'

type WelcomeProps = NativeStackScreenProps<
  OptimizedNavigationParamList,
  'Welcome'
>

export const Welcome = ({ navigation }: WelcomeProps) => {
  const handleNavigate = () => {
    // navigation.navigate('Welcome')
    navigation.navigate('Video', {})
  }

  const handleGoBack = () => {
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Hey! Would you like to start the Digital Human?
      </Text>
      <TouchableOpacity onPress={handleNavigate} style={styles.button}>
        <Text style={[styles.text]}>Tap here</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleGoBack} style={styles.button}>
        <Text style={styles.text}>Go back</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 20
  },
  text: {
    color: '#FFF'
  },
  button: {
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#0C6291'
  }
})
