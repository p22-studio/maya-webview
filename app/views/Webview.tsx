import React, {useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {WebViewMessageEvent, WebView} from 'react-native-webview';

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

const Webview = () => {
  const ref = useRef(null);

  const handleMessage = (event: WebViewMessageEvent) => {
    const {data} = event.nativeEvent;

    console.log(event.nativeEvent.data);

    // if (data === 'ready') {
    //   sendMessage(ref, 'loadingVideoStarted')('');
    // }
  };

  return (
    <View style={styles.container}>
      <WebView
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserActions={false}
        ref={ref}
        onMessage={handleMessage}
        onError={e => console.log(e)}
        source={{uri: 'https://uneeq-webview.vercel.app/'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export {Webview};
