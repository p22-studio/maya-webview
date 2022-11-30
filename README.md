# Maya Demo App

This technical demo tries to explain how to implement the Digital Human in a React Native app

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

## Strategies

All these strategies are placed in different components of the Demo App, to make use of them. Please refer to those components to have a more complete implementation idea.

### Handling Digital Human state when sent to background

When the app is sent to the background, the best practice is to pause the session and then resume when it is on the foreground. To do it, implement the code as follows

```tsx
useEffect(() => {
  AppState.addEventListener('change', state => {
    if (state === 'inactive') {
      sendMessage(ref, 'pauseSession')()
    }

    if (state === 'active') {
      sendMessage(ref, 'resumeSession')()
    }
  })
}, [])
```

Note that you can use the message type `pauseSession` and `resumeSession` in other situations too.

### Handling timeout when initializing

When the message sent from the WebView has the value `sessionLive`, it indicates that the Digital Human was shown. But it might happen that there are some errors when rendering it, so setting a timer to handle that case might be benetifial to notify the user or reload the page.
Here a state called `uneeq` is used to show the current status of the tool.

```tsx
const [uneeq, setUneeq] = useState({
  initialized: new Date(),
  sessionLive: false
})
```

First call the `validateSession` function from `handleMessage`.

```tsx
const handleMessage = (event: WebViewMessageEvent) => {
  validateSession(event.nativeEvent.data)

  // do stuff
}
```

```tsx
const validateSession = (data: string) => {
  if (data === 'sessionLive') {
    setUneeq(prevValue => ({ ...prevValue, sessionLive: true }))
  }
}
```

And let's validate it with a timer

```tsx
useEffect(() => {
  let event: ReturnType<typeof setTimeout>

  if (!uneeq.sessionLive) {
    event = setTimeout(() => {
      console.log('timeout')
    }, TIMEOUT)
  }

  return () => clearTimeout(event)
}, [uneeq])
```

You could vary it if needed.

## Optimized Experience

The example shown in `app/views/OptimizedWebView` implements a workaround to pre render the WebView, and to reduce the initializing time.
The implications are

- Making use of React.Context to implement it. It could be replaced by a state management library of preference.
- The position of the WebView will have to be `absolute`, so make sure to handle the way it's going to be rendered in every screen.
- Make sure to initialize it when needed, not in every case.

## Considerations about the Digital Human

### Every time the WebView is loaded, it will request camera and mic permissions - iOS only

It's due to the fact that Uneeq SDK requires the usage of the Camera and Mic to initialize.

**The Digital Human will not initialize if the user does not grant the permissions**

### It does not work on a simulator - Android only

The Android Simulator has some limitiations, one of them is rendering the Digital Human.
It's something that is related to the Uneeq SDK. It will be fixed as soon as possible.
