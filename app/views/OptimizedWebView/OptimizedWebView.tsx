import React, { useMemo } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { WebViewMessageEvent, WebView } from 'react-native-webview'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useDigitalHuman } from './DigitalHumanContext'

const TOP_BAR_HEIGHT = 44

export const OptimizedWebView = React.memo(() => {
  const { ref, shown, style, height, width } = useDigitalHuman()
  const { top, bottom } = useSafeAreaInsets()

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          position: 'absolute',
          zIndex: shown ? 1 : 0,
          height:
            (height || Dimensions.get('screen').height) -
            top -
            TOP_BAR_HEIGHT -
            bottom,
          width: width || Dimensions.get('screen').width,
          opacity: shown ? 1 : 0,
          ...style
        }
      }),
    [shown, top, bottom, width, height, style]
  )

  // Receives the message from the WebView
  const handleMessage = (event: WebViewMessageEvent) => {
    console.log(event.nativeEvent.data)

    // if (event.nativeEvent.data) {
    //   if (event.nativeEvent.data === 'ready') {
    // Show the video when the WebView is rendered
    //     sendMessage(ref, 'loadingVideoStarted')('')
    //   }
    // }
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
