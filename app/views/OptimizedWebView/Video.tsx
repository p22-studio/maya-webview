import React, { useCallback } from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  StyleSheet
} from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { useDigitalHuman } from './DigitalHumanContext'
import { OptimizedNavigationParamList } from './OptimizedNavigator'

const BUTTON_HEIGHT = 24

type VideoProps = NativeStackScreenProps<OptimizedNavigationParamList, 'Video'>

export const Video = ({ navigation }: VideoProps) => {
  const { setShown, sendMessage, setHeight, setStyle } = useDigitalHuman()

  useFocusEffect(
    useCallback(() => {
      setShown(true)

      // Only if you want to show the loading video
      sendMessage('loadingVideoStarted')('')
      setStyle({ bottom: 0 })
      setHeight(Dimensions.get('screen').height - BUTTON_HEIGHT)
    }, [setShown, sendMessage, setStyle, setHeight])
  )

  return (
    <View>
      <Text style={styles.title}>Digital Human shown</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('Text', {})}
        style={styles.button}
      >
        <Text style={styles.text}>Navigate to Text</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#0C6291',
    marginBottom: 20,
    padding: 10
  },
  title: {
    fontSize: 24,
    textAlign: 'center'
  },
  text: {
    color: '#FFF'
  }
})
