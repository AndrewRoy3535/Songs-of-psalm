import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './src/views/HomeScreen/HomeScreen';
import SongsScreen from './src/views/SongsScreen.js/SongsScreen';
import BookScreen from './src/views/BookScreen/BookScreen';
import AboutScreen from './src/views/AboutScreen/AboutScreen';
import PlaylistScreen from './src/views/PlaylistScreen/PlaylistScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Context from './src/Context/Context';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Context>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Songs" component={SongsScreen} />
          <Stack.Screen name="Books" component={BookScreen} />
          <Stack.Screen name="About" component={AboutScreen} />
          <Stack.Screen name="Playlist" component={PlaylistScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Context>
  );
};

export default App;

const styles = StyleSheet.create({});
