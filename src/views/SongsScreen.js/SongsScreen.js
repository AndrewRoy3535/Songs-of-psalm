import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import {Contextprovider} from '../../Context/Context';
import TrackPlayer, {
  State,
  useTrackPlayerEvents,
  Event,
  useProgress,
} from 'react-native-track-player';

// array of audios
const sounds = [
  {
    id: 1,
    url: 'https://cdn.pixabay.com/audio/2021/05/25/audio_83acc1c7f0.mp3',
    title: 'Song 1',
    artist: 'Artist 1',
    artwork:
      'https://i.scdn.co/image/ab67616d0000b2735c9b9b9b9b9b9b9b9b9b9b9b9',
  },
  {
    id: 2,
    url: 'https://cdn.pixabay.com/audio/2022/01/31/audio_1682adb609.mp3',
    title: 'Song 2',
    artist: 'Artist 2',
    artwork:
      'https://i.scdn.co/image/ab67616d0000b2735c9b9b9b9b9b9b9b9b9b9b9b9',
  },
  {
    id: 3,
    url: 'https://cdn.pixabay.com/audio/2022/05/10/audio_b92b719f0e.mp3',
    title: 'Song 3',
    artist: 'Artist 3',
    artwork:
      'https://i.scdn.co/image/ab67616d0000b2735c9b9b9b9b9b9b9b9b9b9b9bsdsd9',
  },
];

const SongsScreen = ({navigation}) => {
  const context = useContext(Contextprovider);
  const {audio} = context;
  let progress = useProgress();
  const [playingState, setPlayingState] = useState(State.Playing);
  const [currentTrack, setCurrentTrack] = useState(' ');
  const [positon, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  console.log(progress);

  const playerSetup = async () => {
    await TrackPlayer.setupPlayer();

    await TrackPlayer.add(sounds);
  };

  useEffect(() => {
    playerSetup();
    return () => playerSetup();
  }, []);

  const togglePlay = async () => {
    const playingState = await TrackPlayer.getState();
    setPlayingState(playingState);
    if (playingState !== State.Playing) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
    let trackIndex = await TrackPlayer.getCurrentTrack();
    let trackObject = await TrackPlayer.getTrack(trackIndex);
    let position = await TrackPlayer.getPosition();
    let duration = await TrackPlayer.getDuration();
    // console.log(`${duration - position} seconds left.`);
    if (trackObject) {
      setCurrentTrack(trackObject);
      setPosition(position);
      setDuration(duration);
    }
  };

  const payNext = async () => {
    await TrackPlayer.skipToNext();
    let trackIndex = await TrackPlayer.getCurrentTrack();
    let trackObject = await TrackPlayer.getTrack(trackIndex);
    let position = await TrackPlayer.getPosition();
    let duration = await TrackPlayer.getDuration();
    // console.log(`${duration - position} seconds left.`);
    if (trackObject) {
      setCurrentTrack(trackObject);
      setPosition(position);
      setDuration(duration);
    }
  };

  const payPrevious = async () => {
    await TrackPlayer.skipToPrevious();
    let trackIndex = await TrackPlayer.getCurrentTrack();
    let trackObject = await TrackPlayer.getTrack(trackIndex);
    let position = await TrackPlayer.getPosition();
    let duration = await TrackPlayer.getDuration();
    // console.log(`${duration - position} seconds left.`);
    if (trackObject) {
      setCurrentTrack(trackObject);
      setPosition(position);
      setDuration(duration);
    }
  };

  // format time for audio
  const formatTime = time => {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time - minutes * 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  // total time count for audio
  const totalTime = () => {
    let minutes = Math.floor(duration / 60);
    let seconds = Math.floor(duration - minutes * 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const onSliderComplete = async value => {
    await TrackPlayer.seekTo(value);
    setPosition(value);
  };

  const onValuseChange = async () => {
    let trackIndex = await TrackPlayer.getCurrentTrack();
    let trackObject = await TrackPlayer.getTrack(trackIndex);
    let position = await TrackPlayer.getPosition();
    let duration = await TrackPlayer.getDuration();
    // console.log(`${duration - position} seconds left.`);
    if (trackObject) {
      setCurrentTrack(trackObject);
      setPosition(position);
      setDuration(duration);
    }
  };

  return (
    <SafeAreaView style={styles.playerContainer}>
      <View style={styles.go_back_frm_player}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={styles.touchable_opacity_back}>
          <AntDesign name="left" size={25} color="#D3D3D3" />
        </TouchableOpacity>
      </View>
      <View style={styles.main_player_container}>
        <View style={styles.player_art_img_container}>
          <Image
            source={require('../../assets/images/album_art.jpg')}
            style={styles.player_art_img}
          />
        </View>
        <View style={styles.slider_container}>
          <Text style={styles.song_title}>{currentTrack.title}</Text>
          <Slider
            style={{width: '100%', height: 25}}
            minimumValue={0}
            maximumValue={progress.duration}
            value={progress.position}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#D3D3D3"
            thumbTintColor="#5e8d6a"
            onValueChange={onValuseChange}
            onSlidingComplete={value => onSliderComplete(value)}
          />
          <View style={styles.song_duration_container}>
            <Text style={styles.song_duration}>{totalTime(duration)}</Text>
            <Text style={styles.song_duration}>
              {formatTime(progress.position)}
            </Text>
          </View>
        </View>
        <View style={styles.player_menu_container}>
          <TouchableOpacity onPress={payPrevious}>
            <Ionicons name="play-skip-back-outline" size={35} color="#5e8d6a" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name={
                playingState == State.Playing
                  ? 'ios-play-circle'
                  : 'ios-pause-circle'
              }
              size={75}
              color="#5e8d6a"
              onPress={() => togglePlay()}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={payNext}>
            <Ionicons
              name="play-skip-forward-outline"
              size={35}
              color="#5e8d6a"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.player_bottom_container}>
        {/* <TouchableOpacity style={styles.touchable_opacity}>
          <Ionicons name="heart" size={30} color="#D3D3D3" />
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.touchable_opacity}>
          <Ionicons name="repeat" size={30} color="#D3D3D3" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchable_opacity}>
          <Ionicons name="musical-note" size={30} color="#D3D3D3" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchable_opacity}
          onPress={() => navigation.navigate('Playlist')}>
          <Ionicons name="list" size={30} color="#D3D3D3" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SongsScreen;

const styles = StyleSheet.create({
  playerContainer: {
    flex: 1,
    backgroundColor: '#171717',
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
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
  main_player_container: {
    flex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  player_art_img_container: {
    flex: 5,
    width: '80%',
    alignItems: 'center',
    // backgroundColor: '#fff',
  },
  player_art_img: {
    width: 290,
    height: 290,
    borderRadius: 10,
    marginTop: 10,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  song_title: {fontSize: 14, color: '#D3D3D3', padding: 5, marginBottom: 10},
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
    borderTopWidth: 0.5,
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
});
