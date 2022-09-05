# Maya Demo App

This technical demo will explain how to implement the Digital Human in a React Native app

## Requisites

- [WebView package](https://github.com/react-native-webview/react-native-webview) (try to keep updated to the latest version)

## WebView Usage

1. Add the `<WebView />` component
2. Add the following props

```
const sendMessage = (ref: any, type: string) => (payload: string) => {
  const parsedPayload = `{ type: 'question', question: '${payload || ''}' }`;
  const script = `
    window.ReactNativeWebView.mayaWebView.sendMessage({
      type: '${type}', payload: ${parsedPayload}
    })
    true
  `;

  ref.current?.injectJavaScript(script);
};

const DigitalHuman = () => {
  const ref = useRef()

  return (
    <WebView
      allowsInlineMediaPlayback
      mediaPlaybackRequiresUserActions={false}
      ref={ref} // this will send messages to the webview
      onMessage={handleMessage} // this will receive messages from the webview
      source={{uri: 'https://uneeq-webview.vercel.app/'}}
  />
  )
}
```

## Receiving messages from the WebView

This prop will allow us to get the messages sent from the WebView, which will update the UI based on its state.

## Sending messages to the WebView

Using the function `sendMessage`, we will be able to send messages to the WebView.

Types of **type**

- `mayaMessage` allows will make the Digital Human to speak based on the `payload`

Types of **payload**

- Text that the Digital Human will speak
