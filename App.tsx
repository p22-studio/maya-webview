/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import {Webview} from './app/views/Webview';

const AppNavigator = createNativeStackNavigator();

export type RootAppParamList = {
  Home: undefined;
  Webview: {};
};

type HomeProps = NativeStackScreenProps<RootAppParamList, 'Home'>;

const Home = ({navigation}: HomeProps) => {
  const handleNavigate = () => {
    navigation.navigate('Webview', {});
  };

  return (
    <View>
      <TouchableOpacity onPress={handleNavigate} style={styles.button}>
        <Text style={styles.text}>Navigate to Maya Webview</Text>
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar />
      <AppNavigator.Navigator initialRouteName="Home">
        <AppNavigator.Screen component={Home} name="Home" />
        <AppNavigator.Screen component={Webview} name="Webview" />
      </AppNavigator.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#0C6291',
    padding: 10,
  },
  home: {
    flex: 1,
  },
  text: {
    color: '#FFF',
  },
});

export default App;
