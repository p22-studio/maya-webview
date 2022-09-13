import {
  createNativeStackNavigator,
  NativeStackScreenProps
} from '@react-navigation/native-stack'
import React from 'react'

import { DigitalHumanProvider } from './DigitalHumanContext'
import { Video } from './Video'
import { Welcome } from './Welcome'
import { RootAppParamList } from '../../../App'
import { OptimizedWebView } from './OptimizedWebView'

type OptimizedWebViewProps = NativeStackScreenProps<
  RootAppParamList,
  'Optimized'
>

export type OptimizedNavigationParamList = {
  Welcome: undefined
  Video: {}
}

const OptimizedStack =
  createNativeStackNavigator<OptimizedNavigationParamList>()

export const OptimizedNavigator = ({}: OptimizedWebViewProps) => {
  return (
    <DigitalHumanProvider>
      <OptimizedWebView />
      <OptimizedStack.Navigator initialRouteName="Welcome">
        <OptimizedStack.Screen component={Welcome} name="Welcome" />
        <OptimizedStack.Screen component={Video} name="Video" />
      </OptimizedStack.Navigator>
    </DigitalHumanProvider>
  )
}
