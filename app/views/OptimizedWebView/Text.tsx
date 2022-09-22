import React, { useCallback } from 'react'
import { View, Text as TextBase, StyleSheet } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import { useDigitalHuman } from './DigitalHumanContext'

const text =
  'This is sample text, used to show the ability to read text in screen'

export const Text = () => {
  const { setShown, sendMessage, setHeight } = useDigitalHuman()

  useFocusEffect(
    useCallback(() => {
      setShown(false)
      setHeight(null)
      sendMessage('mayaMessage')(text)
    }, [setShown, setHeight, sendMessage])
  )

  return (
    <View>
      <TextBase style={styles.text}>{text}</TextBase>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontWeight: '500',
    fontSize: 24
  }
})
