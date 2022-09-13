import React, { useMemo, useRef, RefObject } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { WebViewMessageEvent, WebView } from 'react-native-webview'
import { useDigitalHuman } from './DigitalHumanContext'

type MessageTypes = 'loadingVideoStarted' | 'mayaMessage'

const sendMessage =
  (ref: RefObject<WebView>, type: MessageTypes) => (payload: string) => {
    const parsedPayload = `{ type: 'question', question: '${payload || ''}' }`
    const script = `
    window.ReactNativeWebView.mayaWebView.sendMessage({
      type: '${type}', payload: ${parsedPayload}
    })
    true
  `

    ref.current?.injectJavaScript(script)
  }

export const OptimizedWebView = React.memo(() => {
  const ref = useRef<WebView>(null)

  const { shown } = useDigitalHuman()

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          position: 'absolute',
          zIndex: shown ? 1 : 0,
          height: Dimensions.get('screen').height,
          width: Dimensions.get('screen').width,
          opacity: shown ? 1 : 0
        }
      }),
    [shown]
  )

  // Receives the message from the WebView
  const handleMessage = (event: WebViewMessageEvent) => {
    console.log(event.nativeEvent.data)

    if (event.nativeEvent.data) {
      if (event.nativeEvent.data === 'ready') {
        // Show the video when the WebView is rendered
        sendMessage(ref, 'loadingVideoStarted')('')
      }
    }
  }

  return (
    <WebView
      allowsInlineMediaPlayback
      javaScriptEnabled
      domStorageEnabled
      allowFileAccessFromFileURLs
      allowUniversalAccessFromFileURLs
      mediaPlaybackRequiresUserAction={false}
      ref={ref}
      onMessage={handleMessage}
      onError={e => console.log(e)}
      containerStyle={styles.container}
      source={{ uri: 'https://uneeq-webview.vercel.app' }}
    />
  )
})

export default OptimizedWebView
