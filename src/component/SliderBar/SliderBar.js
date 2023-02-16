import {View, Text, StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import {useProgress} from 'react-native-track-player';
import {Contextprovider} from '../../Context/Context';
import Slider from '@react-native-community/slider';

const SliderBar = () => {
  let progress = useProgress();
  const {currentTrack, formatTime, totalTime, onSliderComplete} =
    useContext(Contextprovider);
  return (
    <View style={styles.slider_container}>
      <Text style={styles.song_title}>
        {currentTrack.title || 'নবী দাউদের গান'}
      </Text>
      <Slider
        style={{width: '100%', height: 25}}
        minimumValue={0}
        maximumValue={progress.duration}
        value={progress.position}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#D3D3D3"
        thumbTintColor="#1db954"
        onSlidingComplete={value => onSliderComplete(value)}
      />
      <View style={styles.song_duration_container}>
        <Text style={styles.song_duration}>{totalTime(progress.duration)}</Text>
        <Text style={styles.song_duration}>
          {formatTime(progress.position)}
        </Text>
      </View>
    </View>
  );
};

export default SliderBar;

const styles = StyleSheet.create({
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
