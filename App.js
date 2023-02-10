import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './src/views/HomeScreen/HomeScreen';
import SongsScreen from './src/views/SongsScreen.js/SongsScreen';
import BookScreen from './src/views/BookScreen/BookScreen';
import AboutScreen from './src/views/AboutScreen/AboutScreen';
import PlaylistScreen from './src/views/PlaylistScreen/PlaylistScreen';
import BookDetail from './src/views/BookDetail/BookDetail';
import GitsonghitaScreen from './src/views/Gitsonghita/GitsonghitaScreen';
import Lyrics from './src/component/Lyrics/Lyrics';
import GitDetails from './src/views/GitDetails/GitDetails';
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
          <Stack.Screen name="Lyrics" component={Lyrics} />
          <Stack.Screen name="BookDetail" component={BookDetail} />
          <Stack.Screen name="Gitsonghita" component={GitsonghitaScreen} />
          <Stack.Screen name="GitDetails" component={GitDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </Context>
  );
};

export default App;
