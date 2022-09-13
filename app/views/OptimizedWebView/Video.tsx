import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { useDigitalHuman } from './DigitalHumanContext'

export const Video = () => {
  const { setShown } = useDigitalHuman()

  useEffect(() => {
    setShown(true)
  }, [setShown])

  return (
    <View>
      <Text>Digital Human shown</Text>
    </View>
  )
}
