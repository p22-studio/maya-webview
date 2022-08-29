import React from 'react';
import {View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

const Webview = () => {
  return (
    <View style={styles.container}>
      <WebView source={{uri: 'https://uneeq-webview.vercel.app/'}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export {Webview};
