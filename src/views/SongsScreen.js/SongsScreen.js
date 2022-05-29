import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';

const SongsScreen = ({navigation}) => {
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
          <Text style={styles.song_title}>Title of the song</Text>
          <Slider
            style={{width: '100%', height: 25}}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#D3D3D3"
            thumbTintColor="#5e8d6a"
          />
          <View style={styles.song_duration_container}>
            <Text style={styles.song_duration}>0:00</Text>
            <Text style={styles.song_duration}>3:00</Text>
          </View>
        </View>
        <View style={styles.player_menu_container}>
          <TouchableOpacity>
            <Ionicons name="play-skip-back-outline" size={35} color="#5e8d6a" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="ios-pause-circle" size={75} color="#5e8d6a" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name="play-skip-forward-outline"
              size={35}
              color="#5e8d6a"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.player_bottom_container}>
        <TouchableOpacity style={styles.touchable_opacity}>
          <Ionicons name="heart" size={30} color="#D3D3D3" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchable_opacity}>
          <Ionicons name="repeat" size={30} color="#D3D3D3" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchable_opacity}>
          <Ionicons name="musical-note" size={30} color="#D3D3D3" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchable_opacity}>
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
