import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  RefObject
} from 'react'
import {
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text
} from 'react-native'
import { WebViewMessageEvent, WebView } from 'react-native-webview'

const TIMEOUT = 20000

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

const Webview = () => {
  const [text, setText] = useState('')
  const [error, setError] = useState('')
  const [uneeq, setUneeq] = useState({
    initialized: new Date(),
    sessionLive: false
  })
  const ref = useRef<WebView>(null)

  /**
   * Validate timeout for session live
   */
  useEffect(() => {
    let event: ReturnType<typeof setTimeout>

    if (!uneeq.sessionLive) {
      event = setTimeout(() => {
        console.log('timeout')
      }, TIMEOUT)
    }

    return () => clearTimeout(event)
  }, [uneeq])

  const validateSession = useCallback((data: string) => {
    if (data === 'sessionLive') {
      setUneeq(prevValue => ({ ...prevValue, sessionLive: true }))
    }
  }, [])

  // Receives the message from the WebView
  const handleMessage = (event: WebViewMessageEvent) => {
    console.log(event.nativeEvent.data)

    validateSession(event.nativeEvent.data)

    if (event.nativeEvent.data) {
      if (event.nativeEvent.data === 'ready') {
        // Show the video when the WebView is rendered
        sendMessage(ref, 'loadingVideoStarted')('')
      }
    }
  }

  const handleText = (newValue: string) => setText(newValue)

  return (
    <SafeAreaView style={styles.container}>
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
        source={{ uri: 'http://localhost:8080' }}
      />

      <View style={styles.messageContainer}>
        <TextInput
          placeholder="Message"
          style={styles.input}
          onChangeText={handleText}
          placeholderTextColor="#FFF"
          value={text}
        />
        <TouchableOpacity
          style={styles.speakButton}
          onPress={() => {
            sendMessage(ref, 'mayaMessage')(text)
          }}
        >
          <Text style={styles.text}>Send Message</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  messageContainer: {
    alignItems: 'center',
    backgroundColor: '#FFF'
  },
  text: {
    color: '#FFF'
  },
  speakButton: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#0C6291'
  },
  input: {
    marginBottom: 5,
    width: '100%',
    backgroundColor: '#175676',
    color: '#FFF',
    padding: 10
  }
})

export { Webview }
