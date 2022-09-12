# Maya Demo App

This technical demo will explain how to implement the Digital Human in a React Native app

## Requisites

- [WebView package](https://github.com/react-native-webview/react-native-webview) (try to keep it updated to the latest version)

## WebView Usage

1. Add the `<WebView />` component
2. Add the following props

```tsx
const sendMessage =
  (ref: RefObject<WebView>, type: string) => (payload: string) => {
    const parsedPayload = `{ type: 'question', question: '${payload || ''}' }`
    const script = `
    window.ReactNativeWebView.mayaWebView.sendMessage({
      type: '${type}', payload: ${parsedPayload}
    })
    true
  `

    ref.current?.injectJavaScript(script)
  }

const DigitalHuman = () => {
  const ref = useRef(null)

  const handleMessage = (event: WebViewMessageEvent) => {
    console.log(event.nativeEvent.data)

    // WebView initialized
    if (event.native.data === 'ready') {
      // Do stuff
    }

    // Digital Human is shown
    if (event.native.data === 'sessionLive') {
      // Do Stuff
    }
  }

  return (
    <WebView
      allowsInlineMediaPlayback
      javaScriptEnabled
      domStorageEnabled
      allowFileAccessFromFileURLs
      allowUniversalAccessFromFileURL
      mediaPlaybackRequiresUserAction={false}
      ref={ref} // this will send messages to the webview
      onMessage={handleMessage} // this will receive messages from the webview
      source={{ uri: 'https://uneeq-webview.vercel.app/' }}
    />
  )
}
```

## Receiving messages from the WebView

The `onMessage` prop will allow us to get the messages sent from the WebView, which will update the UI based on its state.

Types of `message`

- `ready` the WebView is initialized
- `sessionLive` the DigitalHuman is shown
- It will also receive messages with the actions from the WebView. This doesn't have to be handled, they just provide data about the state of the WebView

## Sending messages to the WebView

Using the function `sendMessage`, we will be able to send messages to the WebView.

Types of `type`

- `mayaMessage` allows will make the Digital Human to speak based on the `payload`
- `loadingVideoStarted` shows the loading video while the Digital Human is initialized. See `Webview.tsx` implementation for a guide on how to use this

Types of `payload`

- Text that the Digital Human will speak

## Considerations about the Digital Human

### Every time the WebView is loaded, it will request camera and mic permissions - iOS only

It's due to the fact that Uneeq SDK requires the usage of the Camera and Mic to initialize.

**The Digital Human will not initialize if the user does not grant the permissions**

### It does not work on a simulator - Android only

The Android Simulator has some limitiations, one of them is rendering the Digital Human.
It's something that is related to the Uneeq SDK. It will be fixed as soon as possible.
