import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useContext} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Contextprovider} from '../../Context/Context';
import {State} from 'react-native-track-player';
import SliderBar from '../../component/SliderBar/SliderBar';

function SongsScreen({navigation}) {
  const context = useContext(Contextprovider);
  const {
    playNext,
    playPrevious,
    togglePlay,
    repeat,
    repeatMode,
    shuffleIcon,
    playerState,
  } = context;

  function MainPlayer() {
    const isPlaying = playerState === State.Playing;
    return (
      <>
        <View style={styles.main_player_container}>
          <View style={styles.player_art_img_container}>
            <Image
              source={require('../../assets/images/album_art.png')}
              style={styles.player_art_img}
            />
          </View>
          <SliderBar />
          <View style={styles.player_menu_container}>
            <TouchableOpacity onPress={playPrevious}>
              <Ionicons name="play-skip-back-sharp" size={45} color="#d3d3d3" />
            </TouchableOpacity>
            <TouchableOpacity
              // disabled={isLoading ? true : false}
              onPress={() => togglePlay()}>
              <Ionicons
                name={
                  isPlaying ? 'ios-pause-circle-sharp' : 'ios-play-circle-sharp'
                }
                size={85}
                // color="#5e8d6a"
                color="#fff"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={playNext}>
              <Ionicons
                name="play-skip-forward-sharp"
                size={45}
                color="#d3d3d3"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.player_bottom_container}>
          <TouchableOpacity
            style={styles.touchable_opacity}
            onPress={repeatMode}>
            <MaterialCommunityIcons
              name={`${shuffleIcon()}`}
              size={31}
              color={repeat === 'off' ? '#d3d3d3' : '#1db954'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchable_opacity}
            onPress={() => navigation.navigate('Lyrics')}>
            <Ionicons name="document-text" size={29} color="#d3d3d3" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchable_opacity}
            onPress={() => navigation.navigate('Playlist')}>
            <MaterialCommunityIcons
              name="playlist-music"
              size={31}
              color="#D3D3D3"
            />
          </TouchableOpacity>
        </View>
      </>
    );
  }

  return (
    <SafeAreaView style={styles.playerContainer}>
      <View style={styles.go_back_frm_player}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={styles.touchable_opacity_back}>
          <AntDesign name="left" size={25} color="#D3D3D3" />
        </TouchableOpacity>
      </View>
      <MainPlayer />
    </SafeAreaView>
  );
}

export default SongsScreen;

const widthandheight = 290;
const backgroundColor = '#171717';

const styles = StyleSheet.create({
  playerContainer: {
    flex: 1,
    backgroundColor: backgroundColor,
    // backgroundColor: '#5e8d6a',
  },

  touchable_opacity_back: {
    // borderWidth: 1,
    width: '17%',
    padding: 7,
    borderRadius: 50,
  },

  touchable_opacity: {
    // borderWidth: 1,
    width: '17%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },

  go_back_frm_player: {
    // flex: 1,
    justifyContent: 'center',
    // backgroundColor: 'red',
    paddingVertical: 7,
  },

  main_player_container: {
    flex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  player_art_img_container: {
    // flex: 4,
    width: widthandheight,
    height: widthandheight,
    backgroundColor: backgroundColor,
    borderRadius: 13,
    // add shadows for Android only
    elevation: 10,

    // add shadows for iOS only
    shadowColor: '#d3d3d3',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },

  player_art_img: {
    width: widthandheight,
    height: widthandheight,
    borderRadius: 11,
    // marginTop: 10,
    resizeMode: 'stretch',
  },

  song_title: {
    fontSize: 14,
    color: '#D3D3D3',
    padding: 5,
    marginBottom: 10,
  },

  slider_container: {
    width: '90%',
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  player_menu_container: {
    flex: 2,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    // backgroundColor: '#fff',
  },

  player_bottom_container: {
    borderTopWidth: 0.3,
    borderColor: '#D3D3D3',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  song_duration_container: {
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  song_duration: {
    fontSize: 12,
    color: '#D3D3D3',
  },
  loading_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
