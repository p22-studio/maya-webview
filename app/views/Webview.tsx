import React, { useRef, useState, RefObject } from 'react'
import {
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text
} from 'react-native'
import { WebViewMessageEvent, WebView } from 'react-native-webview'

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
  const ref = useRef<WebView>(null)

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
        source={{ uri: 'https://uneeq-webview.vercel.app' }}
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
